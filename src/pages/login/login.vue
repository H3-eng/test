<template>
    <div class="login">
        <div class="layout">
            <div class="layout-logo">
                <div class="logo-temp">
                    云南省三调数据库管理系统
                </div>
                <div class="earth"></div>
            </div>
            <div class="wrap">
                <p class="title">正在登录到***</p>
                <div class="flex flex-main-between">
                    <p class="login-tip">登录</p>
                    <sg-dropdown :visible="showDropdown">
                        {{sysname}}
                        <sg-icon type="icon-sort-desc"></sg-icon>
                        <div slot="menu" class="sys-list">
                            <sg-dropdown-item v-for="item in sysList" @click.native="selectSys(item.code)"  :key="item.code">
                                {{item.name}}
                            </sg-dropdown-item>
                        </div>
                    </sg-dropdown>
                </div>
                <sg-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <sg-form-item prop="username">
                        <sg-input v-model="formValidate.username" placeholder="账号是：admin"></sg-input>
                    </sg-form-item>
                    <sg-form-item prop="password">
                        <sg-input type="password" can-see v-model="formValidate.password"
                                  placeholder="密码是：Admin123"></sg-input>
                    </sg-form-item>
                    <sg-form-item>
                        <div class="flex">
                            <div class="flex-item">
                                <sg-checkbox class="keep" v-model="keep">记住账号</sg-checkbox>
                            </div>
                            <div class="flex-item">
                                <p>忘记密码？</p>
                            </div>
                        </div>
                    </sg-form-item>
                    <sg-form-item>
                        <sg-button @click="handleLogin('formValidate')" block type="primary">
                            登录
                        </sg-button>
                    </sg-form-item>
                </sg-form>
            </div>
<!--            <p class="record">沪ICP备：12004267 沪公网安备：31010102004544号 沪公网安备：31010102004544</p>-->
        </div>
    </div>
</template>

<script>
import sha1 from "sha1"
import login from '@/api/login'
import {
  SgButton, SgInput, SgForm, SgFormItem, SgCheckbox
} from 'southgisui'
import index from '@/crypto/index.js'

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
      },
      //子系统
      sysname:'',
      //子系统列表
      sysList:[],
      //是否展示系统切换
      showDropdown:false
    }
  },
  components: {SgButton, SgInput, SgForm, SgFormItem, SgCheckbox},
  methods: {
    listAllSubSystems(){
      login.listAllSubSystems()
        .then(res=>{
          console.log(res);
        })
    },
    selectSys(name){
      this.sysname=name
      this.showDropdown=false
    },
    /**
       * @Description:用户登陆系统，登陆规则详见***
       * @author huangjianhui
       * @date 2019/10/26
       */
    handleLogin(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const self=this;
          if(self.keep==true){
            let name= index.encrypt(self.formValidate.username,'');
            let password=index.encrypt(self.formValidate.password,'');
            localStorage.setItem('sitename',name);
            localStorage.setItem('setpwd',password);
          }else{
            localStorage.clear();
          }
          //登陆与前端在同一台服务器上
          // const url = `/cas/login?service=http://localhost:8081/home.html?scode=os&client_name=iboa2&code=A0${this.formValidate.username}a0z9${sha1(this.formValidate.password).toUpperCase()}`
          const params = {
            grant_type: 'password',
            client_id: 'sfpasys',
            username: this.formValidate.username,
            password: sha1(this.formValidate.password).toUpperCase()
          }
          login.login({params: params})
            .then(res => {
              localStorage.setItem('loginTicket', JSON.stringify(res))
              window.location.href = process.env.NODE_ENV === 'production' ? `/mainProject/header.html?scode=${this.sysname}` : `/header.html?scode=${this.sysname}`
            })
            .catch(error => {
              console.log(error);
              this.$msg.error(error.response.data.code.toString())
            })
        }
      })
    },
    EnterLogin(e) {
      if (e.keyCode === 13) {
        this.handleLogin('formValidate')
      }
    },
    getlocalStorage(){
      this.formValidate.username=index.decrypt(localStorage.getItem('sitename'))
      this.formValidate.password=index.decrypt(localStorage.getItem('setpwd'))
      if(this.formValidate.username){
        this.keep=true
      }
    }
  },
  created() {
    this.getlocalStorage();
  },
  mounted() {
    // Enter login
    document.addEventListener('keydown', this.EnterLogin);
    this.listAllSubSystems()
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.EnterLogin);
  }
}
</script>
<style lang="scss" scoped>
    @import "login.scss";
    .logo-temp{
        font-size: 24px;
        color: #fff;
        margin-bottom: 36px;
        text-align: center;
    }
</style>

