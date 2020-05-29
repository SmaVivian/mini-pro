// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 分页
  const countRes = await db.collection('goods').count()
  const toatl = countRes.total

  let resData = {}
  await db.collection('goods').skip((event.currentPage-1) * event.size).limit(event.size).get().then(res => {
    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    console.log(parseInt(toatl / event.size) + (toatl % event.size > 0 ? 1 : 0))
    resData = {
      data: res.data,
      page: {
        allRow: toatl,
        currentPage: event.currentPage,
        size: event.size,
        totalPage: parseInt(toatl / event.size) + (toatl % event.size > 0 ? 1 : 0)
      },
      success: 1
    }
    console.log(res.data)
  })

  if(resData.success) {
    return resData
  } else {
    return {
      data: [],
      error: {
        msg: '异常'
      }, 
      success: 0
    }
  }

  // return db.collection('goods').skip((event.currentPage-1) * event.size).limit(event.size).get()

  // return db.collection('goods').where({
  //   _openid: 'server'
  // }).limit(1).get()
}