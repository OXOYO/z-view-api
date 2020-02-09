/**
 * Created by OXOYO on 2020/2/3.
 *
 */

import Model from './Model'

export default {
  async getPicture (ctx, next) {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getPicture(reqQuery)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00003'),
        data: res
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00004'),
        data: null
      }
    }

    ctx.body = res
  },
  async getVideo (ctx, next) {
    await next()
    let reqQuery = ctx.query
    // 查询结果
    let res = await Model.getVideo(reqQuery)
    // 处理结果
    if (res) {
      res = {
        code: 200,
        msg: ctx.__('L00005'),
        data: res
      }
    } else {
      res = {
        code: 5000,
        msg: ctx.__('L00006'),
        data: null
      }
    }

    ctx.body = res
  }
}
