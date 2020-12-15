<template>
    <div class="topbar-container">
        <span class="topbar-title">铃兰的后台管理系统</span>
        <div class="right-menu">
            <span class="avatar-wrapper" style="display:block;" @click="logout">【退出系统】</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "topbar",

    methods: {
        logout() {
            this.$store.dispatch("user/Logout").then(res => {
                this.$router.push("/login")
            })

        },
    }
}
</script>

<style scoped>

    .topbar-container {
        background-color: #49C8FD;
        /*background: linear-gradient(180deg, rgba(73, 200, 253, 1) 0%, rgba(58, 116, 239, 1) 100%);*/

        height: 80px;
        line-height: 80px;
        border-bottom: 4px solid whitesmoke;
        min-width: 1000px;
    }

    .topbar-title {
        /*color: #3A74EF;*/
        color: white;
        font-size: 22px;
        line-height: 22px;
        margin-left: 50px;
    }

    .right-menu {
        float: right;
        height: 80px;
        line-height: 80px;
    }

    .avatar-wrapper {
        height: 50px;
        cursor: pointer;
    }

</style>
