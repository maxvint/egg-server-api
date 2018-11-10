export default (app) => {
  if (app.config.env === 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      await app.model.sync({
        fource: true,
      })
    })
  }
}
