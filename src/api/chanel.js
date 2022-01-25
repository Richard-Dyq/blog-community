import request from '@/utils/request'

export const getChanelList = () => request({
  url: '/v1_0/channels',
  methods: 'GET'
})
export const getArticle = params => request({
  url: '/v1_0/articles',
  methods: 'GET',
  params
})
