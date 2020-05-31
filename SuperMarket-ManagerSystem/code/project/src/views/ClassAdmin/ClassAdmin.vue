<template>
  <div class="class-admin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类管理</span>
      </div>
      <div>
        <el-button @click="dialogFormVisible = true">+ 添加</el-button>
      </div>

      <el-dialog width="30%" title="添加分类" :visible.sync="dialogFormVisible">
        <el-input v-model="input" placeholder="请输入分类"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClassItem()">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="classadmin" style="width: 100%">
        <el-table-column prop="theclass" label="分类名称" width="800"></el-table-column>
        <el-table-column label="管理">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteClass(scope)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { showClassItem,deleteClassItem,addClassItem} from "@/api/classItem";
export default {
    data(){
        return{
            classadmin:[],
            input: '',
            dialogFormVisible: false
        }
    },
    methods: {
      showItem() {
        showClassItem().then( res => {
          this.classadmin = res;
        })
        .catch(err => {
          console.log(err)
        });
      },
      deleteClass(e) {
        let params = {
          theclass: e.row.theclass
        }
        const index = e.$index
        this.classadmin.splice(index,1)
        deleteClassItem(params).then(res => {
          let{code, msg} = res;
            if(code === 0){
              this.$message({
                type: 'success',
                message: msg,
              })
            }else if(code === 1){
              this.$message.error(msg)
            }
        })
      },
      addClassItem() {
        this.dialogFormVisible = false
        let params = {
          theclass : this.input
        }
        addClassItem(params).then(res => {
          let{code, msg} = res;
            if(code === 0){
              this.$message({
                type: 'success',
                message: msg,
              })
              let params = {
                theclass:this.input
              }
              this.classadmin.push(params)
            }else if(code === 1){
              this.$message.error(msg)
            }
        })
      }
    },
    created() {
      this.showItem();
    }
}
</script>

<style lang="less">
    @import url('./classadmin.less');
</style>

