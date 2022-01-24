import request from '@/utils/request.js'

export const login = param =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: param
  })
export const sendMsg = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

export const loadUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
})
