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
                            <el-button size="mini" @click="handleSetting(scope.$index, scope.row)">设置</el-button>
                            <el-button size="mini" type="primary" @click="handleSaveSrvType(scope.$index, scope.row)">保存
                            </el-button>
                            <!--                            <el-button size="mini" type="danger" @click="handleCancelSrvType(scope.$index, scope.row)">-->
                            <!--                                取消-->
                            <!--                            </el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="panel-content">
                <div style="display: flex">
                    <div style="width: 200px;">
                        服务类别:
                    </div>
                    <el-checkbox-group v-if="showSrvType" v-model="checkedList" @change="handleCheckedSrvChange">
                        <el-checkbox
                            v-for="item in srvTypes"
                            :label="item.id"
                            :key="item.id"
                            :checked="item.isselect===true"
                        >{{ item.srvgroup_name + item.isselect }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
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
            srvTypes: [],
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
            getLevelDetail({priority_id: this.priorityId, priority_level: row.priority_level}).then((res) => {
                // this.srvTypes = JSON.parse(res.data.result)
                this.$nextTick(() => {
                    this.srvTypes = JSON.parse(res.data.result)
                })
                // console.log("res.data.result: ", JSON.parse(res.data.result))
                // console.log("this.srvTypes1: ", this.srvTypes)

            }).catch((err) => {
                // this.loading = false
            });
        },
        handleCancelSrvType() {

        },
        handleCheckedSrvChange(value) {
            console.log("value:", value)

            // // let currSrvTypes =
            console.log("checkedList:", this.checkedList)
            console.log("currLevelIndex:", this.currLevelIndex)
            if (this.checkedList.length > 0) {
                // let currSrvTypes = []
                for (let i = 0; i < this.srvTypes.length; i++) {
                    let srv = this.srvTypes[i];
                    let index = this.checkedList.findIndex(item => item === srv.id);
                    if (index >= 0) {
                        this.srvTypes[i].isselect = true
                        // currSrvTypes.push(this.srvTypes[i])
                    } else {
                        this.srvTypes[i].isselect = false
                    }
                }
                // this.priorityLevels[this.currLevelIndex].psrvgroups = currSrvTypes
            } else {
                // this.priorityLevels[this.currLevelIndex].psrvgroups = []
            }
            // console.log("priorityLevels:", this.priorityLevels)

        },
        handleSaveSrvType(index, row) {
            console.log("this.checkedList: ", this.checkedList)
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
            let postData = {priority_id: Number(this.priorityId), priority_level: row.priority_level, srvgroup_ids: str}
            addSrvTypePriority(postData).then((res) => {
                    let result = JSON.parse(res.data.result)
                    console.log("resultaaaaaaa: ", result)

                    // this.priorityname = result.priority_name;
                    // this.priorityLevels = result.priorityLevels
                }
            ).catch((err) => {
                // this.loading = false
            });

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
        }
    }

}
</script>

<style lang="scss">
.template-name-input {
    width: 200px;
    margin-left: 10px;
    margin-right: 10px
}

</style>
