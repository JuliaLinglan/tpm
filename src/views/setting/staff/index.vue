<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">员工设置
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
                    <el-table-column prop="staff_name" label="员工姓名">
                        <template slot-scope="scope">
                            <div>
                                <div style="float: left;margin-top: 4px">
                                    <el-popover placement="top-start" title="" trigger="hover">
                                        <img :src="picBaseUrl+scope.row.staff_picpath" alt=""
                                             style="width: 150px;height: 150px">
                                        <img slot="reference" :src="picBaseUrl+scope.row.staff_picpath"
                                             style="width: 30px;height: 30px">
                                    </el-popover>
                                </div>
                                <div style="float: left;margin-top: 6px;margin-left: 10px;">
                                    {{ scope.row.staff_name }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="staff_code" label="员工编号"></el-table-column>
                    <el-table-column prop="staff_pass" label="登录密码"></el-table-column>
                    <el-table-column prop="staff_level" label="员工级别"></el-table-column>
                    <el-table-column prop="staff_title" label="员工职称"></el-table-column>
                    <el-table-column prop="staff_enable" label="是否启用">
                        <template slot-scope="scope">
                            {{ scope.row.staff_enable === true ? "是" : "否" }}
                        </template>
                    </el-table-column>
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
                       :visible.sync="showAddDialog" append-to-body width="500px">
                <div class="dialog-content">
                    <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                             label-width="120px">
                        <el-form-item label="员工图片:" prop="logo" style="text-align: center">
                            <el-upload style="text-align:center;" class="avatar-uploader" action="/ser"
                                       :show-file-list="false" :auto-upload="false" :on-change="beforeAvatarUpload">
                                <el-tooltip content="员工头像" placement="top">
                                    <img v-if="imageBase64" :src="imageBase64" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-tooltip>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="员工编号：" prop="staff_code">
                            <el-input v-model="dataForm.staff_code"></el-input>
                        </el-form-item>
                        <el-form-item label="员工姓名：" prop="staff_name">
                            <el-input v-model="dataForm.staff_name"></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码：" prop="staff_pass">
                            <el-input v-model="dataForm.staff_pass"></el-input>
                        </el-form-item>
                        <el-form-item label="员工级别：" prop="staff_level">
                            <InputNumber v-model.number="dataForm.staff_level" :min="0"></InputNumber>
                        </el-form-item>
                        <el-form-item label="员工职称：" prop="staff_title">
                            <el-input v-model="dataForm.staff_title"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用：" prop="staff_enable">
                            <el-select placeholder="请选择" v-model="dataForm.staff_enable" style="width: 320px">
                                <el-option label="是" :value=true></el-option>
                                <el-option label="否" :value=false></el-option>
                            </el-select>
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
import {getStaffList, addStaff, updateStaff, deleteStaff} from '@/api/setting'

export default {
    name: "staff",

    data() {
        return {
            dialogVisible: true,
            picBaseUrl: "http://192.168.3.4:6000/pictures/",
            imageBase64: '',
            btnLoading: false,
            dataList: [],
            loading: false,
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            showAddDialog: false,
            dialogFormTitle: "",
            dataForm: {
                staff_code: "",
                staff_name: "",
                staff_pass: "",
                staff_level: 0,
                staff_title: "",
                staff_picpath: "",
                staff_enable: false,
                base64pic: ""
            },
            rules: {
                staff_code: [{required: true, message: "值不能为空", trigger: 'blur'}],
                staff_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
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
            getStaffList({pageIndex: this.pageIndex - 1, pageSize: this.pageSize}).then(res => {
                let result = res.data.result
                this.dataList = result.data
                this.total = result.totalitemcount
                this.pageindex = result.pageindex
                this.loading = false
            }).catch((err) => {
                this.loading = false
            })

            // let data = {
            //     staff_code: "111",
            //     staff_name: "1111",
            //     staff_pass: "111",
            //     staff_level: 0,
            //     staff_title: "1111",
            //     staff_picpath: "D:\\1.jpg",
            //     staff_enable: true,
            //     base64pic: ""
            // }
            // this.dataList = [data]
        },

        handleAdd() {
            this.dialogFormTitle = "添加员工信息"
            this.showAddDialog = true
            this.dataForm = {}
        },
        handleUpdate(index, row) {
            this.dialogFormTitle = "编辑员工信息"
            Object.assign(this.dataForm, row);
            this.showAddDialog = true
        },
        handleDelete(index, row) {
            this.$confirm("确认删除？", "确认删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let staff_code = row.staff_code;
                deleteStaff({staff_code: staff_code}, this.pageIndex - 1, this.pageSize)
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
                if (this.dialogFormTitle === "添加员工信息") {
                    postData.base64pic = this.imageBase64
                    addStaff(postData, this.pageIndex - 1, this.pageSize)
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
                    updateStaff(postData, this.pageIndex - 1, this.pageSize)
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
        beforeAvatarUpload(file) {
            let imgType = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!imgType) {
                this.$errMsg('上传头像图片只能是 JPG或者PNG 格式!');
                return;
            }
            if (!isLt2M) {
                this.$errMsg('上传头像图片大小不能超过 2MB!');
                return;
            }
            let raw = file.raw
            let r = new FileReader()
            r.readAsDataURL(raw)
            r.onload = (e) => {
                let fileBase64 = e.target.result //base64格式
                this.imageBase64 = fileBase64 //为img的src赋值看看是否为上传的图片
            }
        },
    }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #004e7e;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.avatar {
    width: 150px;
    height: 100px;
    display: block;
}
</style>
<!--public int ID { get; set; }-->
<!--public string Staff_Code { get; set; }-->
<!--/// <summary>-->
<!--/// 员工姓名-->
<!--/// </summary>-->
<!--public string Staff_Name { get; set; }-->

<!--/// <summary>-->
<!--/// 登录密码-->
<!--/// </summary>-->
<!--public string Staff_Pass { get; set; }-->

<!--/// <summary>-->
<!--/// 员工级别-->
<!--/// </summary>-->
<!--public int Staff_Level { get; set; }-->

<!--/// <summary>-->
<!--/// 员工职称-->
<!--/// </summary>-->
<!--public string Staff_Title { get; set; }-->

<!--/// <summary>-->
<!--/// 员工图片-->
<!--/// </summary>-->
<!--public string Staff_Picpath { get; set; }-->

<!--/// <summary>-->
<!--/// 启用标志-->
<!--/// </summary>-->
<!--public bool Staff_Enable { get; set; }-->
<!--/// <summary>-->
<!--/// 员工图片 bse64-->
<!--/// </summary>-->
<!--public string  Base64Pic { get; set; }-->
