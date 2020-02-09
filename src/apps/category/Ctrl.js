/**
 * Created by OXOYO on 2020/2/3.
 *
 */

import Config from './Config'

export default {
  async getCategoryList (ctx, next) {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = reqQuery.type ? Config[reqQuery.type] : null
    // 处理结果
    if (res) {
      let list = []
      res.forEach(item => {
        if (item.enable) {
          list.push({
            name: item.name
          })
        }
      })
      res = {
        code: 200,
        msg: ctx.__('L00007'),
        data: list
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00008'),
        data: null
      }
    }

    ctx.body = res
  }
}
