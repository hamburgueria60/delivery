module.exports = app => {
  if (process.env.NODE_ENV === 'production') return

  Object.entries(app.models).forEach(([, model]) => {
    if (model.beginTransaction) {
      model.beginTransaction = () => {
        return Promise.resolve({
          commit: () => Promise.resolve(),
          rollback: () => Promise.resolve(),
        })
      }
    }
  })
}
