/*
 * @Description: 正则-数字
 * @Date: 2023-02-01 16:38:11
 * @LastEditors: JackyChou
 * @LastEditTime: 2023-04-03 14:42:01
 */

// 整数部分加逗号
function regNumComma1(str) {
  const ns = `${str}`
  let result = ''
  if (ns.includes('.')) {
    // ?=p 虽然一定要外包括号，但是在 replace 中并不算作一组
    const reg = /(?!^)(?=(\d{3})+\.)/g
    result = ns.replace(reg, ',')
  } else {
    const reg = /(?!^)(?=(\d{3})+$)/g
    result = ns.replace(reg, ',')
  }
  return result
}

function regNumComma2(str) {
  const reg = /(?<!^.*\..*)(?<=\d)((?=[^.]+\.)(?=(\d{3})+\.)|(?![^.]+\..*$)(?=(\d{3})+$))/g
  const result = str.replace(reg, (...args) => args[1] + ',')
  return result
}

function addCommas(num) {
  // 将数字转换为字符串，并获取整数部分和小数部分
  const parts = num.toString().split('.')
  let integerPart = parts[0]
  const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  // 使用正则表达式为整数部分添加千分位逗号
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 将整数部分和小数部分合并，并返回结果
  return integerPart + decimalPart
}

const num = 123458123.123321
const formattedNum = addCommas(num)
console.log(formattedNum) // 输出 "1,234,567.89"
