import "./css/resets.css";
import "./css/fade.scss";
import "animate.css"; // 引入动画库

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
  // 定义静态属性
  static t = null;

  init() {
    this.show(true);
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
