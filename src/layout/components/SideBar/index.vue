<template>
    <div class="sidebar">
<!--        <logo :collapse="isCollapse" />-->
        <div style="height: 100px;font-size: 15px">这里是logo</div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!-- default-active: 当前激活的菜单，传入菜单的index -->
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <div>access_routes: {{access_routes}}</div>
                <sidebar-item
                    v-for="(route,index) in access_routes"
                    :key="index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
export default {
    components: { SidebarItem },
    data() {
        return {
            access_route: [],
            currentRoutes:[],
        };
    },
    computed: {
        ...mapGetters(["sidebar","access_routes"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;

            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        variables() {
            // console.log("access_routes: ",access_routes)

            return variables;
        },
        isCollapse() {
            console.log("isCollapse",this.sidebar.opened)
            return !this.sidebar.opened;
        }
    },
    
    mounted() {

    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.sidebar {
    position: relative;
}


</style>