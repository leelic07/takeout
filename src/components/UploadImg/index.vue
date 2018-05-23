<template>
    <el-upload class="upload-demo" 
    :action="$_baseURL + $_uploadURL" 
    :with-credentials="true" 
    :on-remove="handleRemove" 
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :file-list="fileList" 
    list-type="picture" 
    :limit="limit" 
    show-file-list>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多只能上传{{limit}}张图片</div>
    </el-upload>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    limit: {
      type: Number,
      default: 1
    },
    pictures: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      fileList: [],
      fileListTemp: []
    }
  },
  watch: {
    pictures: {
      handler: function(newValue) {
        this.fileList.splice(0)
        newValue.forEach(picture => {
          if (picture.url) {
            this.fileList.push(picture)
          } else {
            this.fileList.push({
              name: picture.substring(picture.lastIndexOf('/') + 1),
              url: picture
            })
          }
        })
      }, immediate: true
    },
    uploadFileUrl(newValue) {
      this.$emit('handleSuccess', newValue)
    }
  },
  computed: {
    ...mapGetters({
      uploadFileUrl: 'uploadFileUrl'
    })
  },
  methods: {
    ...mapActions({
      uploadFile: 'uploadFile'
    }),
    beforeUpload(file) {
      this.UpladFile(file)
      return false
    },
    handleRemove(file) {
      this.fileList.forEach((f, index, arr) => {
        if (f.url === file.url) {
          this.$emit('handleRemove', index)
          arr.splice(index, 1)
        }
      })
    },
    handleExceed() {
      this.$message({
        type: 'warning',
        message: `最多只能上传${this.limit}张图片`,
        showClose: true
      })
    },
    photoCompress(file, w, objDiv) {
      const that = this
      const ready = new FileReader()
      /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file)
      ready.onload = function() {
        const re = this.result
        that.canvasDataURL(re, w, objDiv)
      }
    },
    canvasDataURL(path, obj, callback) {
      const img = new Image()
      img.src = path
      img.onload = function() {
        const that = this
        // 默认按比例压缩
        let w = that.width
        let h = that.height
        const scale = w / h
        w = obj.width || w
        h = obj.height || (w / scale)
        let quality = 0.7 // 默认图片质量为0.7
        // 生成canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 创建属性节点
        const anw = document.createAttribute('width')
        anw.nodeValue = w
        const anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality
        }
        // quality值越小，所绘制出的图像越模糊
        const base64 = canvas.toDataURL('image/jpeg', quality)
        // 回调函数返回base64的值
        callback(base64)
      }
    },
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
    convertBase64UrlToBlob(urlData) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // 上传文件方法
    UpladFile(fileObj) {
      const that = this
      console.log('fileSize', fileObj.size)
      if (fileObj.size / 1024 > 200) { // 大于1M，进行压缩上传
        this.photoCompress(fileObj, {
          quality: 0.2
        }, function(base64Codes) {
          const bl = that.convertBase64UrlToBlob(base64Codes)
          console.log('blSize', bl.size)
          //   form.append('file', bl, 'file_' + Date.parse(new Date()) + '.jpg') // 文件对象
          that.uploadFile(bl)
        })
      } else { // 小于等于1M 原图上传
        this.uploadFile(fileObj)
      }
    }
  }
}
</script>