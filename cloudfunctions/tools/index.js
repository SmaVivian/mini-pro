// todo  
// 按照官网例子报错 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-server-api/functions/callFunction.html
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const total = event.total
  return {
    allRow: total,
    currentPage: event.currentPage,
    size: event.size,
    totalPage: parseInt(total / event.size) + (total % event.size > 0 ? 1 : 0)
  }
}