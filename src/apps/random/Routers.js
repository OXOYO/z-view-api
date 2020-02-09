/**
 * Created by OXOYO on 2020/2/3.
 *
 */

import Ctrl from './Ctrl'

const namespace = '/random/'

export default (router) => {
  router
    .get(namespace + 'picture', Ctrl.getPicture)
    .get(namespace + 'video', Ctrl.getVideo)
}
