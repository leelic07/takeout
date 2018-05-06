import http from '@/service'
import config from '@/service/config/base'

export default {
  state: {
    uploadFileUrl: ''
  },
  actions: {
    uploadFile({ commit }, file) {
      const formData = new FormData()
      formData.append('file', file)
      http.uploadFile(formData).then(res => commit('uploadFile', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    uploadFile(state, uploadFileResult) {
      state.uploadFileUrl = `${config.baseURL}${uploadFileResult.path}`
    }
  }
}
