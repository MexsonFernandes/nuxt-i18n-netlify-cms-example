import chalk from 'chalk'

export default function () {
  const { nuxt } = this

  const options = nuxt.options.i18n.netlifyCms || {}

  // Run netlify cms proxy server if the flag is mentioned in i18n config
  if (options.proxy) {
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

    if (options.proxy)
      nuxt.options.cli.badgeMessages.push(
        `Netlify CMS Proxy Server: ${chalk.underline.yellow(url)}`
      )

    const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

    nuxt.options.build.plugins.push({
      apply(compiler) {
        compiler.plugin('emit', (compilation, cb) => {
          // This will generate `.nuxt/dist/info.txt' with contents of info variable.
          // Source can be buffer too
          compilation.assets['info.txt'] = {
            source: () => info,
            size: () => info.length,
          }

          cb()
        })
      },
    })
  })
  //   locale: 'en',
  //   fallbackLocale: 'en',
  //   messages: { en, fr },
}
