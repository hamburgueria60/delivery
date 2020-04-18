import login from './login'
import logout from './logout'

module.exports.applyMiddleware = ({ app }) => {
  app.use(
    (req, res, next) => {
      req.session = { authenticated: true }
      next()
    },
    // session({
    //   secret: process.env.SECRET,
    //   resave: false,
    //   saveUninitialized: false,
    //   sameSite: true,
    //   cookie: {
    //     secure: process.env.NODE_ENV === "production",
    //     httpOnly: true,
    //   },
    // }),
  )

  app.use('/graphql', (req, res, next) => {
    if (req.session.authenticated) next()
    else res.status(401).end()
  })
}

module.exports.applyRoutes = ({ app }) => {
  app.post('/auth/login', login)
  app.use('/auth/logout', logout)
}
