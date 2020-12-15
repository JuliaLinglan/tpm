<template>
    <div>
        票号设置
        <div>
            <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
            </quill-editor>
            <button @click="saveHtml">保存</button>
        </div>
        <div style="width: 120px">
            {{content}}
        </div>

    </div>
</template>

<script>
// 引入编辑器
import {departmentInfos} from '../../api/api'

import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Delta from "quill-delta";

import * as Quill from 'quill'  // 引入编辑器
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

export default {
    name: "ticket",
    data() {
        return {
            curPosX: '',
            lastPosX: '',
            diff: '',
            content: null,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],        // toggled buttons
                        [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                        // [{ 'direction': 'rtl' }],             // 文本方向
                        // [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                        [{'size': ['10px', false, '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px']}],
                        [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
                        [{'font': []}],     //字体
                        [{'align': []}],    //对齐方式
                        // ['clean'],    //清除字体样式
                        ['image']    //上传图片、上传视频
                    ],
                    imageResize: {
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                },
                theme: 'snow'
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorReady(editor) {
            // 准备编辑器
            console.log('111')
        },
        onEditorBlur() {
            // 失去焦点事件
            console.log('111')
        },
        onEditorFocus() {
            // 获得焦点事件
            console.log('222')
        },
        onEditorChange({quill, html, text}) {
            console.log('333')
            console.log('editor change!', quill)
        },
        saveHtml(event) {
            console.log('content: ' + this.content)
            this.getElementLeft(document.getElementsByTagName("p")[0])

        },
        getElementLeft(element) {
            let actualLeft = element.offsetLeft;
            let current = element.offsetParent;

            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            console.log('actualLeft: ' + actualLeft)
            return actualLeft;
        }
    }
}
</script>

<style>

</style>
