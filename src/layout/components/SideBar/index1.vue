<template>
    <div class="sidebar-container">
        <div class="sidebar-title">
            <!--            <img class="logo" :src="logo" alt="logo" id="logo" style="margin-top: 10px;">-->
        </div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">
                <svg-icon v-if="!isCollapse" icon-class="openright"></svg-icon>
            </el-radio-button>
            <el-radio-button :label="true">
                <svg-icon v-if="isCollapse" icon-class="openleft"></svg-icon>
                收起这是测试
            </el-radio-button>
        </el-radio-group>
        <span slot="title" style="font-size: 15px;float: right;margin-right: 10px">
            <svg-icon v-if="!isCollapse" v-model="isCollapse" icon-class="openright" :label="false"></svg-icon>
            <svg-icon v-if="isCollapse" v-model="isCollapse" icon-class="openleft" :label="true">收起</svg-icon>
        </span>

        <el-menu
                :collapse="isCollapse"
                background-color="transparent"
                text-color="#000000"
                active-text-color="#FFD04B"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">

            <!--            <div>-->

            <!--                <span slot="title" style="font-size: 15px;float: right;margin-right: 10px"><svg-icon icon-class="openleft"></svg-icon>收起</span>-->
            <!--            </div>-->
            <router-link to="/workunit">
                <el-menu-item index="/workunit">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">单位设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/department">
                <!--                <a href="javascript:void(0);" class="nav-more-link">部门设置</a>-->
                <el-menu-item index="/department">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">部门设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/staff">
                <el-menu-item index="/staff">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">员工设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/servicecategory">
                <el-menu-item index="/servicecategory">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">服务类别设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/workstation">
                <el-menu-item index="/workstation">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">工作站设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/priority">
                <el-menu-item index="/priority">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">优先级设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/maindisplaydevice">
                <el-menu-item index="/maindisplaydevice">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">主显示设备设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/voice">
                <el-menu-item index="/voice">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">语音设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/ticket">
                <el-menu-item index="/ticket">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">票号设置</span>
                </el-menu-item>
            </router-link>
            <router-link to="/servicekey">
                <el-menu-item index="/servicekey">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">服务键设置</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script>
import logo from '../../../../public/static/images/logo.png'

export default {
    name: "sidebar",
    data() {
        return {
            logo,
            isCollapse: true
        }
    },
    computed: {
        isCollapsed() {
            // return !this.sidebar.opened
            return false
        },
        classObj() {
            return {
                hideMenuSideBar: !this.sidebar.opened,
            }
        },
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .sidebar-container {
        background: linear-gradient(180deg, rgba(73, 200, 253, 1) 0%, rgba(58, 116, 239, 1) 100%);
        /*background: black;*/
        width: 180px;

        .sidebar-title {
            height: 80px;
            line-height: 80px;
            text-align: center;
        }

        .el-menu-item {
            height: 40px;
        }
    }
</style>
