// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
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
    icons: [
      'svg-spinners',
      'fa6-solid',
    ],
  },
  devtools: { enabled: true },
})
