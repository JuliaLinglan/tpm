<template>
    <!-- 只渲染没有hidden属性的路由组件 -->
    <div v-if="!item.hidden" class="menu-wrapper">
        <!-- 渲染 (只有一个child && 非alwaysShow) 的路由组件，直接渲染为el-menu-item，不带嵌套-->
        <template
            v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
        >
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{'submenu-title-noDropdown':!isNest}"
                >
                    <item
                        :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
                        :title="onlyOneChild.meta.title"
                    />
                </el-menu-item>
            </app-link>
        </template>
        <!-- 渲染有两个及以上的路由组件 -->

        <el-submenu
            v-else
            ref="subMenu"
            :index="resolvePath(item.path)"
            :popper-append-to-body="isAppend"
        >
            <template slot="title">
                <!-- Item组件,渲染导航栏每一个item的内容,渲染函数 -->
                <item
                    v-if="item.meta"
                    :icon="item.meta && item.meta.icon"
                    :title="item.meta.title"
                />
            </template>
            <!-- 递归组件 -->
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
import path from "path";
import Item from "./Item";
import AppLink from "./Link";

export default {
    name: "SidebarItem",
    components: {Item, AppLink},
    props: {
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ""
        }
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODOadmin: refactor with render function
        this.onlyOneChild = null;
        return {isAppend: true};
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
            //非hidden
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = {
                    ...parent,
                    path: "",
                    noShowingChildren: true
                };
                return true;
            }

            return false;
        },
        resolvePath(routePath) {
            return path.resolve(this.basePath, routePath);
        }
    }
};
</script>
