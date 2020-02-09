/**
 * Created by OXOYO on 2019/4/3.
 *
 * Cookie配置
 */

export default {
  prefix: 'z-view',
  keys: {
    account: 'account',
    token: 't',
    locale: 'l',
    userType: 'user-type',
    userCode: 'user-code',
    secret: 'secret'
  },
  getItem: function (key) {
    return key ? this.prefix + this.keys[key] : ''
  }
}
