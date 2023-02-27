import "./css/resets.css";
import "./css/fade.scss";

export default class Fade {
  constructor(
    el,
    {
      defaultIndex, // 当前选中项
      duration, //  轮播时间
    }
  ) {
    this.$el = document.querySelector(el); // 大容器
    this.$imgWrappers = this.$el.querySelectorAll(".img-wrapper"); // 所有img
    this.$dotWrapper = this.$el.querySelector(".indicator"); // 小圆点容器
    this.$dots = this.$dotWrapper.querySelectorAll(".dot"); // 所有小圆点

    this.duration = duration;
    this._index = defaultIndex;
    
    // 初始化
    this.init();
  }

  init() {
    this.show();
  }

  get currentIndex() {
    return this._index;
  }

  set currentIndex(newValue) {
    // this.currentIndex = newValue;
    // this._index = newValue;
  }

  show() {
    // 添加active
    this.$imgWrappers[this.currentIndex].classList.add("active");
    this.$dots[this.currentIndex].classList.add("active");
  }
  hide() {
    // 移除active
    this.$imgWrappers[this.currentIndex].classList.remove("active");
    this.$dots[this.currentIndex].classList.remove("active");
  }
}
