<template>
    <div :class="classObj" class="app-wrapper">
        <side-bar></side-bar>
        <div class="main-container">
            <top-bar></top-bar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar/index1'
import TopBar from './components/TopBar/index'
import AppMain from './components/AppMain/index'

export default {
    name: "layout",
    components: {
        SideBar, TopBar, AppMain,
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
            }
        }
    },
    data() {
        return {
            status: true,
        }
    },
}
</script>

<style scoped>

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .main-container {
        min-height: 100%;
        /*height: calc(100vh);*/
        margin-left: 180px;
        transition: margin-left .28s;
        background: rgba(239, 242, 247, 1);
    }

</style>
