// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/ui',
  ],
  auth: {
    provider: {
      type: 'authjs'
    },
    // globalAppMiddleware: {
    //   isEnabled: true
    // },
  },
  ui: {
    icons: ['svg-spinners'],
  },
  devtools: { enabled: true },
})
