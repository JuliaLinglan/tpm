<template>
    <div class="app-main">
        <div style="background: white; width: 100%; height: 40px;">
           <span
               class="back-item"
               style="color:#666666; cursor: pointer;"
               @click="handleBack">
                <i style="color:#666666" class="el-icon-arrow-left"></i> 返回
            </span>
            <span style="color:#666666;">{{currentRoute.meta.title}}</span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "appmain",

    data() {
        return {
            matched: [],
            currentRoute: null,
        }    },

    watch: {
        $route(route, old) {
            this.fromPath = old;
            this.matched = route.matched;
            this.currentRoute = route
        }
    },
    created() {
        this.matched = this.$route.matched;
        this.currentRoute = this.$route
    },
    methods: {
        handleBack() {
            if(this.$route.path!=='/dashboard/project'){
                if(this.fromPath){
                    this.$router.back();
                }else{
                    this.$router.push('/dashboard/project')
                }
            }

        },
    },
}

</script>

<style scoped lang="scss">
.app-main {
    /* 50= navbar  50  */
    height: calc(100vh - 60px);
    width: 100%;
    position: relative;
    background: #f2f7fb;
    overflow: auto;
    min-width: 1200px;
    .back-item {
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .back-item:hover {
        color: rgb(64, 158, 255);
        cursor: pointer;
    }

}
</style>
