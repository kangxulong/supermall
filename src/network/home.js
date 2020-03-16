import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈（弹出函数栈，释放所有变量）
// 函数调用结束释放变量后，函数中的数据因为没有指针指向，会被内存作为垃圾回收，所以需要在data中创建一个变量，来保存函数中数据，实质是保存函数中变量的内存地址
// 所以数据还有指针指向，不会作为垃圾回收

// function test() {
//   const name = ["kxl", "jdska"]
// }

// test() 

// let count = [];

// const num1 = [1111,222,333];
// const num2 = [31313,4231,3213];

// count.push(...num1)
// console.log(count);
