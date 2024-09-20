/*
 * @Description: 对 string 的处理
 * @Date: 2023-02-01 16:41:51
 * @LastEditors: JackyChou
 * @LastEditTime: 2023-08-02 19:06:22
 */

/* trim 方法模拟 */
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '')
}
// console.log(trim('  foobar   '));
// => "foobar"

// 将每个单词的首字母转换为大写
function titleize(str) {
  return str.toLowerCase().replace(/(^|\s)\w/g, function (...args) {
    console.log('args', args)
    const c = args[0]
    return c.toUpperCase()
  })
}
// console.log(titleize('my name is epeli'));
// => "My Name Is Epeli"

/**
 * 驼峰化
 * 其中分组(.)表示首字母。单词的界定是，前面的字符可以是多个连字符、下划线以及空白符。正则后面的?的目的，是为了应对str尾部的字符可能不是单词字符，比如str是'-moz-transform'
 */
function camelize(str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : ''
  })
}
// console.log(camelize('-moz-transform'));
// => "MozTransform"

/**
 * 匹配成对标签
 * 匹配一个开标签，可以使用正则<[^>]+>
 * 匹配一个闭标签，可以使用<\/[^>]+>
 * 但是要求匹配成对标签，那就需要使用反向引用，如：
 * var regex = /<([^>]+)>[\d\D]*<\/\1>/;
 * var string1 = "<title>regular expression</title>";
 * var string2 = "<p>laoyao bye bye</p>";
 * var string3 = "<title>wrong!</p>";
 * console.log( regex.test(string1) ); // true
 * console.log( regex.test(string2) ); // true
 * console.log( regex.test(string3) ); // false
 */

/**
 * html转义和反转义
 * 将HTML特殊字符转换成等值的实体
 * 其中使用了用构造函数生成的正则，然后替换相应的格式就行了
 */
function escapeHTML(str) {
  const escapeChars = {
    '¢': 'cent',
    '£': 'pound',
    '¥': 'yen',
    '€': 'euro',
    '©': 'copy',
    '®': 'reg',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    "'": '#39'
  }
  return str.replace(
    new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'),
    function (match) {
      return '&' + escapeChars[match] + ';'
    }
  )
}
// console.log(escapeHTML('<div>Blah blah blah</div>'));
// => "&lt;div&gt;Blah blah blah&lt;/div&gt";

// 实体字符转换为等值的HTML。
function unescapeHTML(str) {
  const htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  }
  return str.replace(/&([^;]+);/g, function (match, key) {
    console.log('match', match)
    if (htmlEntities.hasOwnProperty(key)) {
      return htmlEntities[key]
    }
    return match
  })
}
// console.log(unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;'));
// => "<div>Blah blah blah</div>"

Object.prototype.hasOwnProperty()
module.exports = {
  regStringTest() {
    // console.log(unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;'));
    const result = '2,3,5'.replace(/(\d+)/g, '$&$&')
    console.log(result)
  }
}

const str =
  'module.context /Users/zgm/Documents/Web/project/new-tms-react/node_modules/react-router-config/esm/tt//Users/zgm/Documents/Web/project/new-tms-react/node_modules/react-router-config/esm/tt/ss'

const ma = str.match(/node_modules([\\/][^/]+)+$/g)[0]

console.log('ma', ma.replace('node_modules', '').match(/[^/]+/g))
