<template>
<section class="psd-input-number">
        <el-input-number v-model="numval" :placeholder="placeholder" 
                    :controls-position="controlsPosition" @input="transferValue" 
                    :min="min" :max="max" :step="step" :stepStrictly="stepStrictly" :precision="precision"
                    :size="size"  :disabled="disabled"  
                    :style="autoStyle" @blur="blur" @change="change"
                    ></el-input-number>
   </section>                 
</template>  
<script>
export default {
    props: {
     value: {default: undefined},
     min:{},
     max:{},
     controlsPosition:{type:String,default:'right'},
     placeholder:{type:String},
     decimalPlaces:{},
     step:{default:1},
     stepStrictly:{default:false},
     precision:{},
     size:{},
     autoStyle:{type:String},
     disabled:{default:false}
    },
    data(){
        return {
          numval:undefined,
        }
    },
    watch:{
       value: {
    　　handler(newName, oldName) {
          this.$nextTick(()=>{
              this.numval=((newName==="") || newName===null || newName==undefined)?undefined:newName;
          })
    　　},
    　　immediate: true
        }
    },
    mounted(){
       // alert(this.value)
      // console.log(this.value)
    //   console.log(this.value===null)
    //    console.log((this.value.toString()).trim()==="")
    //    console.log(this.value===undefined)
       
       this.numval=((this.value==="") || this.value===null || this.value===undefined)?undefined:this.value;
    },
    methods:{
        transferValue(newValue){

            // if(this.decimalPlaces!=undefined && !isNaN(this.decimalPlaces) && newValue!="" && newValue!=undefined){
              
            //     let newValue_Str=newValue.toString();
            //     let maxLen=(newValue_Str).length;
            //     let len=(newValue_Str).indexOf('.');

            //       console.log("ccc  "+this.decimalPlaces+"   "+maxLen)


            //     if(len>0 && (maxLen-(len+1))>parseInt(this.decimalPlaces)){
            //         let maxLen1=len+1+this.decimalPlaces;
            //         let tmp=parseFloat(newValue_Str.substr(0,maxLen1))
                   
            //         //console.log(maxLen1+"    "+tmp)
            //         this.$emit("input",tmp)
            //         this.numval=tmp;
            //     }
            //     else
            //     {
            //         this.$emit("input", newValue);
            //     }
                 
            // }
            // else
            // {
            //     this.$emit("input", newValue);
            // }
            //console.log(newValue)
            this.$emit("input",newValue===undefined?null:newValue);
        },
        blur(){
            this.$emit("blur");
        },
        change(){
            this.$emit("change");
        }
    }
}
</script>
<style lang="css" scoped>
/* .psd-input-number{
    display: inline;
} */
.psd-input-number >>>.el-input-number .el-input__inner {
    text-align:left;
    width:100%; 
}
</style>
<style lang="scss" scoped>
.psd-input-number{
    .el-input-number{
    width:100% ; 
}

}
</style>
