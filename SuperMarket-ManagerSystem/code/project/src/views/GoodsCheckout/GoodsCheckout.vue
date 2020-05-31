<template>
  <div class="goods-checkout">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <el-form
        :model="goodscheckout"
        status-icon
        ref="goodscheckout"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品编码" prop="name">
          <el-input type="text" v-model="goodscheckout.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input type="text" v-model="goodscheckout.counts" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSale">出库</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addSale } from "@/api/saleLists"
export default {
  data() {
    return {
      goodscheckout: {
        code: '',
        counts: ''
      },
      vipcode: {},
      rules: {
        name: [
          { required: true, message: "商品名称不能为空!", trigger: "blur" }
        ],
        number: [
          { required: true, message: "商品数量不能为空!", trigger: "blur" }
        ],
        card: [
          { required: true, message: "会员卡号不能为空!", trigger: "blur" }
        ]
      },
      salelists: [
        {
          name: "暂无商品",
          counts: "",
          price: "",
          allprice: "",
          discount: "",
        },
        {
          name: "总价: 0 元 , 优惠 0 元 , 小计: 0 元",
          counts: "",
          price: "",
          allprice: "",
          discount: "",
        },
      ]
    };
  },
  methods: {
    addSale() {
      this.$refs.goodscheckout.validate(valid => {
        if (valid) {
          let params = {
            code: this.goodscheckout.code,
            counts: this.goodscheckout.counts
          };
          addSale(params)
            .then(res => {
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
              } else if (code === 1) {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加失败!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import url("./goodscheckout.less");
</style>
