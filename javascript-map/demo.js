/**
 * Map 构造器 -> map对象
 */

const m = new Map();
m.set("a", 1); // Vue.$set("name","zhangsan"};
m.set({ a: 1 }, 2);
m.set({ b: 2 }, [1, 2, 3]);
m.set([1, 2, 3], { c: 3 });
m.set(function test() {}, [2, 3, 4]);
console.log(m);
