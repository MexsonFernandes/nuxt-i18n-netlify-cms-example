import chalk from 'chalk'

export default function () {
  const { nuxt } = this

  const options = nuxt.options.i18n

  // Run netlify cms proxy server if the flag is mentioned in i18n config
  if (options.netlifyCmsProxyServer) {
    require('netlify-cms-proxy-server/dist')
  }

  nuxt.options.i18n.vueI18n = {
    en: {
      test: 'ete',
    },
  }

  nuxt.hook('listen', function (server, { port }) {
    // proxyServer()

    const url = 'http://localhost:' + (process.env.PORT || 8081) + '/'

    if (options.netlifyCmsProxyServer)
      nuxt.options.cli.badgeMessages.push(
        `Netlify CMS Proxy Server: ${chalk.underline.yellow(url)}`
      )
  })
  //   locale: 'en',
  //   fallbackLocale: 'en',
  //   messages: { en, fr },
}
