/*
 *@author: wjf
 *@date: 2018年04月12日
 *@description: 文章列表接口
 *@last-updata 2018年04月12日
 */

import request from '@/utils/request'

/**
 * 获取所有文章列表
 */
export function getAllArticleList (page, size) {
  return request({
    url: '/articles?page=' + page + '&size=' + size,
    method: 'GET'
  })
}

/**
 * 新增新文章
 */
export function addArticle (categoryId, data) {
  return request({
    url: '/articles?categoryId=' + categoryId,
    method: 'POST',
    data
  })
}
/**
 * 获取单独文章详情
 */
export function getArticleDetail (id) {
  return request({
    url: '/articles/' + id + '/content',
    method: 'GET'
  })
}

/**
 * 修改文章
 */
export function updateArticle (id, categoryId, data) {
  return request({
    url: '/articles/' + id + '?categoryId=' + categoryId,
    method: 'PUT',
    data
  })
}

/**
 * 删除文章
 */
export function deteleArticle (id) {
  return request({
    url: '/articles/' + id,
    method: 'DELETE'
  })
}
