<template>
    <div class="project-page">
        <div class="panel-box">
            <div class="panel-title">
                <div style="text-align: center;margin:0 auto">
                    票号-模板样式
                </div>
            </div>
            <div class="panel-content">
                <div>
                    模板名称:
                    <el-input placeholder="请输入模板名称" class="template-name-input" v-model="templateName"></el-input>
                    <el-button type="primary" size="medium">编辑</el-button>
                    <el-button type="primary" size="medium">保存</el-button>
                    <el-button type="danger" size="medium">删除</el-button>
                </div>
            </div>
            <div class="panel-content" style="display: flex">
                <div class="component-box">
                    <div style="text-align: center;font-size: 18px">配置</div>
                    <div class="component-title">标题</div>
                    <el-divider></el-divider>
                    <el-button @click="handleMainTitle" type="primary" size="medium">
                        主标题
                    </el-button>
                    <el-button type="primary" size="medium" class="relative">
                        副标题
                        <span class="absolute">
                            <svg-icon icon-class="btn-close" style="width: 12px; height: 12px;"></svg-icon>
                        </span>
                    </el-button>
                    <div class="component-title">提示</div>
                    <el-divider></el-divider>
                    <div class="tips">
                        <el-button type="primary" size="medium">行一</el-button>
                        <el-button type="primary" size="medium">行二</el-button>
                        <el-button type="primary" size="medium">行三</el-button>
                        <el-button type="primary" size="medium">行四</el-button>
                        <el-button type="primary" size="medium">行五</el-button>
                    </div>
                    <div class="tips">
                        <el-button type="primary" size="medium">行六</el-button>
                        <el-button type="primary" size="medium">行七</el-button>
                        <el-button type="primary" size="medium">行八</el-button>
                        <el-button type="primary" size="medium">行九</el-button>
                        <el-button type="primary" size="medium">行十</el-button>
                    </div>
                    <div class="component-title">时间</div>
                    <el-divider></el-divider>
                    <el-button type="primary" size="medium">时间</el-button>
                </div>

                <div class="template-container">
                    <div style="text-align: center;margin-bottom: 10px;font-size: 18px">显示</div>
                    <div v-for="(item,index) in ticketDataList" :key="index" style="background-color: #ffffff">
                        {{item}}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "detail",
    data() {
        return {
            templateName: "",
            ticketDataList: [],
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            rules: {
                // staff_name: [{required: true, message: "值不能为空", trigger: 'blur'}],
            },
        }
    },
    methods: {
        handleMainTitle() {
            this.ticketDataList.push("this is test.")
        }
    }
}
</script>
<style lang="scss">
    .relative {
        position: relative;
    }

    .absolute {
        position: absolute;
        top: -3px;
        right: -1px;
    }

    .component-box {
        width: 42%;
        border: 3px dotted #3A71A8;
        padding: 10px 30px;
        margin: 20px 40px 20px 80px;
    }

    .component-title {
        margin-top: 20px;
    }

    .template-name-input {
        width: 200px;
        margin-left: 10px;
        margin-right: 10px
    }

    .template-container {
        width: 35%;
        border: 3px dotted #3A71A8;
        padding: 10px 30px;
        margin: 20px 40px;
        background-color: #f2f7fb;
    }

    .tips {
        margin-bottom: 10px
    }

    .el-divider.el-divider--horizontal {
        margin: 10px 0;
    }

</style>
