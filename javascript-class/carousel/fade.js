import "./css/resets.css";
import "./css/fade.scss";
import "animate.css"; // 引入动画库

import Carousel from ".";   // 引入父类

export default class Fade extends Carousel {
  constructor(
    el,
    {
      defaultIndex, // 当前选中项
      duration, //  轮播时间
    }
  ) {
    super(el);

    this.duration = duration;
    this._index = defaultIndex;

    // 初始化
    this.init();
  }
  // 定义静态属性
  static t = null;

  init() {
    this.show(true);
    this.bindEvent();
    this.play();
  }

  get currentIndex() {
    return this._index;
  }

  set currentIndex(newValue) {
    // this.currentIndex = newValue;
    // this._index = newValue;
    this.update(() => {
      this._index = newValue;
    });
  }
  // 鼠标移入 清除定时器
  handleMouseEnter(){
    clearInterval(Fade.t);
  }
  // 鼠标移出  重新轮播
  handleMouseLeave(){
    this.play();
  }
  // 点击原点切换轮播图
  handleDotClick(e){
    e.target.className === "dot" && (this.currentIndex = [].indexOf.call(this.$dots, e.target));
  }
  // 添加类
  show(isInitial) {
    if (isInitial) {
      // 设置动画
      for (let i = 0; i < this.$imgWrappers.length; i++) {
        this.$imgWrappers[i].classList.add("animate__fadeOut");
      }
    }
    this.$imgWrappers[this.currentIndex].classList.remove("animate__fadeOut");
    this.$imgWrappers[this.currentIndex].classList.add("animate__fadeIn");
    this.$dots[this.currentIndex].classList.add("active");
  }
  //   删除类
  hide() {
    this.$imgWrappers[this.currentIndex].classList.remove("animate__fadeIn");
    this.$dots[this.currentIndex].classList.remove("active");
    this.$imgWrappers[this.currentIndex].classList.add("animate__fadeOut");
  }

  update(setIndex) {
    // 先隐藏
    this.hide();
    // 设置索引
    setIndex();
    // 添加类
    this.show();
  }

  play() {
    // 访问静态属性 Fade.t
    Fade.t = setInterval(() => {
      // 当前索引项大于等于所有图片 ? 设置索引0 : 索引++
      this.currentIndex >= this.$imgWrappers.length - 1
        ? (this.currentIndex = 0)
        : this.currentIndex++;
    }, this.duration);
  }
}
