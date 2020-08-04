<template>
  <!--社区动态-->
  <div class="content" v-if="show">
    <div class="top">
      <form action="" @submit.prevent="submitF()">
        <table>
          <tr class="aa1">
            <td class="b2">
              <label>
                <i class="an1_iconfont">&#xe6c3;</i>
                <input type="text" placeholder="未填写" v-model="text">
                <i @click="deleteF()" class="an1_iconfont">&#xe63a;</i>
              </label>
            </td>
            <td class="b3" @click="closeF()">取消</td>
          </tr>
        </table>
      </form>
    </div>
    <div v-if="cache_text||cache_text_arr" class="center">
      <table v-if="cache_text_arr.length>0">
        <tr class="aa1" v-for="(v,i) in cache_text_arr">
          <td class="b1"><i class="an1_iconfont">&#xe64b;</i></td>
          <td class="b2">{{v}}</td>
          <td class="b3"><i @click="deleteCacheF(i)" class="an1_iconfont">&#xe61b;</i></td>
        </tr>
      </table>
      <table v-else-if="cache_text">
        <tr class="aa1">
          <td class="b1"><i class="an1_iconfont">&#xe64b;</i></td>
          <td class="b2">{{cache_text}}</td>
          <td class="b3"><i @click="deleteCacheF()" class="an1_iconfont">&#xe61b;</i></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props:{show_:Boolean,'text_':String},
    data() {
      return {
        show:this.show_,
        title:'个人信息',
        text:'',
        cache_text:'',
        cache_text_arr:[],
      };
    },
    watch:{
      show_(val){
        this.show = val;
      },
    },
    methods:{
      closeF()
      {
        if(this.show){
          this.show = false;
        }else{
          this.show = true;
        }
        this.$emit('searchAlertF',this.show);
      },
      deleteF()
      {
        this.text = '';
      },
      getStorage()
      {
        this.$An2_Data.getStorage('searchAlert').then(res=>{
          if(res){
            if(res.constructor==String){
              this.cache_text = res;
              this.cache_text_arr = [];
            }else if(res.constructor==Array){
              this.cache_text = '';
              this.cache_text_arr = res;
            }else{
              this.cache_text = '';
              this.cache_text_arr = [];
            }
          }else{
            this.cache_text = '';
            this.cache_text_arr = [];
          }
        });
      },
      deleteCacheF(i)
      {
        this.$An2_Data.deleteStorage('searchAlert',i).then(()=>{
          this.getStorage();
        });
      },
      submitF()
      {
        let text = this.text;
        this.show = false;
        if(text){
          if(text.length>16){
            text = text.substr(0,16);
          }
          this.$An2_Data.max_length_ = 50;
          this.$An2_Data.addStorage('searchAlert',text,2592000);
        }
        this.$emit('searchAlertF',this.show);
      }
    },
    mounted() {
      this.getStorage();
    },
  };
</script>
<style lang="scss" scoped>
  .content {
    position:relative;
    height:40px;
    z-index: 10;
    font-size: 12px;
    text-align: center;
    color:#96A0B1;
    background:#fff;
    .top{
      width:95%;
      margin:15px auto 5px;
      .aa1{
        .b2{
          height:30px;
          line-height:30px;
          text-align: left;
          padding:0 5px 0 10px;
          border-radius:10px;
          background:#F3F3F3;
          label{
            input{
              width:84%;
              background:#F3F3F3;
            }
          }
        }
      }
    }
    .center{
      width:100%;
      text-align:left;
      background:#fff;
      table{
        width:95%;
        margin:auto;
        text-align: left;
        td{
          height:30px;
          line-height: 30px;
        }
        .aa1{
          border-top: solid 1px #eee;
          border-bottom: solid 1px #eee;
          height:30px;
          line-height: 30px;
          .b1{
            width:10%;
          }
          .b2{
            width:90%;
            line-height: 18px;
          }
          .b3{
            width:10%;
          }
        }
      }
    }
  }
</style>
