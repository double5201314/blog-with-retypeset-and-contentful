import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { themeConfig } from './src/config'
import { langMap } from './src/i18n/config'

const url = themeConfig.site.url
const locale = themeConfig.global.locale
const linkPrefetch = themeConfig.preload.linkPrefetch
const imageHostURL = themeConfig.preload.imageHostURL
const imageDomain = imageHostURL ? new URL(imageHostURL).hostname : undefined

export default defineConfig({
  site: url,
  base: '/',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: linkPrefetch,
  },
  image: {
    domains: imageDomain ? [imageDomain] : [],
    remotePatterns: [{ protocol: 'https' }],
  },
  i18n: {
    locales: Object.entries(langMap).map(([path, codes]) => ({
      path,
      codes: codes as [string, ...string[]],
    })),
    defaultLocale: locale,
  },
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
    robotsTxt(),
    compress(),
  ],
  devToolbar: {
    enabled: false,
  },
})
