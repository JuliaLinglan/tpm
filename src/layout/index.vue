<template>
    <div :class="classObj" class="app-wrapper" style="height:100%;">
        <side-bar class="sidebar-container"></side-bar>

        <div class="main-container">
            <top-bar></top-bar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar/index'
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
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation
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

<style lang="scss" scoped>

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .main-container {
        min-height: 100%;
        background: rgba(239, 242, 247, 1);
    }

</style>
