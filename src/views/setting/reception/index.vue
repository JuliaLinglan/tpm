<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">服务台设置
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
                    <el-table-column prop="ms_name" label="服务台名称"></el-table-column>
                    <el-table-column prop="ms_ip" label="服务台IP"></el-table-column>
                    <el-table-column prop="ms_amstarttime" label="上午开始取票时间"></el-table-column>
                    <el-table-column prop="ms_amendtime" label="上午结束取票时间"></el-table-column>
                    <el-table-column prop="ms_pmstarttime" label="下午开始取票时间"></el-table-column>
                    <el-table-column prop="ms_pmendtime" label="下午结束取票时间"></el-table-column>
                    <el-table-column width="100px" label="工作站">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSetting(scope.$index, scope.row)">设置</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column width="100px" label="服务台">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSettingSrv(scope.$index, scope.row)">设置</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column width="220px" label="操作">
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
                       :visible.sync="showAddDialog" width="810px">
                <div class="dialog-content">
                    <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                             label-width="150px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="服务台名称：" prop="ms_name">
                                    <el-input style="width: 220px" v-model="dataForm.ms_name"></el-input>
                                </el-form-item>
                                <el-form-item label="上午开始取票时间：" prop="ms_amstarttime">
                                    <el-time-picker
                                        v-model="dataForm.ms_amstarttime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间点">
                                    </el-time-picker>
                                </el-form-item>
                                <el-form-item label="下午开始取票时间：" prop="ms_pmstarttime">
                                    <el-time-picker
                                        v-model="dataForm.ms_pmstarttime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间点">
                                    </el-time-picker>
                                </el-form-item>

                            </el-col>
                            <el-col :span="12" style="padding-left: 20px">
                                <el-form-item label="服务台IP：" prop="ms_ip">
                                    <el-input style="width: 220px" v-model="dataForm.ms_ip"></el-input>
                                </el-form-item>

                                <el-form-item label="上午结束取票时间：" prop="ms_amendtime">
                                    <el-time-picker
                                        v-model="dataForm.ms_amendtime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间点">
                                    </el-time-picker>
                                </el-form-item>
                                <el-form-item label="下午结束取票时间：" prop="ms_pmendtime">
                                    <el-time-picker
                                        v-model="dataForm.ms_pmendtime"
                                        value-format="HH:mm:ss"
                                        placeholder="任意时间点">
                                    </el-time-picker>
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
                        :props="{key: 'Ws_ID',label: 'Ws_Name'}"
                        v-model="checkedList"
                        :data="workStationList"
                    ></el-transfer>

                    <div style="text-align: right;margin-top: 10px">
                        <el-button size="medium" @click="handleWorkStationBack">取消</el-button>
                        <el-button size="medium" type="primary" :loading="saveWorkStationLoading"
                                   @click="handleSaveWorkStation">确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog v-dialogDrag :title="dialogFormTitle" :close-on-click-modal="false"
                       :visible.sync="showSrv" append-to-body width="800px">
                <div class="dialog-content content-transfer">
                    <div style="font-size: 20px;margin-bottom: 10px">
                        选择加入服务类型：
                    </div>
                    <el-transfer
                        :titles="['未选服务类型','已选服务类型']"
                        :props="{key: 'Srvgroup_ID',label: 'Srvgroup_Name'}"
                        v-model="checkedSrvList"
                        :data="srvList"
                    ></el-transfer>

                    <div style="text-align: right;margin-top: 10px">
                        <el-button size="medium" @click="handleSrvBack">取消</el-button>
                        <el-button size="medium" type="primary" :loading="saveWorkStationLoading"
                                   @click="handleSaveSrv">确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    getMsdisplayList,
    addMsdisplay,
    updateMsdisplay,
    deleteMsdisplay,
    getMsWorkStationById,
    addMsWorkStation, getMsSrvById, addMsSrv
} from '@/api/setting'

