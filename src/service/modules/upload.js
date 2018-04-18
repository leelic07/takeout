import * as service from '../base/service'

export default {
  uploadFile: file => service.postFile('/upload/uploadfile', file).then(res => res).catch(err => err)
}
