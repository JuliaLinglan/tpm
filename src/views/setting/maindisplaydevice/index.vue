<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">主显示屏设置
                <el-input style="flex-grow: 0; flex-basis: 200px;" size="medium"></el-input>
                <el-button style="flex-grow: 0" size="medium">搜索</el-button>
            </div>
            <div class="panel-content">
                <el-form :inline="true" label-width="100px" style="margin-top: 5px;" size="small">
                    <el-form-item>
                        <el-button @click="handleAddMainDisplay" type="primary" size="medium">添加</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                        class="tt-table"
                        empty-text="没有数据"
                        header-cell-class-name="table_header_style"
                        :data="dataList">
                    <el-table-column prop="md_name" label="设备名称"></el-table-column>
                    <el-table-column prop="md_ip" label="设备IP"></el-table-column>
                    <el-table-column width="90px" prop="md_type" label="设备类型">
                        <template slot-scope="scope">
                            {{ $dict.getMDType(scope.row.md_type).label }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="md_update_time" label="更新时间（秒）"></el-table-column>
                    <el-table-column prop="md_showmode" label="显示模式">
                        <template slot-scope="scope">
                            {{ $dict.getShowMode(scope.row.md_showmode).label }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="md_flup_time" label="翻页时间（秒）"></el-table-column>
                    <el-table-column prop="md_scroll_time" label="滚动时间"></el-table-column>
                    <el-table-column prop="md_dialog_enable" label="弹框标识">
                        <template slot-scope="scope">
                            {{ scope.row.md_dialog_enable === true ? "是" : "否" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="md_dialog_time" label="弹框显示时间（秒）"></el-table-column>
                    <el-table-column prop="md_scroll_txt" label="滚动信息" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="md_queue_view" label="主显示设备对应的显示视图"></el-table-column>
                    <el-table-column width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSetting(scope.$index, scope.row)">设置</el-button>
                            <el-button size="mini" type="primary"
                                       @click="handleUpdateMainDisplay(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button size="mini" type="danger"
                                       @click="handleDeleteMainDisplay(scope.$index, scope.row)">删除
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
                            <el-col :span="8">
                                <el-form-item label="设备名称：" prop="md_name">
                                    <el-input v-model="dataForm.md_name"></el-input>
                                </el-form-item>
                                <el-form-item label="设备IP：" prop="md_ip">
                                    <el-input v-model="dataForm.md_ip"></el-input>
                                </el-form-item>
                                <el-form-item label="设备类型：" prop="md_type">
                                    <el-select placeholder="请选择" v-model="dataForm.md_type">
                                        <el-option v-for="(item,index) in $dict.getMDType()" :key="index"
                                                   :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item type="number" label="更新时间（秒）：" prop="md_update_time">
                                    <InputNumber v-model.number="dataForm.md_update_time" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="显示模式：" prop="md_showmode">
                                    <el-select placeholder="请选择" v-model="dataForm.md_showmode">
                                        <el-option v-for="(item,index) in $dict.getShowMode()" :key="index"
                                                   :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item type="number" label="翻页时间（秒）：" prop="md_flup_time">
                                    <InputNumber v-model.number="dataForm.md_flup_time" :min="0"></InputNumber>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item type="number" label="弹框显示时间（秒）：" prop="md_dialog_time"
                                              label-width="170px">
                                    <InputNumber v-model.number="dataForm.md_dialog_time" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item type="number" label="滚动时间：" prop="md_scroll_time">
                                    <InputNumber v-model.number="dataForm.md_scroll_time" :min="0"></InputNumber>
                                </el-form-item>
                                <el-form-item label="弹框标识：" prop="md_dialog_enable">
                                    <el-select placeholder="请选择" v-model="dataForm.md_dialog_enable">
                                        <el-option label="是" :value=true></el-option>
                                        <el-option label="否" :value=false></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="滚动信息：" prop="md_scroll_txt" class="textarea">
                                    <el-input type="textarea" placeholder="请输入文字，最多为100个字。"
                                              v-model="dataForm.md_scroll_txt"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="主显示设备对应的显示视图：" prop="md_queue_view" label-width="200px">
                                    <el-input v-model="dataForm.md_queue_view"></el-input>
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
            <el-dialog v-dialogDrag :title="dialogFormTitle" :close-on-click-modal="false"
                       :visible.sync="showWorkStation" append-to-body width="800px">
                <div class="dialog-content content-transfer">
                    <div style="font-size: 20px;margin-bottom: 10px">
                        选择加入工作站：
                    </div>
                    <el-transfer
                            :titles="['未选工作站','已选工作站']"
                            :props="{key: 'id',label: 'ws_name'}"
                            v-model="checkedList"
                            :data="workStationList"
                    ></el-transfer>

                    <div style="text-align: right">
                        <el-button size="medium" @click="handleBack">取消</el-button>
                        <el-button size="medium" type="primary" :loading="btnLoading" @click="handleSaveWorkStation">确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
import {getMaindisplayList, addMaindisplay, updateMaindisplay, deleteMaindisplay} from '../../../api/setting'

export default {
    name: "maindisplaydevice",

    data() {
        return {
            btnLoading: false,
            showWorkStation: false,
            checkedList: [],
            workStationList: [],
            currMdIndex:0,
            dataList: [],
            loading: false,
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showAddDialog: false,
            dialogFormTitle: "",
            dataForm: {
                id: 0,
                md_name: "",
                md_ip: "",
                md_type: "",
                md_update_time: 0,
                md_showmode: "",
                md_videourl: "",
                md_flup_time: 0,
                md_scroll_txt: "",
                md_scroll_time: 0,
                md_dialog_enable: false,
                md_dialog_time: 0,
                md_queue_view: "",
            },
            rules: {
                md_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
                md_ip: [{required: true, message: "值不能为空", trigger: 'blur'}],
                md_scroll_txt: [
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
            getMaindisplayList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
                let result = res.data.result
                this.dataList = result.data
                this.total = result.totalitemcount
                this.pageindex = result.pageindex
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })
        },

        handleAddMainDisplay() {
            this.dialogFormTitle = "添加主显示屏信息"
            this.showAddDialog = true
            this.dataForm = {}
            this.dataForm.id = 0
        },
        handleUpdateMainDisplay(index, row) {
            this.dialogFormTitle = "编辑主显示屏信息"
            Object.assign(this.dataForm, row);
            this.showAddDialog = true
        },
        handleDeleteMainDisplay(index, row) {
            this.$confirm("确认删除？", "确认删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let id = row.id;
                deleteMaindisplay({id: id}, this.pageIndex - 1, this.pageSize)
                    .then((res) => {
                        this.getList();
                        this.$message.success("删除成功！");
                    })
                    .catch((err) => {
                        this.$message.error(err.msg);
                    });
            }).catch((err) => {
                this.$message.error(err.msg);
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
                    addMaindisplay(postData, this.pageIndex - 1, this.pageSize)
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
                    updateMaindisplay(postData, this.pageIndex - 1, this.pageSize)
                        .then((res) => {
                            let result = res.data.result
                            this.dataList = result.data
                            // this.getList();
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
        handleSettingV2(index, row) {
            this.showWorkStation = true
            this.dialogFormTitle = "设置" + row.md_name + "工作站"
            this.currMdIndex = index
            this.workStationList = [
                {id: 1, ws_name: "111", isselect: false},
                {id: 2, ws_name: "222", isselect: true},
                {id: 3, ws_name: "333", isselect: false},
                {id: 4, ws_name: "444", isselect: true},
                {id: 5, ws_name: "555", isselect: false},
                {id: 6, ws_name: "666", isselect: false},
                {id: 7, ws_name: "777", isselect: false},
                {id: 8, ws_name: "888", isselect: false},
                {id: 9, ws_name: "999", isselect: false},
                {id: 10, ws_name: "aaaa", isselect: false}
            ]

            let checkedIdList = []
            for (let i = 0; i < this.workStationList.length; i++) {
                let item = this.workStationList[i]
                if (item.isselect) {
                    checkedIdList.push(item.id)
                }
            }
            this.checkedList = checkedIdList
            console.log("checkedIdList: ", checkedIdList)
        },
        handleSaveWorkStation() {

        }
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


<!--namespace IQS.Models.Models-->
<!--{-->
<!--public class Basic_MainDisplay:BaseEntity-->
<!--{-->
<!--/// <summary>-->
<!--/// 设备名称-->
<!--/// </summary>-->
<!--public string MD_Name { get; set; }-->

<!--/// <summary>-->
<!--/// 设备IP-->
<!--/// </summary>-->
<!--public string MD_IP { get; set; }-->

<!--/// <summary>-->
<!--/// 设备类型:1小屏、2大屏、  3 LED、4语音-->
<!--/// </summary>-->
<!--public int MD_Type { get; set; }-->

<!--/// <summary>-->
<!--/// 更新时间（秒）-->
<!--/// </summary>-->
<!--public int MD_Update_Time { get; set; }-->

<!--/// <summary>-->
<!--/// 显示模式:1，堆栈、2，表格、3，视频加堆栈-->
<!--/// </summary>-->
<!--public int MD_ShowMode { get; set; }-->

<!--/// <summary>-->
<!--/// 视频地址-->
<!--/// </summary>-->
<!--public string MD_VideoUrl { get; set; }-->

<!--/// <summary>-->
<!--/// 翻页时间（秒）-->
<!--/// </summary>-->
<!--public int MD_Flup_Time { get; set; }-->

<!--/// <summary>-->
<!--/// 滚动信息-->
<!--/// </summary>-->
<!--public string MD_Scroll_Txt { get; set; }-->

<!--/// <summary>-->
<!--/// 滚动时间（秒）-->
<!--/// </summary>-->
<!--public int MD_Scroll_Time { get; set; }-->

<!--/// <summary>-->
<!--/// 弹框标识:0，不弹、1，弹-->
<!--/// </summary>-->
<!--public bool MD_Dialog_Enable { get; set; }-->

<!--/// <summary>-->
<!--/// 弹框显示时间（秒）-->
<!--/// </summary>-->
<!--public int MD_Dialog_Time { get; set; }-->

<!--/// <summary>-->
<!--/// 主显示设备对应的显示视图-->
<!--/// </summary>-->
<!--public string MD_Queue_View { get; set; }-->
<!--}-->
<!--}-->