export default {
    name: "reception",
    data() {
        return {
            saveWorkStationLoading: false,
            showWorkStation: false,
            checkedList: [],
            workStationList: [],
            currMsId: 0,
            saveSrvLoading: false,
            showSrv: false,
            checkedSrvList: [],
            srvList: [],
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
                ms_name: "",
                ms_ip: "",
                ms_amstarttime: "",
                ms_amendtime: "",
                ms_pmstarttime: "",
                ms_pmendtime: "",
            },
            rules: {
                ms_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
                ms_ip: [{required: true, message: "值不能为空", trigger: 'blur'}],
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

            getMsdisplayList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
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
            this.dialogFormTitle = "添加服务台信息"
            this.showAddDialog = true
            this.dataForm = {}
            this.dataForm.id = 0
            this.dataForm.ms_amstarttime = '08:30:00'
            this.dataForm.ms_amendtime = '11:30:00'
            this.dataForm.ms_pmstarttime = '13:00:00'
            this.dataForm.ms_pmendtime = '16:30:00'
        },
        handleUpdate(index, row) {
            this.dialogFormTitle = "编辑服务台信息"
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
                deleteMsdisplay({id: id}, this.pageIndex - 1, this.pageSize)
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
                    addMsdisplay(postData, this.pageIndex - 1, this.pageSize)
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
                    updateMsdisplay(postData, this.pageIndex - 1, this.pageSize)
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
        handleSetting(index, row) {
            this.showWorkStation = true
            this.dialogFormTitle = "设置" + row.ms_name + "工作站"
            this.currMsId = row.id
            getMsWorkStationById({ms_id: row.id}).then((res) => {
                this.workStationList = JSON.parse(res.data.result)
                console.log("this.workStationList: ", this.workStationList)
                let checkedIdList = []
                for (let i = 0; i < this.workStationList.length; i++) {
                    let item = this.workStationList[i]
                    if (item.isSelect) {
                        checkedIdList.push(item.Ws_ID)
                    }
                }
                this.checkedList = checkedIdList
                console.log("checkedIdList: ", checkedIdList)
            }).catch((err) => {
                this.$errMsg(err.msg);
            });
        },
        handleSettingSrv(index, row) {
            this.showSrv = true
            this.dialogFormTitle = "设置" + row.ms_name + "服务类型"
            this.currMsId = row.id
            getMsSrvById({ms_id: row.id}).then((res) => {
                this.srvList = JSON.parse(res.data.result)
                console.log("this.srvList: ", this.srvList)
                let checkedIdList = []
                for (let i = 0; i < this.srvList.length; i++) {
                    let item = this.srvList[i]
                    if (item.isSelect) {
                        checkedIdList.push(item.Srvgroup_ID)
                    }
                }
                this.checkedSrvList = checkedIdList
                console.log("checkedIdList: ", checkedIdList)
            }).catch((err) => {
                this.$errMsg(err.msg);
            });
        },
        handleWorkStationBack() {
            this.saveWorkStationLoading = false
            this.showWorkStation = false
        },
        handleSrvBack() {
            this.saveSrvLoading = false
            this.showSrv = false
        },
        handleSaveSrv() {
            this.saveSrvLoading = true
            let str = ''
            if (this.checkedSrvList.length > 0) {
                for (let i = 0; i < this.checkedSrvList.length; i++) {
                    if (i === this.checkedSrvList.length - 1) {
                        str = str + this.checkedSrvList[i]
                    } else {
                        str = str + this.checkedSrvList[i] + ','
                    }
                }
            }
            let postData = {ms_id: this.currMsId, srvgroup_ids: str, pageIndex: this.pageIndex - 1, pageSize: this.pageSize}
            addMsSrv(postData).then((res) => {
                    // console.log("result: ", res.data.result)
                    // let result = JSON.parse(res.data.result)
                    this.saveSrvLoading = false
                    this.showSrv = false
                }
            ).catch((err) => {
                this.saveWorkStationLoading = false
                this.$errMsg(err.msg);
            });

        },
        handleSaveWorkStation() {
            this.saveWorkStationLoading = true
            let str = ''
            if (this.checkedList.length > 0) {
                for (let i = 0; i < this.checkedList.length; i++) {
                    if (i === this.checkedList.length - 1) {
                        str = str + this.checkedList[i]
                    } else {
                        str = str + this.checkedList[i] + ','
                    }
                }
            }
            let postData = {ms_id: this.currMsId, ws_ids: str, pageIndex: this.pageIndex - 1, pageSize: this.pageSize}
            addMsWorkStation(postData).then((res) => {
                    // console.log("result: ", res.data.result)
                    // let result = JSON.parse(res.data.result)
                    this.saveWorkStationLoading = false
                    this.showWorkStation = false
                }
            ).catch((err) => {
                this.saveWorkStationLoading = false
                this.$errMsg(err.msg);
            });

        }
    }

}
</script>

<style lang="scss">

</style>
<!--/// <summary>-->
<!--/// 服务台IP-->
<!--/// </summary>-->
<!--public string MS_IP { get; set; }-->

<!--/// <summary>-->
<!--/// 服务台名称-->
<!--/// </summary>-->
<!--public string MS_Name { get; set; }-->

<!--/// <summary>-->
<!--/// 上午开始取票时间-->
<!--/// </summary>-->
<!--public string MS_AMStartTime { get; set; }-->

<!--/// <summary>-->
<!--/// 上午结束取票时间-->
<!--/// </summary>-->
<!--public string MS_AMEndTime { get; set; }-->

<!--/// <summary>-->
<!--/// 下午开始取票时间-->
<!--/// </summary>-->
<!--public string MS_PMStartTime { get; set; }-->

<!--/// <summary>-->
<!--/// 下午结束取票时间-->
<!--/// </summary>-->
<!--public string MS_PMEndTime { get; set; }-->
