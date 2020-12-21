import Vue from "vue";

function dictionary_Language_Converse(list, value) {
    if (typeof value == "undefined") {
        let result = [];
        for (let i = 0; i < list.length; i++) {
            result.push(
                {
                    label: list[i].label,
                    value: list[i].value
                }
            );
        }
        return result;
    } else if (value === "") return {
        label: "",
        value: ""
    };
    else {
        let result = list.filter((item) => {
            return item.value == value;
        });
        return result.length > 0 ?
            {
                label: result[0].label,
                value: result[0].value
            } : {
                label: "",
                value: ""
            };
    }
}

let dict = {
    // 弹框标识boolean
    getDialogEnable: function (value = undefined) {
        let list = [
            {label: "不弹", value: false},
            {label: "弹", value: true}
        ]
        return dictionary_Language_Converse(list, value);
    },
    // 显示模式:1，
    getShowMode: function (value = undefined) {
        let list = [
            {label: "堆栈", value: 1},
            {label: "表格", value: 2},
            {label: "视频加堆栈", value: 3}
        ]
        return dictionary_Language_Converse(list, value);
    },
    // 设备类型:1，
    getMDType: function (value = undefined) {
        let list = [
            {label: "小屏", value: 1},
            {label: "大屏", value: 2},
            {label: "LED", value: 3},
            {label: "语音", value: 4}
        ]
        return dictionary_Language_Converse(list, value);
    },
};
/**
 * 使用方法 在templete html标签中直接使用获取枚举列表 $dictionary.getCompleteType()
 * 在templete html标签中直接使用获取某个枚举 $dictionary&&$dictionary.getCompleteType('OPENWELL')
 */
Vue.prototype.$dict = dict;
