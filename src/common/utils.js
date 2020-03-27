/* 对refresh()函数调用过于频繁的问题，可以使用防抖函数debounce/节流函数throttle */
// 将refresh函数传入debounce函数，生成一个新的函数，之后在调用非常频繁时，使用新的函数
// 新生成的函数不会频繁的调用，如果下一次执行来的非常快，会将上一次取消掉
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
