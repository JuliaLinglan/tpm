<template>
    <div class="sidebar-container">
        <div class="sidebar-title">
<!--            <img class="logo" :src="logo" alt="logo" id="logo" style="margin-top: 10px;">-->
        </div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <router-link to="/workunit">
                <el-menu-item index="/workunit">
                    <svg-icon icon-class="eye-open"></svg-icon>
                    <span slot="title" style="font-size: 15px;">单位设置</span>
                </el-menu-item>
            </router-link>
            <el-menu-item index="1">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>

            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
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
