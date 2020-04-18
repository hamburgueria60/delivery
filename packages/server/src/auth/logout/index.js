import production from './production'
import development from './development'

module.exports = process.env.NODE_ENV === 'production' ? production : development
