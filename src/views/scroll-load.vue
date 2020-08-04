<!--点击屏幕下拉加载更多-->
<template lang="html">
  <div>
    <slot></slot>
    <div :style="'height:'+scroll_state.top+'px;'">
      <div v-if="!scroll_state.end&&scroll_state.load_show" class="load" :style="'height:'+scroll_state.default_top+'px;'">
        <div class="turn">
          <div class="turn_1"></div>
        </div>
        <div class="turn_text">{{scroll_state.end?'没有更多了...':'加载中...'}}</div>
      </div>
      <div v-if="scroll_state.end" class="load" :style="'height:'+scroll_state.default_top+'px;'">
        <div class="turn_text">没有更多了...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ScrollRefresh',
  props: {fun_:Function},
  data () {
    return {
      scroll_state:{
        load_show:false,
        top:0,
        default_top:60,
        refresh:false,
        end:false,
      },
    }
  },
  methods: {
    /*节流函数 : 减少浏览器内存消耗*/
    throttle(ele, callback) {
      let state = false;
      return ()=>{
        if(state||this.scroll_state.end){
          return;
        }
        state = true;
        // requestAnimationFrame:回调间隔 = 浏览器重绘频率
        window.requestAnimationFrame((timestamp)=>{
          if (!this.scroll_state.refresh&&ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {// 检测是否滚动到元素底部
            callback();
          }
          state = false;
        });
      };
    },
    funF()
    {
      this.scroll_state.load_show=true;
      this.scroll_state.refresh=true;
      this.scroll_state.top=this.scroll_state.default_top;
      this.fun_().then((res)=>{
        this.scroll_state.refresh=false;
        this.scroll_state.top=0;
        if(res){
          this.scroll_state.load_show=false;
        }else{
          this.scroll_state.load_show=true;
          this.scroll_state.end=true;
        }
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.throttle(document.documentElement, this.funF));
  }
}
</script>
<style lang="scss" scoped>
  .load{
    position:fixed;
    width:100%;
    bottom:0;
    margin:0;
    z-index: 999;
    text-align: center;
    background:#eee;
  }
  .load .turn {
    width: 30px;
    height: 30px;
    margin:3px auto;
    overflow:hidden;
    border-radius:15px;
    border:dashed 1px #ff7800;
    animation: turn 2s linear infinite;
  }
  .load .turn_1{
    width:101%;
    height:1%;
    border-radius:5px 12px 1px;
    background:#ff7800;
    animation: turn1 3s linear infinite;
  }
  .load .turn_text{
    font-size:12px;
  }
  @keyframes turn {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes turn1 {
    0% {
      height:2%;
    }
    100% {
      height:100%;
    }
  }
</style>
