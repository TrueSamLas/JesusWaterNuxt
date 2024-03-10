import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import prisma from '~/server/prisma'
import { createHash } from 'crypto'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET ?? 'wpo93u4vtbgk897w0y5t',
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Авторизация',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Логин', type: 'text', placeholder: '' },
        password: { label: 'Пароль', type: 'password', placeholder: '' }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            login: credentials?.username,
            password: createHash('sha256').update(credentials?.password).digest('base64'),
          },
        });

        if( !!user )
          return {
            id: user.id,
            login: user.login,
            name: user.name,
            userdata: JSON.parse(user.userdata),
            role: user.role,
          };

        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if( !!user ){
        for(let [ prop, value ] of Object.entries(user))
          token[prop] = value;
      }

      return token;
    },
    session: async ({ session, token }) => {
      const { id, login, name, userdata, role } = token;

      session.user = {
        id,
        login,
        name,
        userdata,
        role,
      };

      return session;
    },
  },
})