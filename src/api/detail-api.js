/*
 *@author: wjf
 *@date: 2018年04月23日
 *@description: 文章详情内容
 *@last-updata 2018年04月23日
 */

import request from '@/utils/request'

/**
 * 获取文章详情的分类
 */
export function getDetailCategories () {
  return request({
    url: '/categories',
    method: 'GET'
  })
}

/**
 * 获取文章详情的短标题
 */
export function getDetailSubTitle (id) {
  return request({
    url: '/articles/' + id + '/category',
    method: 'GET'
  })
}

/**
 * 获取文章详情的id
 */
export function getDetailArticleId (id) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'GET'
  })
}

/**
 * 通过文章详情的id获取文章内容
 */
export function getArticleDetailById (id) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'GET'
  })
}
