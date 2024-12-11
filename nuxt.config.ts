// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      '50': '#FFF2FA',
      '100': '#FFE6F4',
      '200': '#FFC2E2',
      '300': '#FF9CCA',
      '400': '#FF4F90',
      '500': '#ff0643',
      '600': '#E60539',
      '700': '#BF022B',
      '800': '#990220',
      '900': '#730116',
      '950': '#4A010D'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#ff0643',
          inverseColor: '#fcfdff',
          hoverColor: '#f00740',
          activeColor: '#fa1b52',
        },
      },
      dark: {
        primary: {
          color: '#ff0643',
          inverseColor: '#fcfdff',
          hoverColor: '#f00740',
          activeColor: '#fa1b52',
        },
      },
    },
  },
})

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
  ],
  ssr: false,
  primevue: {
    options: {
      theme: {
        preset: Noir
      }
    }
  }
})