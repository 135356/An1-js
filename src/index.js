class Cc
{
  constructor()
  {}

  this_(this_)
  {
    this.this__ = this_;
    return this;
  }

  imgError(photo){
    photo = photo||require('@/assets/img/load/load_picture_border1@1.png');
    let element = event.srcElement;
    element.src = photo;
    element.onerror = null;
    return false;
  }

  /*生成随机整数*/
  ranInt(min,max)
  {
    if(!max){
      max = min;
      min = 0;
    }
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  /*生成随机字符串*/
  ranStr(len)
  {
    len = len || 1;
    let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++){
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd.toLowerCase();
  }

  /*把数组顺序打乱,或返回0-n的随机不重复的数组*/
  ranArr(arr){
    if (typeof(arr)=="number"){
      let max = arr;
      arr = [];//创建一个空数组用来保存随机数组
      for(let i=0; i<max; i++){//按照正常排序填充数组
        arr[i] = i+1;
      }
    }
    arr.sort(function(){
      return 0.5-Math.random();//返回随机正负值
    });
    return arr;//返回数组
  }
}

export default Cc;
