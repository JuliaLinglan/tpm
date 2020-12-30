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
                    <span class="relative">
                        <el-button @click="handleAddContent(0)" type="primary" size="medium"
                                   :disabled="this.ticketDataList[0].isChoose">主标题</el-button>
                        <span class="absolute" v-on:click="handleCancelContent(0)"
                              v-if="this.ticketDataList[0].isChoose===true">
                            <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                        </span>
                    </span>
                    <span class="relative">
                        <el-button @click="handleAddContent(1)" type="primary" size="medium"
                                   :disabled="this.ticketDataList[1].isChoose">副标题</el-button>
                        <span class="absolute" v-on:click="handleCancelContent(1)"
                              v-if="this.ticketDataList[1].isChoose===true">
                            <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                        </span>
                    </span>
                    <div class="component-title">票号</div>
                    <el-divider></el-divider>
                    <span class="relative">
                            <el-button type="primary" size="medium" :disabled="true">票号</el-button>
                            <span class="absolute" v-on:click="handleEditTicketNum(2)">
                                <svg-icon icon-class="edit" class="svg-size"></svg-icon>
                            </span>
                    </span>
                    <div class="component-title">提示</div>
                    <el-divider></el-divider>
                    <div class="tips">
                        <span class="relative">
                            <el-button @click="handleAddContent(3)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[3].isChoose">行一</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(3)"
                                  v-if="this.ticketDataList[3].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(4)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[4].isChoose">行二</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(4)"
                                  v-if="this.ticketDataList[4].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(5)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[5].isChoose">行三</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(5)"
                                  v-if="this.ticketDataList[5].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(6)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[6].isChoose">行四</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(6)"
                                  v-if="this.ticketDataList[6].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(7)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[7].isChoose">行五</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(7)"
                                  v-if="this.ticketDataList[7].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                    </div>
                    <div class="tips">
                        <span class="relative">
                            <el-button @click="handleAddContent(8)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[8].isChoose">行六</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(8)"
                                  v-if="this.ticketDataList[8].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(9)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[9].isChoose">行七</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(9)"
                                  v-if="this.ticketDataList[9].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(10)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[10].isChoose">行八</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(10)"
                                  v-if="this.ticketDataList[10].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(11)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[11].isChoose">行九</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(11)"
                                  v-if="this.ticketDataList[11].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                        <span class="relative">
                            <el-button @click="handleAddContent(12)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[12].isChoose">行十</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(12)"
                                  v-if="this.ticketDataList[12].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                    </div>
                    <div class="component-title">时间</div>
                    <el-divider></el-divider>
                    <span class="relative">
                            <el-button @click="handleAddContent(13)" type="primary" size="medium"
                                       :disabled="this.ticketDataList[13].isChoose">时间</el-button>
                            <span class="absolute" v-on:click="handleCancelContent(13)"
                                  v-if="this.ticketDataList[13].isChoose===true">
                             <svg-icon icon-class="btn-close" class="svg-size"></svg-icon>
                            </span>
                         </span>
                </div>

                <div class="template-container">
                    <div style="text-align: center;margin-bottom: 10px;font-size: 18px">显示</div>
                    <!--<p style="font-size: 20px;text-align: center;background-color: #4AB7BD">this iddddddddddd</p>-->
                    <div id="page">
                        <div v-for="(item,index) in ticketDataList" :key="index" style="background-color: #ffffff">
                            <!--                        {{ item }}-->
                            <p :style="{textAlign:item.textAlign,fontSize:item.textSize+'px',margin:'0px',backgroundColor:item.isClicked?'#00ffff':'#ffffff'}"
                               v-if="item.isChoose===true"><span :id="'content' + index">{{ item.textContent }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="property-container">
                    <div class="el-dialog__header">
                        <span class="el-dialog__title">属性</span>
                    </div>
                    <div class="el-dialog__body">
                        <el-form :rules="rules" :model="dataForm" ref="form" size="medium" style="width:96%;"
                                 label-width="100px">
                            <el-form-item label="文本内容：" prop="textContent">
                                <el-input v-model="dataForm.textContent"
                                          :disabled="dataForm.contentEditEnable"></el-input>
                            </el-form-item>
                            <el-form-item label="字体大小：" prop="textSize">
                                <InputNumber v-model="dataForm.textSize" :min="10"></InputNumber>
                            </el-form-item>
                            <el-form-item label="文本对齐：" prop="textAlign">
                                <el-select placeholder="请选择" v-model="dataForm.textAlign">
                                    <el-option label="左对齐" value="left"></el-option>
                                    <el-option label="居中" value="center"></el-option>
                                    <el-option label="右对齐" value="right"></el-option>
                                </el-select>
                                <el-button @click="submitStyle" type="primary" size="medium"
                                           style="float: right;margin-top: 10px">提交
                                </el-button>
                            </el-form-item>
                        </el-form>
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
            dataForm: {
                textContent: "",
                textSize: 10,
                textAlign: "",
                contentEditEnable: false
            },
            templateName: "",
            ticketDataList: [
                {textContent: "复旦大学附属耳鼻喉科医院", textSize: 15, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "儿科", textSize: 15, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "0000", textSize: 22, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "您的检查室房间为12号检查室", textSize: 15, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "请注意您的排队号码", textSize: 15, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "号票当日有效", textSize: 15, textAlign: "center", isChoose: true, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {textContent: "提示", textSize: 15, textAlign: "center", isChoose: false, isClicked: false},
                {
                    textContent: "YYYY-mm-dd HH:mm:ss",
                    textSize: 15,
                    textAlign: "center",
                    isChoose: true,
                    isClicked: false
                }
            ],
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            rules: {
                textContent: [{required: true, message: "值不能为空", trigger: 'blur'}],
                textSize: [{required: true, message: "值不能为空", trigger: 'blur'}],
                textAlign: [{required: true, message: "值不能为空", trigger: 'blur'}],
            },
            currLineIndex: 0
        }
    },
    mounted() {
        this.initData()
        // console.log("this.ticketDataList: ", this.ticketDataList)

    },
    methods: {
        initData() {

        },
        handleAddContent(index) {
            this.currLineIndex = index
            for (let i = 0; i < this.ticketDataList.length; i++) {
                this.ticketDataList[i].isClicked = false
            }
            let item = this.ticketDataList[index]
            this.dataForm = item
            this.ticketDataList[index].isChoose = true
            this.ticketDataList[index].isClicked = true
            this.$set(this.ticketDataList, index, item)
        },
        handleCancelContent(index) {
            let item = this.ticketDataList[index]
            this.dataForm = {}
            this.ticketDataList[index].isChoose = false
            this.$set(this.ticketDataList, index, item)
        },
        handleEditTicketNum(index) {
            for (let i = 0; i < this.ticketDataList.length; i++) {
                this.ticketDataList[i].isClicked = false
            }
            let item = this.ticketDataList[index]
            this.dataForm = item
            this.dataForm.contentEditEnable = true
            this.ticketDataList[index].isChoose = true
            this.ticketDataList[index].isClicked = true
            this.$set(this.ticketDataList, index, item)
        },
        submitStyle() {
            let div = document.getElementById('page');
            console.log("div: ", div)

            let clientHeight = div.clientHeight;
            let clientWidth = div.clientWidth;
            console.log("clientWidth: ", clientWidth)
            console.log("clientHeight: ", clientHeight)
            let offsetHeight = div.offsetHeight;
            let offsetWidth = div.offsetWidth;
            console.log("offsetHeight: ", offsetHeight)
            console.log("offsetWidth: ", offsetWidth)
            let offsetLeft = div.offsetLeft;
            let offsetTop = div.offsetTop;
            console.log("offsetLeft: ", offsetLeft)
            console.log("offsetTop: ", offsetTop)

            let span = document.getElementById('content' + this.currLineIndex);
            let spanoffsetHeight = span.offsetHeight;
            let spanoffsetWidth = span.offsetWidth;
            let spanoffsetLeft = span.offsetLeft;
            let spanoffsetTop = span.offsetTop;
            console.log("spanoffsetHeight: ", spanoffsetHeight)
            console.log("spanoffsetWidth: ", spanoffsetWidth)
            console.log("spanoffsetLeft: ", spanoffsetLeft)
            console.log("spanoffsetTop: ", spanoffsetTop)

            // var clientHeight = div.clientHeight;
            //
            // var clientWidth = div.clientWidth;

        },
    }
}
</script>
<style lang="scss">
    .relative {
        position: relative;
        margin-right: 10px;
    }

    .absolute {
        position: absolute;
        top: -13px;
        right: -1px;
    }

    .component-box {
        width: 35%;
        border: 3px dotted #3A71A8;
        padding: 10px 30px;
        margin: 20px;
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
        width: 30%;
        border: 3px dotted #3A71A8;
        padding: 10px 30px;
        margin: 20px 40px;
        background-color: #f2f7fb;
    }

    .property-container {
        height: 300px;
        width: 350px;
        border: 1px solid #3A71A8;
        margin: 20px 40px;
    }

    .tips {
        margin-bottom: 10px
    }

    .el-divider.el-divider--horizontal {
        margin: 10px 0;
    }

    .svg-size {
        width: 12px;
        height: 12px;
    }
</style>
