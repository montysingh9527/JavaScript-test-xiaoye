export default class Carousel {
    constructor(el){
        this.$el = document.querySelector(el);
        this.$imgWrappers = this.$el.getElementsByClassName("img-wrapper"); // 单个图片
        this.$dotWrapper = this.$el.querySelector(".indicator"); // 小圆点容器
        this.$dots = this.$dotWrapper.querySelectorAll(".dot"); // 所有小圆点
    }   

    // 事件监听
    bindEvent() {
        this.$el.addEventListener("mouseenter", this.handleMouseEnter.bind(this), false);
        this.$el.addEventListener("mouseleave", this.handleMouseLeave.bind(this), false);
        this.$dotWrapper.addEventListener("click", this.handleDotClick.bind(this), false);
    }

    // 在实例化对象之前可以通过 类名.方法名 调用静态方法。静态方法不能在对象上调用，只能在类中调用。
    static create(el, {
        type,
        defaultIndex,
        duration,
    }){
        function createInstance (res){
            return new res.default(el,{
                defaultIndex,
                duration
            })
        }
        switch(type){
            case "slide":
                // 动态引入
                return import('./slide').then(createInstance);
            case "fade":
                return import("./fade").then(createInstance);
            default:
                return import('./slide').then(createInstance);
        }
    }

  
}


// Carousel.create("#carousel-slide",{
//     type:"slide",
//     defaultIndex: 0,
//     duration: 2000
// })