<template>
    <div class="head">
        <sg-container direction="vertical" class="home">
            <sg-header>
                <sg-row>
                    <div class="logo">
                        <img src="../../assets/image/logo.png">
                        <h1>南方数码</h1>
                    </div>
                </sg-row>
            </sg-header>
        </sg-container>
<!--        <div class="h-top">-->
<!--            <div class="left fl"></div>-->
<!--            <ul class="center fl">-->
<!--                <li><span>首页</span></li>-->
<!--                <li><span>数据质检</span></li>-->
<!--                <li><span>数据入库</span></li>-->
<!--                <li><span>数据更新</span></li>-->
<!--                <li><i>...</i><span>更多</span></li>-->
<!--            </ul>-->
<!--            <div class="right">-->
<!--                <sg-dropdown @on-click="getCheck">-->
<!--                    <a style="color:#515a6e;font-weight: normal">-->
<!--                        {{name}}-->
<!--                        <sg-icon type="icon-down"></sg-icon>-->
<!--                    </a>-->
<!--                    <div slot="menu">-->
<!--                        <sg-dropdown-item name="南方数码">南方数码</sg-dropdown-item>-->
<!--                        <sg-dropdown-item name="北方数码">北方数码</sg-dropdown-item>-->
<!--                    </div>-->
<!--                </sg-dropdown>-->
<!--            </div>-->
<!--        </div>-->
        <ul class="clearfix">
            <li>
                <sg-icon type="icon-edit" class="dy-font" size="24" />
                <span>新建项目</span>
            </li>
            <li>
                <sg-icon type="icon-file" class="dy-font" size="24" />
                <span>新建模型</span>
            </li>
            <li>
                <sg-icon type="icon-reload" class="dy-font" size="24" />
                <span>刷新</span>
            </li>
            <li>
                <sg-icon type="icon-delete" class="dy-font" size="24" />
                <span>删除</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data(){
    return{
      name:"admin"
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./header.scss";
</style>
