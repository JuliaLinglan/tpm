<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title"></div>
            <div class="panel-content">
                <div>
                    优先级名称:
                    <el-input placeholder="请输入优先级名称" class="template-name-input" v-model="priorityname"
                              :disabled="!inputEnable"></el-input>
                    <el-button type="primary" size="medium" v-if="editEnable===true" @click="handleEditPriorityName">
                        编辑
                    </el-button>
                    <el-button type="primary" size="medium" :loading="saveLoading" @click="handleSavePriorityName">保存
                    </el-button>
                </div>
            </div>
            <div class="panel-content">
                <el-table
                        class="tt-table"
                        empty-text="没有数据"
                        header-cell-class-name="table_header_style"
                        :data="priorityLevels">
                    <el-table-column prop="level_name" label="等级"></el-table-column>
                    <el-table-column prop="psrvgroups" label="服务台优先顺序">
                        <template slot-scope="scope">
                            {{ getOrderStr(scope.row) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleSettingV2(scope.$index, scope.row)">设置</el-button>
                            <!--                            <el-button size="mini" type="primary" @click="handleSaveSrvType(scope.$index, scope.row)">保存-->
                            <!--                            </el-button>-->
                            <!--                            <el-button size="mini" type="danger" @click="handleCancelSrvType(scope.$index, scope.row)">-->
                            <!--                                取消-->
                            <!--                            </el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--            <div class="panel-content">-->
            <!--                <div style="display: flex">-->
            <!--                    <div style="width: 200px;">-->
            <!--                        服务类别:-->
            <!--                    </div>-->
            <!--                    <el-checkbox-group v-if="showSrvType" v-model="checkedList" @change="handleCheckedSrvChange">-->
            <!--                        <el-checkbox-->
            <!--                            v-for="item in srvTypes"-->
            <!--                            :label="item.id"-->
            <!--                            :key="item.id"-->
            <!--                            :checked="item.isselect===true"-->
            <!--                        >{{ item.srvgroup_name + item.isselect }}-->
            <!--                        </el-checkbox>-->
            <!--                    </el-checkbox-group>-->
            <!--                </div>-->
            <!--            </div>-->
            <el-dialog v-dialogDrag :title="dialogFormTitle" :close-on-click-modal="false"
                       :visible.sync="showSrvType" append-to-body width="800px">
                <div class="dialog-content content-transfer">
                    <div style="font-size: 20px;margin-bottom: 10px">
                        选择加入服务类别：
                    </div>
                    <el-transfer
                            :titles="['未选服务类别','已选服务类别']"
                            :props="{key: 'id',label: 'srvgroup_name'}"
                            v-model="checkedList"
                            :data="srvTypes"
                    ></el-transfer>

                    <div style="text-align: right">
                        <el-button size="medium" @click="handleBack">取消</el-button>
                        <el-button size="medium" type="primary" :loading="btnLoading" @click="handleSaveSrvType">确定
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {updatePriority, addPriority, getPriorityById, addSrvTypePriority, getLevelDetail} from '@/api/setting'

export default {
    name: "priorityDetail",
    data() {
        return {
            priorityname: "",
            priorityId: 0,
            currLevelIndex: 0,
            checkedList: [],
            showSrvType: false,
            editEnable: false,
            inputEnable: false,
            saveLoading: false,
            btnLoading: false,
            srvTypes: [],
            dialogFormTitle: "",
            priorityLevels: [
                {priority_level: 1, level_name: '第一级', psrvgroups: []},
                {priority_level: 2, level_name: '第二级', psrvgroups: []},
                {priority_level: 3, level_name: '第三级', psrvgroups: []},
                {priority_level: 4, level_name: '第四级', psrvgroups: []},
                {priority_level: 5, level_name: '第五级', psrvgroups: []},
            ],
        }
    },
    mounted() {
        this.priorityId = this.$route.query.priorityId;
        this.editEnable = Boolean(this.$route.query.editEnable);//Boolean(); 参数为 0、null 和无参数返回false，有参数返回true。
        if (this.editEnable) {
            this.getPriorityDetail()
            this.inputEnable = false
        } else {
            this.inputEnable = true
        }
    },
    methods: {
        getOrderStr(row) {
            let list = row.psrvgroups
            let str = "";
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    let s = list[i].srvgroup_name
                    if (i === list.length - 1) {
                        str = str + s
                    } else {
                        str = str + s + ', '
                    }
                }
            }
            return str
        },
        handleSetting(index, row) {
            this.showSrvType = true
            this.currLevelId = index
            this.srvTypes = [
                {id: 1, srvgroup_name: "111", isselect: false},
                {id: 2, srvgroup_name: "222", isselect: true},
                {id: 3, srvgroup_name: "333", isselect: false},
                {id: 4, srvgroup_name: "444", isselect: true},
                {id: 5, srvgroup_name: "555", isselect: false},
                {id: 6, srvgroup_name: "666", isselect: false},
                {id: 7, srvgroup_name: "777", isselect: false},
                {id: 8, srvgroup_name: "888", isselect: false},
                {id: 9, srvgroup_name: "999", isselect: false},
                {id: 10, srvgroup_name: "aaaa", isselect: false}
            ]
            // getLevelDetail({priority_id: this.priorityId, priority_level: row.priority_level}).then((res) => {
            //     // this.srvTypes = JSON.parse(res.data.result)
            //     this.$nextTick(() => {
            //         this.srvTypes = JSON.parse(res.data.result)
            //     })
            //     // console.log("res.data.result: ", JSON.parse(res.data.result))
            //     // console.log("this.srvTypes1: ", this.srvTypes)
            //
            // }).catch((err) => {
            //     // this.loading = false
            // });
        },
        handleSettingV2(index, row) {
            this.showSrvType = true
            this.dialogFormTitle = "设置第" + (index + 1) + "级服务类别"
            this.currLevelIndex = index
            this.srvTypes = [
                {id: 1, srvgroup_name: "111", isselect: false},
                {id: 2, srvgroup_name: "222", isselect: true},
                {id: 3, srvgroup_name: "333", isselect: false},
                {id: 4, srvgroup_name: "444", isselect: true},
                {id: 5, srvgroup_name: "555", isselect: false},
                {id: 6, srvgroup_name: "666", isselect: false},
                {id: 7, srvgroup_name: "777", isselect: false},
                {id: 8, srvgroup_name: "888", isselect: false},
                {id: 9, srvgroup_name: "999", isselect: false},
                {id: 10, srvgroup_name: "aaaa", isselect: false}
            ]

            let checkedIdList = []
            for (let i = 0; i < this.srvTypes.length; i++) {
                let item = this.srvTypes[i]
                if (item.isselect) {
                    checkedIdList.push(item.id)

                }
            }
            this.checkedList = checkedIdList
            console.log("checkedIdList: ", checkedIdList)

            // getLevelDetail({priority_id: this.priorityId, priority_level: row.priority_level}).then((res) => {
            //     // this.srvTypes = JSON.parse(res.data.result)
            //     this.$nextTick(() => {
            //         this.srvTypes = JSON.parse(res.data.result)
            //     })
            //     // console.log("res.data.result: ", JSON.parse(res.data.result))
            //     // console.log("this.srvTypes1: ", this.srvTypes)
            //
            // }).catch((err) => {
            //     // this.loading = false
            // });
        },
        handleSaveSrvType() {
            console.log("this.dataForm: ", this.dataForm)
            // let str = ''
            // if (this.checkedList.length > 0) {
            //     for (let i = 0; i < this.checkedList.length; i++) {
            //         if (i === this.checkedList.length - 1) {
            //             str = str + this.checkedList[i]
            //         } else {
            //             str = str + this.checkedList[i] + ','
            //         }
            //     }
            // }
            // let postData = {priority_id: Number(this.priorityId), priority_level: row.priority_level, srvgroup_ids: str}
            // addSrvTypePriority(postData).then((res) => {
            //         let result = JSON.parse(res.data.result)
            //         console.log("resultaaaaaaa: ", result)
            //
            //         // this.priorityname = result.priority_name;
            //         // this.priorityLevels = result.priorityLevels
            //     }
            // ).catch((err) => {
            //     // this.loading = false
            // });

        },
        getPriorityDetail() {
            getPriorityById({priority_id: this.priorityId}).then((res) => {
                    // let result = res.data.result
                    // console.log("result: ", result)
                    let result = JSON.parse(res.data.result)
                    // console.log("result: ", result)
                    this.priorityname = result.priority_name
                    let levels = result.prioritylevels
                    for (let i = 1; i < 6; i++) {
                        let index = levels.findIndex(item => item.priority_level === i);
                        if (index >= 0) {
                            this.priorityLevels[i - 1].psrvgroups = levels[index].psrvgroups
                        }
                    }
                }
            ).catch((err) => {
                // this.loading = false
            });
        },
        handleEditPriorityName() {
            this.editEnable = true
            this.inputEnable = true
        },
        handleSavePriorityName() {
            this.saveLoading = true
            if (this.editEnable) {
                updatePriority({id: this.priorityId, priorityname: this.priorityname})
                    .then((res) => {
                        let result = res.data.result
                        this.priorityId = result.id;
                        this.priorityname = result.priorityname;
                        this.$message.success("更新成功！");
                        this.inputEnable = false
                        this.saveLoading = false
                    }).catch((err) => {
                    this.inputEnable = true
                    this.editEnable = true
                    this.$errMsg(err.msg);
                    this.saveLoading = false
                });
            } else {
                addPriority({id: 0, priorityname: this.priorityname}).then((res) => {
                    let result = res.data.result
                    this.priorityId = result.id;
                    this.priorityname = result.priorityname;
                    this.$message.success("添加成功！");
                    this.editEnable = true
                    this.inputEnable = false
                    this.saveLoading = false
                }).catch((err) => {
                    this.editEnable = false
                    this.inputEnable = true
                    this.$errMsg(err.msg);
                    this.saveLoading = false
                });
            }
        },
        handleBack() {
            this.showSrvType = false
            this.btnLoading = false
        },
    }

}
</script>

<style lang="scss">
    .template-name-input {
        width: 200px;
        margin-left: 10px;
        margin-right: 10px
    }

    .el-form-item__label {
        display: contents !important;
    }

</style>
