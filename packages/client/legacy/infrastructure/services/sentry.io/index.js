import * as Sentry from '@sentry/browser'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://7d29659bf4eb4aa28f7af0de58312685@sentry.io/1500006',
    environment: process.env.NODE_ENV || 'development',
  })
}
