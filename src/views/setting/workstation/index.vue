<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">工作站设置
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
                    <el-table-column prop="ws_name" label="工作站名称"></el-table-column>
                    <el-table-column prop="ws_enable" label="是否启用">
                        <template slot-scope="scope">
                            {{ scope.row.ws_enable === true ? "是" : "否" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="priority_id" label="优先级编号"></el-table-column>
                    <el-table-column prop="ws_priority_type" label="优先级模式"></el-table-column>
                    <el-table-column prop="ws_ip" label="工作站IP"></el-table-column>
                    <el-table-column prop="ws_pjip" label="评价器IP"></el-table-column>
                    <el-table-column prop="ws_note" label="备注" :show-overflow-tooltip="true"></el-table-column>
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
                       :visible.sync="showAddDialog" append-to-body width="600px">
                <div class="dialog-content">
                    <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                             label-width="120px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="工作站名称：" prop="ws_name">
                                    <el-input v-model="dataForm.ws_name"></el-input>
                                </el-form-item>
                                <el-form-item label="优先级编号：" prop="priority_id">
                                    <InputNumber v-model.number="dataForm.priority_id" :min="0"></InputNumber>
                                </el-form-item>

                                <el-form-item label="工作站IP：" prop="ws_ip">
                                    <el-input v-model="dataForm.ws_ip"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否启用：" prop="ws_enable">
                                    <el-select placeholder="请选择" v-model="dataForm.ws_enable">
                                        <el-option label="是" :value=true></el-option>
                                        <el-option label="否" :value=false></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="优先级模式：" prop="ws_priority_type">
                                    <InputNumber v-model.number="dataForm.ws_priority_type" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="评价器IP：" prop="ws_pjip">
                                    <el-input v-model="dataForm.ws_pjip"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="备注：" prop="ws_note" class="textarea">
                                    <el-input type="textarea" placeholder="请输入文字，最多为100个字。"
                                              v-model="dataForm.ws_note"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

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
import {getWorkstationList, addWorkstation, updateWorkstation, deleteWorkstation} from '@/api/setting'

export default {
    name: "workstation",

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
                ws_name: "",
                priority_id: 0,
                ws_priority_type: 0,
                ws_ip: "",
                ws_enable: false,
                ws_pjip: "",
                ws_note: ""
            },
            rules: {
                ws_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
                ws_note: [{min: 0, max: 100, message: '长度在 0 到 100 个字', trigger: 'blur'}]
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
            getWorkstationList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
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
            this.dialogFormTitle = "添加工作站信息"
            this.showAddDialog = true
            this.dataForm = {}
            this.dataForm.id = 0

        },
        handleUpdate(index, row) {
            this.dialogFormTitle = "编辑工作站信息"
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
                deleteWorkstation({id: id}, this.pageIndex - 1, this.pageSize)
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
                    postData.base64pic = this.imageBase64
                    addWorkstation(postData, this.pageIndex - 1, this.pageSize)
                        .then((res) => {
                            let result = res.data.result
                            this.dataList = result.data
                            this.showAddDialog = false;
                            this.$message.success("添加成功！");
                            this.btnLoading = false
                        }).catch((err) => {
                        this.$errMsg(err.msg);
                        this.btnLoading = false
                    });
                } else {
                    updateWorkstation(postData, this.pageIndex - 1, this.pageSize)
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
</style>
<!--public int ID { get; set; }-->
<!--/// <summary>-->
<!--/// 工作站名称-->
<!--/// </summary>-->
<!--public string WS_Name { get; set; }-->

<!--/// <summary>-->
<!--/// 工作站呼叫优先级编号-->
<!--/// </summary>-->
<!--public int Priority_ID { get; set; }-->

<!--/// <summary>-->
<!--/// 工作站使用的呼叫优先级工作模式编号[0，在工作站上可以选择优先级、1，读取WS_Priority、2，读取员工的优先级]-->
<!--/// </summary>-->
<!--public int WS_Priority_Type { get; set; }-->

<!--/// <summary>-->
<!--/// 工作站IP-->
<!--/// </summary>-->
<!--public string WS_IP { get; set; }-->

<!--/// <summary>-->
<!--/// 工作站启用标识-->
<!--/// </summary>-->
<!--public bool WS_Enable { get; set; }-->

<!--/// <summary>-->
<!--/// 评价器IP-->
<!--/// </summary>-->
<!--public string WS_PJIP { get; set; }-->

<!--/// <summary>-->
<!--/// 备注-->
<!--/// </summary>-->
<!--public string WS_Note { get; set; }-->
