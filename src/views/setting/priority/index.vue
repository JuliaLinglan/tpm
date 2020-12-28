<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">优先级设置
                <el-input style="flex-grow: 0; flex-basis: 200px;" size="medium"></el-input>
                <el-button style="flex-grow: 0" size="medium">搜索</el-button>
            </div>
            <div class="panel-content">
                <el-form :inline="true" label-width="100px" style="margin-top: 5px;" size="small">
                    <el-form-item>
                        <el-button @click="handleAdd" type="primary" size="medium">添加</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                    class="tt-table"
                    empty-text="没有数据"
                    header-cell-class-name="table_header_style"
                    :data="dataList">
                    <el-table-column prop="priorityname" label="优先级名称"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSetting(scope.$index, scope.row)">设置</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pager-box">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrPageChange"
                                   :current-page.sync="pageIndex" :page-size="pageSize" :total="total" background
                                   style="float:right;"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {getPriorityList, deletePriority} from '@/api/setting'

export default {
    name: "priority",

    data() {
        return {
            btnLoading: false,
            dataList: [],
            loading: false,
            pageIndex: 1,
            pageSize: 20,
            total: 0,
            showAddDialog: false,
            dialogFormTitle: "",
            dataForm: {
                id: 0,
                priorityname: "",
            },
        }
    },
    created() {
        this.getList()
    },
    methods: {
        handleCurrPageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getList();
        },
        getList() {
            this.loading = true
            getPriorityList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
                let result = res.data.result
                this.dataList = result.data
                this.total = result.totalitemcount
                this.pageindex = result.pageindex
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })
        },
        handleAdd() {
            this.$router.push({
                path: '/prioritydetail'
            })
        },
        handleSetting(index, row) {
            this.$router.push({
                path: '/prioritydetail',
                query: {priorityId: row.id, editEnable: "true"}
            })

        },
        handleDelete(index, row) {
            this.$confirm("确认删除？", "确认删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let id = row.id;
                deletePriority({id: id}, this.pageIndex - 1, this.pageSize)
                    .then((res) => {
                        let result = res.data.result
                        this.dataList = result.data
                        this.$message.success("删除成功！");
                    })
                    .catch((err) => {
                        this.$errMsg(err.msg);
                    });
            }).catch((err) => {
                this.$errMsg(err.msg);
            });
        },
        handleBack() {
            this.showAddDialog = false
            this.btnLoading = false
        },
    }
}
</script>

<style lang="scss">

</style>
<!--public int ID { get; set; }-->
<!--/// <summary>-->
<!--/// 优先级名称-->
<!--/// </summary>-->
<!--public string PriroityName { get; set; }-->