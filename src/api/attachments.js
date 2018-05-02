/*
 *@author: wjf
 *@date: 2018年04月11日
 *@description: 文章分类接口
 *@last-updata 2018年04月11日
 */

import request from '@/utils/request'

/**
 * 获取所有文章分类
 */
export function getArticelClasses () {
  return request({
    url: '/categorys/',
    method: 'GET'
  })
}

/**
 * 增加文章分类
 */
export function addArticelClasses (data) {
  return request({
    url: '/categorys/',
    method: 'POST',
    data
  })
}

/**
 * 修改文章分类
 */
export function updateArticelClasses (id, data) {
  return request({
    url: '/categorys/' + id,
    method: 'PUT',
    data
  })
}

/**
 * 删除文章分类
 */
export function deteleArticelClasses (id) {
  return request({
    url: '/categorys/' + id,
    method: 'DELETE'
  })
}
