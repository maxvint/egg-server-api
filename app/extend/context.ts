const extendContext = {
  /**
   * 创建 user 对象，并挂载到 app 对象中
   * @returns app.user
   */
  get user() {
    if (!(this as any)._user) {
      (this as any)._user = {
        id: 0,
      }
    }

    return (this as any)._user
  },

  set user(val) {
    (this as any)._user = val
  },
}

export default extendContext
