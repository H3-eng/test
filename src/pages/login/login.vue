<template>
    <div class="login">
        <div class="wrap">
<!--            <img src="@/assets/image/login/logo.png">-->
            <p class="welcoming">欢迎您的到来</p>
            <div class="action">
                <div class="row">
                    <sg-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                        <sg-form-item prop="username">
                            <sg-input v-model="formValidate.username" placeholder="账号是：admin"></sg-input>
                        </sg-form-item>
                        <sg-form-item prop="password">
                            <sg-input type="password" can-see v-model="formValidate.password"
                                      placeholder="密码是：Admin123"></sg-input>
                        </sg-form-item>
                    </sg-form>
                    <sg-button @click="handleLogin('formValidate')" @keyup.enter="handleLogin('formValidate')">
                        登录</sg-button>
                </div>
                <sg-checkbox class="keep" v-model="keep">记住账号</sg-checkbox>
            </div>
        </div>
        <div class="floater bg"></div>
        <div class="plant_f bg"></div>
        <div class="plant_b bg"></div>
    </div>
</template>

<script>
import sha1 from "sha1"
import api from '@/api'
import {
  SgButton,SgInput,SgForm,SgFormItem,SgCheckbox
} from 'southgisui'

export default {
  data() {
    return {
      //表单属性信息
      formValidate: {
        username: '',
        password: ''
      },
      //是否记住账号
      keep: false,
      //表单验证规则
      ruleValidate: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'},
          {whitespace: true, message: '不可包含空白字符', trigger: 'change'},
          {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]*$/, type: 'string', message: '仅可输入字母、汉字以及数字', trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {whitespace: true, message: '不可包含空白字符', trigger: 'change'},
          {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]*$/, type: 'string', message: '仅可输入字母、汉字以及数字', trigger: 'change'}
        ]
      }
    }
  },
  components:{ SgButton,SgInput,SgForm,SgFormItem,SgCheckbox},
  methods: {
    /**
     * @Description:用户登陆系统，登陆规则详见***
     * @author huangjianhui
     * @date 2019/10/26
     */
    handleLogin(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          //登陆与前端在同一台服务器上
          // const url = `/cas/login?service=http://localhost:8081/home.html?scode=os&client_name=iboa2&code=A0${this.formValidate.username}a0z9${sha1(this.formValidate.password).toUpperCase()}`
          const params={
            grant_type:'password',
            client_id:'sfpasys',
            username:this.formValidate.username,
            password:sha1(this.formValidate.password).toUpperCase()
          }
          api.login({params:params})
            .then(res=>{
              console.log(res);
              sessionStorage.setItem('loginTicket',JSON.stringify(res))
              window.location.href='/home.html?scode=os'
            })
            .catch(error=>{
              this.$msg.error(error.response.data.code.toString())
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "login.scss";
</style>

