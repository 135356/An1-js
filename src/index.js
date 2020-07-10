class Cc
{
  constructor()
  {}

  this_(this_)
  {
    this.this__ = this_;
    return this;
  }

  imgError(event){
    let img = event.srcElement;
    img.src = require('@/assets/img/load/load_picture_border1@1.png');
    img.onerror = null;
  }
}

export default Cc;
