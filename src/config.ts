import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // SITE INFORMATION START
  site: {
    // site title
    title: '人工智能实验室',
    // site subtitle
    subtitle: '蒋峰岭课题组 · 多模态感知与理解',
    // site description
    description:
      '人工智能实验室由蒋峰岭老师指导，围绕图像描述生成、视听语音增强、多模态融合与目标跟踪等方向开展研究工作。',
    // use i18n title/subtitle/description from src/i18n/ui.ts instead of static ones above
    i18nTitle: true, // true, false
    // author name
    author: '蒋峰岭课题组',
    // site url
    url: 'https://blog-with-retypeset-and-contentful.edgeone.app',
    // favicon url
    // recommended formats: svg, png or ico
    favicon: '/icon/favicon.svg', // or https://example.com/favicon.svg
  },

  // COLOR SETTINGS START
  color: {
    // default theme mode
    mode: 'light', // light, dark
    light: {
      // primary color, used for title, hover, etc
      // oklch color picker: https://oklch.com/
      primary: 'oklch(26% 0.02 264)',
      // secondary color, used for body text
      secondary: 'oklch(45% 0.015 264)',
      // background color
      background: 'oklch(97.5% 0.004 95)',
    },
    dark: {
      // primary color, used for title, hover, etc
      // oklch color picker: https://oklch.com/
      primary: 'oklch(93% 0.008 95)',
      // secondary color, used for body text
      secondary: 'oklch(76% 0.01 95)',
      // background color
      background: 'oklch(21% 0.012 264)',
    },
  },

  // GLOBAL SETTINGS START
  global: {
    // default language
    locale: 'zh', // zh, zh-tw, ja, en, es, ru
    // more languages
    // not fill in the locale code above again
    moreLocales: [], // ['zh', 'zh-tw', 'ja', 'en', 'es', 'ru']
    // font styles for post text
    fontStyle: 'sans', // sans, serif
    // date format for posts
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY, MONTH DAY YYYY, DAY MONTH YYYY
    // gap between title and subtitle
    titleGap: 2, // 1, 2, 3
  },

  // COMMENT SETTINGS START
  comment: {
    // enable comment system
    enabled: false, // true, false
    // waline comment system
    // https://waline.js.org/en/
    waline: {
      // server url
      serverURL: '',
      // emoji url
      emoji: [],
      // gif search
      search: false, // true, false
      // image uploader
      imageUploader: false, // true, false
    },
  },

  // SEO SETTINGS START
  seo: {
    // @twitter ID
    twitterID: '',
    // site verification
    verification: {
      // google search console: https://search.google.com/search-console
      google: '',
      // bing webmaster tools: https://www.bing.com/webmasters
      bing: '',
      // yandex webmaster: https://webmaster.yandex.com
      yandex: '',
      // baidu search: https://ziyuan.baidu.com
      baidu: '',
    },
    // google analytics: https://analytics.google.com
    googleAnalyticsID: '',
    // umami analytics: https://cloud.umami.is
    umamiAnalyticsID: '',
    // follow verification: https://follow.is/
    follow: {
      // feed ID
      feedID: '',
      // user ID
      userID: '',
    },
    // apiflash access key, used to generate open graph screenshots
    // get your access key at: https://apiflash.com/
    apiflashKey: '',
  },

  // FOOTER SETTINGS START
  footer: {
    // social links
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/double5201314/blog-with-retypeset-and-contentful',
      },
    ],
    // year of website start
    startYear: 2025,
  },

  // PRELOAD SETTINGS START
  preload: {
    // link prefetch
    // docs: https://docs.astro.build/en/guides/prefetch/#prefetch-strategies
    linkPrefetch: 'viewport', // hover, tap, viewport, load
    // comment server url
    commentURL: '',
    // image hosting url
    imageHostURL: '',
    // custom google analytics js
    // for users who route analytics javascript to a customized domain
    customGoogleAnalyticsJS: '',
    // custom umami analytics js
    // for users who deploy umami on their own, or route analytics javascript to a customized domain
    customUmamiAnalyticsJS: '',
  },
};

export default themeConfig

export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
