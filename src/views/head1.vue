<template>
  <div class="container" :style="auto_height.top">
    <div v-if="!search_alert.show">
      <div class="a1" :style="auto_height.top+style_">
        <table>
          <tr>
            <td width="10%" @click="funF1()">
              <i v-if="is" class="an1_iconfont">&#xe62b;</i>
            </td>
            <td width="50%" style="text-align: left;">{{title_}}</td>
            <td width="40%" class="user">
              <div>
                <i v-if="control.shake" @click="telF()">
                  <img src="../../static/images/icon/shake.png" />
                </i>
                <i v-if="control.search" @click="searchF()" class="an1_iconfont">&#xe6c3;</i>
                <i v-if="control.user" @click="$An2_Link.to('/UserCenter')">
                  <img src="../assets/img/answer/answer01.png" />
                </i>
                <i v-if="control.community_add" @click="$An2_Link.to('/CommunityPublish')" class="an1_iconfont">&#xe7a1;</i>
                <span style="font-weight:500;color:#aaa;" v-if="control.community_publish" @click="control.community_publish()">发布</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <Search_alert @searchAlertF="search_alert.monitorF" :show_="search_alert.show"></Search_alert>
  </div>
</template>

<script>
  import Search_alert from '@/components/Search_alert'

  export default {
    props:{'title_':String,'toLink_':String,'toF_':Function,'style_':String,'control_':Object},
    components: {
      'Search_alert': Search_alert,
    },
    data(){
      return {
        title:this.title_,
        auto_height:{
          'top':0,
          'height':0,
        },
        is:0,
        toFun:{},
        style:this.style_,
        control:{
          'user':0,
          'search':0,
          'user_edit':0,
        },
        search_alert: {
          show: false,
          data: {},
          triggerF:()=>{
            if(this.search_alert.show){
              this.search_alert.show = false;
            }else{
              this.search_alert.show = true;
            }
          },
          monitorF:(v)=>
          {
            this.search_alert.show = v;
          },
        },
      }
    },
    methods:{
      funF1()
      {
        let this_ = this;
        if(this_.toF_){
          this_.toF_();
        }else if(this_.toLink_){
          this_.$An2_Link.to(this_.toLink_);
        }
      },
      searchF()
      {
        this.search_alert.triggerF();
      },
      telF()
      {
        price.openWindow({
          type: "shake",
          data: {},
          onSuccess(){
          }
        });
      }
    },
    watch:{
      title_(val){
        this.title = val;
      },
    },
    mounted(){
      let this_ = this;
      this_.is = this_.toLink_||this_.toF_;
      if(this_.control_){
        this_.control = this_.control_;
      }
      /*根据客户端设置导航栏高度*/
      let autoHeight = ()=>{
        var vm = this;
        let u = navigator.userAgent;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
          var topVal = 20;
          if (screen.width >= 375 && screen.height >= 812) {
            topVal = 44;
          }
          this.auto_height.top = 'padding-top:'+topVal+'px;';
          // this.$store.getters.getTopBottom.then(topBottom => {
          //   var heights = topBottom.split(",");
          //   this.auto_height.top = 'padding-top:'+parseInt(heights[0])+20+'px;';
          // });
          // price.getData({
          //   key: "top_bottom",
          //   onSuccess: function (data) {
          //     var topBottom = data.value;
          //     vm.auto_height.top = 'padding-top:'+parseInt(topBottom.split(",")[0])+'px;';
          //   },
          // });
        }else{
          this.auto_height.top = 'padding-top:'+2+'px;';
        }
      }
      autoHeight();
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position:relative;
    width:100%;
    height:50px;
  }
  .container .a1{
    position:fixed;
    top:0;left:0;
    z-index: 10;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size:18px;
    font-weight:600;
    text-align: center;
    background: #fff;
    box-shadow:0 0 6px 0 #ccc;
  }
  .container .user .an1_iconfont{
    margin:0 5px;
    font-size:24px;
  }
  .container .user{
    position:relative;
    div{
      position:absolute;
      top:0;
      right:10px;
    }
    i{
      margin:0 8px;
      img{
        width:20px;
      }
    }
  }
</style>
