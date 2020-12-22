<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">服务类别设置
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
                    <el-table-column prop="srvgroup_group" label="服务类型组"></el-table-column>
                    <el-table-column prop="srvgroup_no" label="第三方的类型ID"></el-table-column>
                    <el-table-column prop="srvgroup_name" label="类型名称"></el-table-column>
                    <el-table-column prop="srvgroup_letter" label="标识"></el-table-column>
                    <el-table-column prop="srvgroup_start_num" label="开始号码"></el-table-column>
                    <el-table-column prop="srvgroup_end_num" label="结束号码"></el-table-column>
                    <el-table-column prop="srvgroup_enterqueuetime" label="进入队列行走时间（分钟）"></el-table-column>
                    <el-table-column prop="srvgroup_ticketid" label="号票ID"></el-table-column>
                    <el-table-column prop="srvgroup_voice_txt" label="语音模板"></el-table-column>
                    <el-table-column prop="srvgroup_note" label="备注" :show-overflow-tooltip="true"></el-table-column>
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
                       :visible.sync="showAddDialog" append-to-body>
                <div class="dialog-content">
                    <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                             label-width="140px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="类型名称：" prop="srvgroup_name">
                                    <el-input v-model="dataForm.srvgroup_name"></el-input>
                                </el-form-item>
                                <el-form-item label="标识：" prop="srvgroup_letter">
                                    <el-input v-model="dataForm.srvgroup_letter"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="服务类型组：" prop="srvgroup_group">
                                    <InputNumber v-model.number="dataForm.srvgroup_group" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="第三方的类型ID：" prop="srvgroup_no">
                                    <el-input v-model="dataForm.srvgroup_no"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开始号码：" prop="srvgroup_start_num">
                                    <InputNumber v-model.number="dataForm.srvgroup_start_num"
                                                 :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="结束号码：" prop="srvgroup_end_num">
                                    <InputNumber v-model.number="dataForm.srvgroup_end_num" :min="0"></InputNumber>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="号票ID：" prop="srvgroup_ticketid">
                                    <InputNumber v-model.number="dataForm.srvgroup_ticketid" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="语音模板：" prop="srvgroup_voice_txt">
                                    <el-input v-model="dataForm.srvgroup_voice_txt"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="进入队列行走时间（分钟）：" prop="srvgroup_enterqueuetime"
                                              label-width="210px">
                                    <InputNumber v-model.number="dataForm.srvgroup_enterqueuetime"
                                                 :min="0"></InputNumber>
                                </el-form-item>
                            </el-col>

                            <el-col :span="24">
                                <el-form-item label="描述：" prop="srvgroup_note" class="textarea">
                                    <el-input type="textarea" placeholder="请输入文字，最多为100个字。"
                                              v-model="dataForm.srvgroup_note"></el-input>
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
import {getSrvGroupList, addSrvGroup, updateSrvGroup, deleteSrvGroup} from '../../../api/setting'

export default {
    name: "srvgroup",

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
                srvgroup_group: "",
                srvgroup_no: 0,
                srvgroup_name: "",
                srvgroup_letter: "",
                srvgroup_start_num: 0,
                srvgroup_end_num: 0,
                srvgroup_enterqueuetime: 0,
                srvgroup_ticketid: 0,
                srvgroup_voice_txt: "",
                srvgroup_note: "",
            },
            rules: {
                srvgroup_group: [{required: true, message: "值不能为空", trigger: 'blur'}],
                srvgroup_note: [
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
            getSrvGroupList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
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
            this.dialogFormTitle = "添加服务类别信息"
            this.showAddDialog = true
            this.dataForm = {}
            this.dataForm.id = 0
        },
        handleUpdate(index, row) {
            this.dialogFormTitle = "编辑服务类别信息"
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
                deleteSrvGroup({id: id}, this.pageIndex - 1, this.pageSize)
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
                    addSrvGroup(postData, this.pageIndex - 1, this.pageSize)
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
                    updateSrvGroup(postData, this.pageIndex - 1, this.pageSize)
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
<!--/// <summary>-->
<!--/// 服务类型组-->
<!--/// </summary>-->
<!--public int SrvGroup_Group { get; set; }-->

<!--/// <summary>-->
<!--/// 第三方的类型ID-->
<!--/// </summary>-->
<!--public string SrvGroup_NO { get; set; }-->

<!--/// <summary>-->
<!--/// 类型名称-->
<!--/// </summary>-->
<!--public string SrvGroup_Name { get; set; }-->

<!--/// <summary>-->
<!--/// 标识-->
<!--/// </summary>-->
<!--public string SrvGroup_Letter { get; set; }-->

<!--/// <summary>-->
<!--/// 开始号码-->
<!--/// </summary>-->
<!--public int SrvGroup_Start_Num { get; set; }-->

<!--/// <summary>-->
<!--/// 结束号码-->
<!--/// </summary>-->
<!--public int SrvGroup_End_Num { get; set; }-->

<!--/// <summary>-->
<!--/// 进入队列行走时间（分钟）-->
<!--/// </summary>-->
<!--public int SrvGroup_EnterQueueTime { get; set; }-->

<!--/// <summary>-->
<!--/// 号票ID-->
<!--/// </summary>-->
<!--public int SrvGroup_TicketID { get; set; }-->


<!--/// <summary>-->
<!--/// 备注-->
<!--/// </summary>-->
<!--public string SrvGroup_Note { get; set; }-->

<!--/// <summary>-->
<!--/// 语音模板-->
<!--/// </summary>-->
<!--public string SrvGroup_Voice_Txt { get; set; }-->
