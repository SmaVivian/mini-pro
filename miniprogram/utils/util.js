/**
 * @param {校验的字符串} str
 * @param {校验类型 'phone' 'password' 'numLetter':数字+字母, 'numForward':正整数, 'numDecimal':最多保留两位, numberDecimal:数字} type
 * @Auth zhangwei
 * @date 20181029
 */
function validate(str, type) {
  let isMatch = false,
    isNum = /^[0-9]+.?[0-9]*$/, // 非负数
    isMobile = /^1[3578]\d{9}$|^147\d{8}$/,
    ispass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/, // 6-20位字符；数字、字母、特殊字符（除空格），起码其中两种组合
    isNumAndLetter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,30}$/, // 2-30位字母加数字
    isNumForward = /^[0-9]*[1-9][0-9]*$/, // 正整数
    isNumDecimal = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, // 最多保留两位
    isDecimal = /^-?\d*\.?\d*$/ //数字

  switch (type) {
    case 'phone':
      if (isMobile.test(str)) {
        isMatch = true
      }
      break
    case 'password':
      if (ispass.test(str)) {
        isMatch = true
      }
      break
    case 'number':
      if (isNum.test(str)) {
        isMatch = true
      }
      break
    case 'numLetter':
      if (isNumAndLetter.test(str)) {
        isMatch = true
      }
      break
    case 'numForward':
      if (isNumForward.test(str)) {
        isMatch = true
      }
      break
    case 'numDecimal':
      if (isNumDecimal.test(str)) {
        isMatch = true
      }
      break
    case 'numberDecimal':
      if (isDecimal.test(str)) {
        isMatch = true
      }
      break
  }

  return isMatch
}

module.exports = {
  validate: validate
}