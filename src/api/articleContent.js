/*
 *@author: wjf
 *@date: 2018年04月12日
 *@description: 文章内容
 *@last-updata 2018年04月12日
 */

import request from '@/utils/request'

/**
 * 通过ID获取文章内容
 */
export function getArticelContent (id) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'GET'
  })
}

/**
 * 增加文章内容
 */
export function addArticelContent (id, data) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'POST',
    data
  })
}

/**
 * 修改文章内容
 */
export function updateArticelContent (id, data) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'PUT',
    data
  })
}
