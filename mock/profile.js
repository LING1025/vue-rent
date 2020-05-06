/*
import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '@cname',
    faceUrl: '@cname',
    username: '@cname',
    'sex|0': ['男', '女'],
    age: '@cname',
    phone: '@cname',
    balance: '@cname',
    'isAdmin|1': ['Yes', 'No']
  }))
}

export default [
  {
    url: '/profile/info',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          items: List
        }
      }
    }
  },
  {
    url: '/profile/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
*/
