<template>
    <div class="topbar-container">
        <div style="align-items:center;display:flex;">
            <hamburger
                id="hamburger-container"
                :is-active="sidebar.opened"
                class="hamburger-container"
                @toggleClick="toggleSideBar"
            ></hamburger>
            <span class="topbar-title">铃兰的后台管理系统</span>
            <div class="right-menu">
                <span class="avatar-wrapper" @click="logout">【退出系统】</span>
            </div>
        </div>


    </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
import {mapGetters} from "vuex";


export default {
    name: "topbar",
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters(["sidebar", "avatar", "device"])
    },

    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        logout() {
            this.$store.dispatch("user/Logout").then(res => {
                this.$router.push("/login")
            })

        },
    }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
    .topbar-container {
        background-color: #{$menuBg};;
        /*渐变色*/
        /*background: linear-gradient(180deg, rgba(73, 200, 253, 1) 0%, rgba(58, 116, 239, 1) 100%);*/
        height: 100px;
        line-height: 100px;
        /*border-bottom: 4px solid whitesmoke;*/
        min-width: 1000px;
        //align-items: center;
        //display: flex;
        //justify-content: flex-start;
    }

    .topbar-title {
        color: white;
        font-size: 22px;
        line-height: 22px;
    }

    .right-menu {
        position: absolute;
        right: 20px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .avatar-wrapper {
        color: white;
        font-size: 15px;
        height: 100px;
        //cursor: pointer;
    }

</style>
