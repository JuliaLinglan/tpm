<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">部门设置
                <el-input style="flex-grow: 0; flex-basis: 200px;" size="medium"></el-input>
                <el-button style="flex-grow: 0" size="medium">搜索</el-button></div>
            <div class="panel-content">
                <el-form :inline="true" label-width="100px" style="margin-top: 5px;" size="small">
                    <el-form-item>
                        <el-button type="primary" size="medium">添加中</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                    class="tt-table"
                    empty-text="没有部门"
                    header-cell-class-name="table_header_style"
                    :data="dataList">
                    <el-table-column
                        prop="date"
                        label="日期">
                    </el-table-column>
                    <el-table-column
                        prop="summary"
                        label="简介">
                    </el-table-column>
                    <el-table-column
                        prop="temperatureC"
                        label="摄氏温度">
                    </el-table-column>
                    <el-table-column
                        prop="temperatureC"
                        label="华氏温度">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template>
                            <el-button size="mini">编辑</el-button>
                            <el-button size="mini" type="danger">删除</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <div class="pager-box">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrPageChange"
                        :current-page.sync="pageIndex"
                        :page-size="pageSize"
                        :total="total"
                        background
                        style="float:right;"
                    ></el-pagination>
                </div>
<!--                <el-table-->
<!--                    :data="dataList"-->
<!--                    empty-text="没有部门"-->
<!--                    class="tt-table"-->
<!--                    v-loading="loading">-->
<!--                    <el-table-column-->
<!--                        prop="dpID"-->
<!--                        label="id"-->
<!--                        width="50"-->
<!--                        style="text-align: center;">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpNo"-->
<!--                        label="部门编号"-->
<!--                        width="100">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpName"-->
<!--                        label="部门名称"-->
<!--                        width="150">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpType"-->
<!--                        label="部门类型"-->
<!--                        width="100">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpFatherID"-->
<!--                        label="上级部门编号"-->
<!--                        width="140">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpLevelIndex"-->
<!--                        label="部门层级代码"-->
<!--                        width="140">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="siteID"-->
<!--                        label="部门所属单位机构编号"-->
<!--                        width="200">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        prop="dpNote"-->
<!--                        label="部门工作说明"-->
<!--                        width="120">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                        width="150px"-->
<!--                        label="操作">-->
<!--                        <template slot-scope="scope">-->
<!--                            <template>-->
<!--                                <el-button-->

<!--                                    type="text"-->
<!--                                >Edit-->
<!--                                </el-button>-->
<!--                                <el-button-->
<!--                                    type="text"-->

<!--                                >Delete-->
<!--                                </el-button>-->

<!--                            </template>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->
            </div>
        </div>
    </div>

</template>

<script>
import {departmentInfos} from '../../../api/api'
import {mapGetters} from 'vuex'

export default {
    name: "department",

    data() {
        return {
            dataList: [],
            loading: false,
            pageIndex: 2,
            pageSize: 20,
            total: 0,
        }
    },
    created() {
        this.getUser()
    },
    mounted() {
    },
    computed: {
        ...mapGetters([
            'username',
        ])
    },
    methods: {
        handleCurrPageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getUser();
        },
        getUser() {
            this.loading = true
            departmentInfos().then(res => {
                this.dataList = res.data.result
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })
        },
    },
}
</script>

<style lang="scss">
</style>
