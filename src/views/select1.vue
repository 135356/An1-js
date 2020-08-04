<template>
  <div class="container">
    <div class="text" :style="style">
      <div class="name">
        <span v-if="select>-1">{{data[select_i]['name']}}</span>
        <span style="color:#777;" v-else>{{placeholder}}</span>
      </div>
<!--      <div class="placeholder">基本面kk加槈跪榴莲夺花木成畦手自栽卡拉士大夫花木成畦手自栽李斐莉雪花木成畦手自栽 花木成畦手自栽 花木成畦手自栽 茜</div>-->
    </div>
    <div class="cont" v-if="show">
      <div class="alert">
        <ul>
          <li v-for="(v,i) in data" @click.stop="selectF(i)" :class="{'select':v.val == select}">{{v.name}}</li>
          <li @click.stop="closeF()" class="close">取消</li>
        </ul>
        <div style="width:100%;height:20px;"></div>
      </div>
      <div @click.stop="closeF()" class="mask"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{show_:Boolean,data_:Array,select_:{type:String|Number},style_:String,placeholder_:String},
    data() {
      return {
        show: this.show_,
        data:this.data_,
        select:this.select_,
        style:this.style_,
        placeholder:this.placeholder_,
        select_i:0,
      }
    },
    watch: {
      show_(val) {
        this.show = val;
      },
      data_(val) {
        this.data = val;
      },
      select_(val) {
        this.select = val;
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].val == this.select){
            this.select_i = i;
            return ;
          }
        }
      }
    },
    methods: {
      selectF(i) {
        this.show = false;
        this.select = this.data[i].val;
        this.select_i = i;
        this.$emit('select1F',{show:this.show,select:this.select});
      },
      closeF(){
        this.show = false;
        this.$emit('select1F',{show:this.show,select:this.select});
      }
    },
    mounted() {
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].val == this.select){
          this.select_i = i;
          return ;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    width: 100%;
    .text{
      position:relative;
      width:100%;
      .placeholder{
        position:absolute;
        top:0;left:0;
        width:100%;
        max-height:40px;
        overflow:hidden;
        color:#aaa;
      }
    }
    .cont{
      .alert{
        position:fixed;
        width:100%;
        right:0;bottom:0;
        z-index: 100;
        background:#fff;
        ul{
          width:100%;
          text-align:center;
          font-size:16px;
          .select{
            border-bottom:solid 1px #888;
            background:#f6f6f6;
          }
          li{
            width:100%;
            height:40px;
            line-height: 40px;
            margin:auto;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            border-bottom: 1px solid #ddd;
          }
          .close{
            border-top:5px solid #ddd;
            border-bottom:none;
          }
        }
      }
    }
  }
</style>
