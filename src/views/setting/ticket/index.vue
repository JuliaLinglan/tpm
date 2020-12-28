<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">票号设置
                <el-input style="flex-grow: 0; flex-basis: 200px;" size="medium"></el-input>
                <el-button style="flex-grow: 0" size="medium">搜索</el-button>
            </div>
            <div class="panel-content">
                <el-form :inline="true" label-width="100px" style="margin-top: 5px;" size="small">
                    <el-form-item>
                        <el-button @click="handleAdd" type="primary" size="medium">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ticket",
    data() {
        return {
            btnLoading: false,
            dataList: [],
            loading: false,
            pageIndex: 1,
            pageSize: 20,
            total: 0,
            dataForm: {},
            rules: {
                // staff_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
            },
        }
    },
    methods: {
        handleAdd() {
          this.$router.push('/ticketdetail')
        },
    }
}
</script>
<style>

</style>
