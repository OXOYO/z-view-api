/**
 * Created by OXOYO on 2019/4/3.
 *
 * 校验相关配置
 */

export default {
  enable: {
    verifyToken: false,
    verifyAccess: false
  },
  // 校验排除项
  unless: {
    // 校验token时排除的api
    verifyToken: {
      api: []
    },
    // 校验权限时排除的api、resource
    verifyAccess: {
      api: [],
      resource: []
    }
  }
}
