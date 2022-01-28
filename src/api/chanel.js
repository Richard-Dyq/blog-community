import request from '@/utils/request'

export const getUserChanelList = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})
export const getChanelList = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})
export const getArticle = params => request({
  url: '/v1_0/articles',
  method: 'GET',
  params
})
export const updateUserChanel = channel => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [channel]
  }
})
export const deleteUserChanel = param => request({
  url: `/v1_0/user/channels/${param}`,
  method: 'DELETE'
})
