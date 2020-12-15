<template>
    <div>
        <el-card class="app-card" style="margin-top: 20px;">
            <span>部门设置</span>
            <el-form :inline="true" label-width="100px" style="margin-top: 5px;" size="small">
                <el-form-item>
                    <el-button type="primary">添加</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    :data="dataList"
                    empty-text="没有部门"
                    border
                    v-loading="loading"
                    style="width: 100%; font-size: 14px;">
                <el-table-column
                        prop="dpID"
                        label="id"
                        width="50"
                        style="text-align: center;">
                </el-table-column>
                <el-table-column
                        prop="dpNo"
                        label="部门编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="dpName"
                        label="部门名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="dpType"
                        label="部门类型"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="dpFatherID"
                        label="上级部门编号"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="dpLevelIndex"
                        label="部门层级代码"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="siteID"
                        label="部门所属单位机构编号"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="dpNote"
                        label="部门工作说明"
                        width="120">
                </el-table-column>
                <el-table-column
                        width="150px"
                        label="操作">
                    <template slot-scope="scope">
                        <template>
                            <el-button

                                    type="text"
                            >Edit
                            </el-button>
                            <el-button
                                    type="text"

                            >Delete
                            </el-button>

                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import {departmentInfos} from '../../api/api'
import {mapGetters} from 'vuex'

export default {
    name: "department",

    data() {
        return {
            dataList: [],
            loading: false,
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

        getUser() {
            // this.loading = true
            // departmentInfos().then(res => {
            //     this.dataList = res.data.result
            //     this.loading = false
            // }).catch((err) => {
            //     this.loading = false
            // })
        },
    },
}
</script>

<style scoped>

</style>
