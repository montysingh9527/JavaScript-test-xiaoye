import "./css/resets.css";
import "./css/slide.scss";
import Carousel from ".";   // 引入父类

// extends 继承父类
export default class Slide extends Carousel {
  constructor(
    el,
    {
      defaultIndex, // 当前选中项
      duration, //  轮播时间
    }
  ) {
    // 使用 super.method(...) 调用父方法。
    // 使用 super(...) 调用父构造函数（仅在 constructor 函数中）。
    super(el);
    this.$imgStage = this.$el.querySelector(".img-stage");  // 获取img容器

    this.duration = duration;
    this._index = defaultIndex;
    this.imgWidth = this.$imgWrappers[0].offsetWidth; // 第一个图片offsetWidth

    // 初始化
    this.init();
  }
  // 定义静态属性 定时器
  static t = null;

  init() {
    this.clone();
    this.update(null, true);
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

  clone() {
    // 克隆第一个图片放最后
    const firstNode = this.$imgWrappers[0];
    const clonedNode = firstNode.cloneNode(true);
    firstNode.parentNode.appendChild(clonedNode);
  }

  // 鼠标移入 清除定时器
  handleMouseEnter() {
    clearInterval(Slide.t);
  }
  // 鼠标移出  重新轮播
  handleMouseLeave() {
    this.play();
  }
  
  update(setIndex, isInitial){
    let currentIndex;
    if(!isInitial){
        currentIndex = this.currentIndex >= this.$imgWrappers.length - 1 ? 0 : this.currentIndex;
        this.$dots[currentIndex].classList.remove("active");
        setIndex();
    }
    currentIndex = this.currentIndex >= this.$imgWrappers.length - 1 ? 0 : this.currentIndex;
    console.log("======",currentIndex)
    this.$dots[currentIndex].classList.add("active");
  }
  // 点击原点切换轮播图
  handleDotClick(e) {
    e.target.className === "dot" &&
      (this.currentIndex = [].indexOf.call(this.$dots, e.target));
    this.slide();
  }
  // 轮播
  slide (){
    this.$imgStage.style.transition = "transform .3s ease 0s";
    this.$imgStage.style.transform = `translate3d(${-this.currentIndex * this.imgWidth}px, 0, 0)`;
  }
  // 重置
  reset() {
    setTimeout(()=>{
        this.$imgStage.style.transition = "none";
        this.$imgStage.style.transform = `translate3d(0, 0, 0)`;
    }, 500)
  }
  // 执行轮播
  play() {
    Slide.t = setInterval(()=>{
        this.currentIndex++;
        this.slide();
        // 移动位置 >= 总图片
        if(this.currentIndex >= this.$imgWrappers.length - 1){
            this.currentIndex = 0;
            this.reset();
        }
    }, this.duration)
  }
}
