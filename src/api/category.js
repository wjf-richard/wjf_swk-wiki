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
    url: '/categories',
    method: 'GET'
  })
}

/**
 * 增加文章分类
 */
export function addArticelClasses (data) {
  return request({
    url: '/categories',
    method: 'POST',
    data
  })
}

/**
 * 修改文章分类
 */
export function updateArticelClasses (id, data) {
  return request({
    url: '/categories/' + id,
    method: 'PUT',
    data
  })
}

/**
 * 删除文章分类
 */
export function deteleArticelClasses (id) {
  return request({
    url: '/categories/' + id,
    method: 'DELETE'
  })
}

/**
 * 拖动排序
 */
export function dragArticelClasses (data) {
  return request({
    url: '/categories/sort',
    method: 'POST',
    data
  })
}
