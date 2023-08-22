import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['hstack', 'flex items-center'],
    ['vstack', 'flex flex-col justify-center'],
    ['border-c', 'border-gray-200 dark:border-gray-600'],
    ['border-c-dark', 'border-gray-300 dark:border-gray-500'],
    ['bg-c', 'bg-white dark:bg-gray-700'],
    ['text-c-light', 'text-gray-600 dark:text-gray-300'],
    ['text-c-lighter', 'text-gray-400 dark:text-gray-500'],
    ['text-c-dark', 'text-black dark:text-white'],
    ['text-c-active', 'text-brand dark:text-blue-300'],
    ['nav-item', 'hstack space-x-1 text-c-light hover:text-c-dark px-1'],
    ['not-prose', 'max-w-78ch mx-auto text-dark'],
    [
      'btn',
      'hstack space-x-1 rounded transition-colors decoration-none text-sm !text-c bg-gray-100/90 dark:bg-gray-50/10 hover:(!bg-gray-500 !text-white !no-underline)',
    ],
  ],
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  theme: {
    maxWidth: {
      content: '98ch',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})
