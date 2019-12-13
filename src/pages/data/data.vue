<template>
    <div class="right">
        <div class="title">规则信息</div>
        <sg-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <sg-form-item label="包含：" prop="contain" class="contain">
                <span class="dot">*</span>
                <sg-input type="text" v-model="formValidate.contain"></sg-input>
                <div class="switch">
                    <span>启用：</span>
                    <input type="checkbox" class="switch-anim" name="checkbox" checked>
                </div>
            </sg-form-item>
            <sg-form-item label="Package：">
                <sg-input type="text" v-model="formValidate.package"></sg-input>
            </sg-form-item>
            <sg-form-item label="Import：" class="import">
                <sg-button>添加</sg-button>
                <sg-button>删除</sg-button>
            </sg-form-item>
            <sg-form-item label="Function：">
                <sg-input type="text" v-model="formValidate.function"></sg-input>
            </sg-form-item>
            <sg-form-item label="Declare：" class="declare">
                <sg-input type="text" v-model="formValidate.declare"></sg-input>
            </sg-form-item>
            <sg-form-item label="Rule：" class="rule">
                <sg-button :size="'small'">添加</sg-button>
                <sg-button :size="'small'">删除</sg-button>
                <sg-button :size="'small'">全选</sg-button>
            </sg-form-item>
            <sg-form-item>
                <sg-input type="text" v-model="formValidate.data"  placeholder="数据"></sg-input>
                <sg-input type="text" v-model="formValidate.number"></sg-input>
            </sg-form-item>
            <sg-form-item class="btngroup">
                <sg-button type="primary" @click="handleSubmit('formCustom')">保存</sg-button>
                <sg-button @click="handleReset('formCustom')" style="margin-left: 8px">取消</sg-button>
            </sg-form-item>
        </sg-form>
        <sg-modal type="primary" v-model="visible">
            <div>
                <h3 class="hs">Rule</h3>
                <span>x</span>
            </div>
        </sg-modal>
    </div>
</template>
<script>
export default {
  data() {
    return{
      visible:false,
      formValidate:{
        contain:'',
        package:'',
        function:'',
        declare:'',
        data:'',
        number:'5645566'
      },
      ruleValidate: {
        contain: [
          {required: true, message: '包含不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
    @import "./data.scss";
</style>
