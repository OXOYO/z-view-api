/**
 * Created by OXOYO on 2020/2/3.
 *
 */

import Ctrl from './Ctrl'

const namespace = '/category/'

export default (router) => {
  router
    .get(namespace + 'list', Ctrl.getCategoryList)
}
