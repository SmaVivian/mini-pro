// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 分页
  const countRes = await db.collection('goods').count()
  const toatl = countRes.total
  // cloud.init({
  //   env: process.env.TCB_ENV,
  // })
  return db.collection('goods').skip((event.currentPage-1) * event.size).limit(event.size).get()

  // return db.collection('goods').where({
  //   _openid: 'server'
  // }).limit(1).get()
}