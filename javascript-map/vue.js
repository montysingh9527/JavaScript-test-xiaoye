export default class Vue {
  constructor({ el, data, template, methods }) {
    this.$el = document.querySelector(el);
    this.$data = data();
    this._init(this, template, methods);
  }
  /**
   * 数据结构：
   * {
   *    img: {
   *      type: if / show
   *      prop: isShowImg1 / isShowImg2
   *    }
   * }
   * {
   *    button : {
   *          handler
   *     }
   * }
   */

  _init(vm, template, methods) {
    // 创建节点
    const oContainer = document.createElement("div");
    // 插入模板
    oContainer.innerHTML = template;

    const showPool = new Map();
    const eventPool = new Map();
    // 数据更新
    this.initData(vm, showPool);
    // 初始化数据
    this.initPool(oContainer, methods, showPool, eventPool);
    // 事件绑定
    this.bindEvent(vm, eventPool);
    // 渲染页面
    this.render(vm, showPool, oContainer);
  }

  initData(vm, showPool) {
    const _data = vm.$data;
    for (let key in _data) {
      Object.defineProperty(vm, key, {
        get() {
          return _data[key];
        },
        set(newValue) {
          _data[key] = newValue;
          this.update(vm, key, showPool);
        },
      });
    }
  }
  initPool(container, methods, showPool, eventPool) {
    const allNodes = container.getElementsByTagName("*");
    let dom = null;
    for (let i = 0; i < allNodes.length; i++) {
      dom = allNodes[i];
      const vIfData = dom.getAttribute("v-if");
      const vShowData = dom.getAttribute("v-show");
      const vEvent = dom.getAttribute("@click");

      if (vIfData) {
        showPool.set(dom, {
          type: "if",
          prop: vIfData,
        });
        dom.removeAttribute("v-if");
      }
      if (vShowData) {
        showPool.set(dom, {
          type: "show",
          prop: vShowData,
        });
        dom.removeAttribute("v-show");
      }
      if (vEvent) {
        eventPool.set(dom, {
          type: "click",
          handler: methods[vEvent],
        });
        dom.removeAttribute("@click");
      }
    }
    console.log("===initPool===", showPool, eventPool);
  }
  // 事件绑定
  bindEvent(vm, eventPool) {
    for (let [dom, info] of eventPool) {
      const { type, handler } = info;
      vm[handler.name] = handler;
      dom.addEventListener(type, vm[handler.name].bind(vm), false);
    }
  }
  // 渲染页面
  render(vm, showPool, container) {
    const _data = vm.$data;
    const _el = vm.$el;
    for (let [dom, info] of showPool) {
      switch (info.type) {
        case "if":
          // createComment创建一个注释节点  即<!--v-if-->
          info.comment = document.createComment("v-if");
          !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom);
          break;
        case "show":
          !_data[info.prop] && (dom.style.display = "none");
          break;
        default:
          break;
      }
    }
    console.log("==render==", container);
    _el.appendChild(container);
  }
  // 更新节点
  update(vm, key, showPool) {
    const _data = vm.$data;
    for (let [dom, info] of showPool) {
      if (info.prop === key) {
        switch (info.type) {
          case "if":
            !_data[key]
              ? dom.parentNode.replaceChild(info.comment, dom)
              : info.comment.parentNode.replaceChild(dom, info.comment);
            break;
          case "show":
            !_data[key]
              ? (dom.style.display = "none")
              : (dom.style.display = "");
            break;
          default:
            break;
        }
      }
    }
  }
}
