<template>
  <div class="personal">
    
  </div>
</template>

<script>
import moment from "moment";
import axios from 'axios';
import { loadAccountInfo } from '@/api/account'
export default {
  data() {
    return {
      accountinfo: {
        id: "",
        account: "",
        region: "",
        createtime: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    accountInfo() {
      loadAccountInfo()
        .then(res => {
          let { id, account, region, createtime } = res[0];
          this.accountinfo.id = id;
          this.accountinfo.account = account;
          this.accountinfo.region = region;
          this.accountinfo.createtime = createtime;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 头像上传之前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 自定义上传函数
    upLoad(file){
        // 创建一个formData对象
        let formData = new FormData();
        //  把文件数据放入formData
        formData.append('file', file.file)
        // 发送axios到后端
        axios.post('accounts/uploadavatar', formData, {
            header: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {
            let {code, msg, path} = res.data;
            if(code === 0){
                this.$message({
                    type: 'success',
                    message: msg,
                })
                // 回填头像
                // this.imageUrl = `http://127.0.0.1:3000${path}`
                this.imageUrl = `http://172.16.12.174:3000${path}`

                this.$emit('A');
            }else if(code === 1){
                this.$message.error(msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
  },
  filters: {
    filtertime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.accountInfo();
  }
};
</script>