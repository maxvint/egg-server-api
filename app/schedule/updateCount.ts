import { Subscription } from 'egg'

class UpdateCount extends Subscription {

  static get schedule() {
    return {
      interval: '10s', // 每隔1分钟
      type: 'all', // 指定所有的 worker 都需要执行
      // cron: '0 0 */3 * * *', // 每三小时准点执行一次
    }
  }

  async subscribe() {
    // console.log('schedule')
    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // this.ctx.app.cache = res.data
  }
}

export default UpdateCount
