<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">系统功能设置
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
                    <el-table-column prop="set_name" label="功能名称"></el-table-column>
                    <el-table-column prop="set_para" label="字符串参数值"></el-table-column>
                    <el-table-column prop="set_value" label="数值参数值"></el-table-column>
                    <el-table-column prop="set_enable" label="是否启用">
                        <template slot-scope="scope">
                            {{scope.row.set_enable === true ? "是" : "否"}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="set_note" label="描述" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary"
                                       @click="handleUpdate(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button size="mini" type="danger"
                                       @click="handleDelete(scope.$index, scope.row)">删除
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

            <el-dialog v-dialogDrag :title="dialogFormTitle" :close-on-click-modal="false"
                       :visible.sync="showAddDialog" append-to-body width="400px">
                <div class="dialog-content">
                    <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                             label-width="120px">
                        <el-form-item label="功能名称：" prop="set_name">
                            <el-input v-model="dataForm.set_name"></el-input>
                        </el-form-item>
                        <el-form-item label="字符串参数值：" prop="set_para">
                            <el-input v-model="dataForm.set_para"></el-input>
                        </el-form-item>
                        <el-form-item label="数值参数值：" prop="set_value">
                            <InputNumber v-model.number="dataForm.set_value" :min="0"></InputNumber>
                        </el-form-item>
                        <el-form-item label="是否启用：" prop="set_enable">
                            <el-select placeholder="请选择" v-model="dataForm.set_enable">
                                <el-option label="是" :value=true></el-option>
                                <el-option label="否" :value=false></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="描述：" prop="set_note" class="textarea">
                            <el-input type="textarea" placeholder="请输入文字，最多为100个字。"
                                      v-model="dataForm.set_note"></el-input>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: right">
                        <el-button size="medium" @click="handleBack">取消</el-button>
                        <el-button size="medium" type="primary" :loading="btnLoading" @click="handleSaveRecord">确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
import {getSysFunctionList, addSysFunction, updateSysFunction, deleteSysFunction} from '../../../api/setting'

export default {
    name: "sysfunction",

    data() {
        return {
            btnLoading: false,
            dataList: [],
            loading: false,
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showAddDialog: false,
            dialogFormTitle: "",
            dataForm: {
                id: 0,
                set_name: "",
                set_para: "",
                set_value: "",
                set_note: 0,
                set_enable: "",
                set_createtime: "",
            },
            rules: {
                set_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
                set_note: [
                    {min: 0, max: 100, message: '长度在 0 到 100 个字', trigger: 'blur'}
                ]
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
            getSysFunctionList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
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
            this.dialogFormTitle = "添加系统功能信息"
            this.showAddDialog = true
            this.dataForm = {}
            this.dataForm.id = 0
        },
        handleUpdate(index, row) {
            this.dialogFormTitle = "编辑系统功能信息"
            Object.assign(this.dataForm, row);
            this.showAddDialog = true
        },
        handleDelete(index, row) {
            this.$confirm("确认删除？", "确认删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let id = row.id;
                deleteSysFunction({id: id}, this.pageIndex - 1, this.pageSize)
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
        handleSaveRecord() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    this.btnLoading = false;
                    return false;
                }

                this.btnLoading = true
                let postData = {};
                Object.assign(postData, this.dataForm);
                if (postData.id === 0) {
                    addSysFunction(postData, this.pageIndex - 1, this.pageSize)
                        .then((res) => {
                            let result = res.data.result
                            this.dataList = result.data
                            // this.getList();
                            this.showAddDialog = false;
                            this.$message.success("添加成功！");
                            this.btnLoading = false
                        }).catch((err) => {
                        this.$errMsg(err.msg);
                        this.btnLoading = false
                    });
                } else {
                    updateSysFunction(postData, this.pageIndex - 1, this.pageSize)
                        .then((res) => {
                            let result = res.data.result
                            this.dataList = result.data
                            this.showAddDialog = false;
                            this.$message.success("编辑成功！");
                            this.btnLoading = false;
                        })
                        .catch((err) => {
                            this.btnLoading = false;
                            this.$errMsg(err.msg);
                        });
                }
            })
        },
        handleBack() {
            this.showAddDialog = false
            this.btnLoading = false
        },
    }
}
</script>

<style lang="scss">
.el-tooltip__popper {
    max-width: 300px;
    padding: 16px;
    background: #fff !important;
    color: #666 !important;
    box-shadow: 1px 1px 5px 1px #D3D3D6;
}
</style>
<!--public int ID { get; set; }-->
<!--public string Set_Name { get; set; }-->

<!--/// <summary>-->
<!--    /// 字符串参数值-->
<!--    /// </summary>-->
<!--public string Set_Para { get; set; }-->

<!--/// <summary>-->
<!--    /// 数值参数值-->
<!--    /// </summary>-->
<!--public int Set_Value { get; set; }-->

<!--/// <summary>-->
<!--    /// 描述-->
<!--    /// </summary>-->
<!--public string Set_Note { get; set; }-->

<!--/// <summary>-->
<!--    /// 是否启用-->
<!--    /// </summary>-->
<!--public bool Set_Enable { get; set; }-->

<!--/// <summary>-->
<!--    /// 创建时间-->
<!--    /// </summary>-->
<!--public DateTime Set_CreateTime { get; set; }-->
