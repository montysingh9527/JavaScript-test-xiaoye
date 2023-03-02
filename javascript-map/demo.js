/**
 * Map 构造器 -> map对象
 */

/**
 * 
Map 和 Object区别:
Map 键名： 引用类型、基本类型
Object 键名： String、symbol

Map：是有序的, 可迭代的。
Object：是无序的, 不可迭代的。 ES2015规范 建议浏览器厂商对对象的枚举采取有序化操作。

获取长度：
Map： size
Object： Object.keys().length   、枚举计数

Map：支持迭代  for of   有可迭代协议 Symbol.iterator
Object  不支持迭代

Map操作  底层做了全面优化
Object操作  没有做任何优化

Map没有序列化操作  不支持JSON.stringify()  JSON.parse() 。 可以通过方法实现 如下方法：序列化replacer 、反序列化reviver
Object 支持序列化 -> 纯数据

*/

/**
 * Map序列化操作
const q = new Map();
q.set("a", 1); 
q.set({ b: 1 }, 2);
q.set([1, 2, 3], 3);
// console.log([...q])
// console.log(q)   // {'a' => 1, {b: 1} => 2, [1, 2, 3] => 3}
// [["a", 1], [{b: 1}, 2]]   ——>  {"a"=>1,{ b: 1 }=>2}
// const stringRes1 = JSON.stringify(q);
// console.log("==stringRes1==",stringRes1) // {}

function replacer(key, value){
    if(value instanceof Map){
        return {
            type:"Map",
            value: [...value]
        }
    } else {
        return value;
    }
}
const stringRes2 = JSON.stringify(q, replacer);
console.log("==stringRes2==",stringRes2)   // {"type":"Map","value":[["a",1],[{"b":1},2],[[1,2,3],3]]}


function reviver(key, value){
    if(value.type === "Map"){
        return new Map(value.value);
    }
    return value;
}
const stringRes3 = JSON.stringify(stringRes2, reviver);
console.log("==stringRes3==",stringRes3) 
 */

/**
 * 
const h = new Map();
h.set("a",1);
console.log(h) // {"a" => 1}
console.log(h.get("a")) // 1

h["a"] = 1;   // 这是给map增加属性，并不是map数据
console.log(h)  // a:1
 */

/**
const m = new Map();
m.set("a", 1); // Vue.$set("name","zhangsan"};
m.set({ a: 1 }, 2);
m.set({ b: 2 }, [1, 2, 3]);
m.set([1, 2, 3], { c: 3 });
m.set(function test() {}, [2, 3, 4]);
console.log(m);

console.log(m.get("a")); // 1
const obj0 = { a: 1 };
console.log(m.get(obj0));
m.delete(obj0);
console.log(m.size); // 获取长度
console.log(m.has("a")); // 判断是否在map中
 */

/**
 * 
const h = new Map();
h.set("a", 1);
h.set("b", 2);
h.set("c", 3);
console.log(h)
for(let [key, value] of h){
    // console.log("==key, value==",key, value) // a 1  b 2  c 3
}


// 不能使用of， 有 Symbol(Symbol.iterator) 才能迭代 of
const obj1 = {
    a: 1,
    b: 2,
    c: 3,
}
for(let key in obj1){   // 枚举  无序列表
    console.log("==key==",key, obj1[key])  // a 1  b 2  c 3
}

*/

/**
  不是原则性顺序, ES2015, 建议浏览器厂商按照对象键名的顺序进行枚举
  {
    a: 1,
    b: 2,
    c: 3
  }
  {
    b: 2,
    a: 1,
    c: 3
  }
  [1, 2]
 */

/**
 * 
const arr1 = [1, 2, 3];
// 定义生成器函数
function * generator (arr) {
    for(let i =0;i<arr.length; i ++){
        // yidld 产出值,停止
        yield arr[i];
    }
}
const iterator = generator(arr1);
// 迭代器
console.log(iterator.next());   // {value: 1, done: false}
console.log(iterator.next());   // {value: 2, done: false}
console.log(iterator.next());   // {value: 3, done: false}
console.log(iterator.next());   // 迭代完成 {value: undefined, done: true}
 */

/**
// 不能迭代of，没有可迭代协议Symbol(Symbol.iterator)
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
};
// ES6写法： 声明可迭代协议 Symbol(Symbol.iterator), 定义生成器函数
// Object.prototype[Symbol.iterator] = function* () {
//   let keys = Object.keys(this); // ["a", "b", "c"]
//   for (let key of keys) {
//     console.log("=====", key);
//     yield [key, this[key]];
//   }
// };

// ES5写法： 声明可迭代协议 Symbol(Symbol.iterator)
Object.prototype[Symbol.iterator] = function () {
  var keys = Object.keys(this);
  var count = 0;
  var _self = this;
  return {
    next: function () {
      return count < keys.length
        ? {
            value: [keys[count], _self[keys[count++]]],
            done: false,
          }
        : {
            value: undefined,
            done: true,
          };
    },
  };
};
for (let [key, value] of obj2) {
  console.log(key, value); // a 1  b 2  c 3
}
*/

/**
 * 
const p = new Map();
p.set("a", 1);
p.set("b",2)

// 同零相等 ——> 相等性判断 （Map键名不能重复）
p.set(0, 1);
p.set(-0, 2)
console.log(p) // {0 => 2}

// NaN !== NaN 
p.set(NaN, 1)
p.set(NaN, 2)
console.log(p)   // NaN键名相等： {NaN => 2}
 */

