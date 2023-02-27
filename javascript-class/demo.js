// 父类
class Test {
  constructor(a, b) {
    this.a = a;
    this.b = b;

    this.c = 3;
    this.d = 4;
  }

  plus() {
    return this.a + this.b;
  }

  // Test.total
  static total(a, b, c, d) {
    return a + b + c + d;
  }
}

// 子类
class Test1 extends Test {
  constructor(a, b) {
    super(a, b);
    console.log("====Test1===>>", this);

    console.log(Test.total(this.a, this.b, this.c, this.d));
    this.content = "";
  }
  get res() {
    return this.content;
  }

  set res(newValue) {
    this.content = newValue;
    update();
  }

  setRes(newValue) {
    this.content = newValue;
    update();
  }

  minus() {
    return this.c - this.d;
  }
}

class Test2 extends Test {
  constructor(a, b) {
    super(a, b);
    console.log("==Test2==>>>", this);
  }
}

const test1 = new Test1(1, 2);
const test2 = new Test2(3, 4);

// test1 -> plus ? x -> test1.__proto__ => Test1.prototy => plus ? x => Test1.prototype.__proto__ => Test.prototype => plus
const res1 = test1.plus();
const res2 = test2.plus();
const res3 = test1.minus();

console.log("===res1===res2===res3==>>", res1, res2, res3);

test2.res = "我是小野森森";

test2.setRes("我是小野森森");

Object.defineProperty(this, "res", {
  get() {
    return this.content;
  },
  set(newValue) {
    this.content = newValue;
    update();
  },
});
