/*
 *@author: wjf
 *@date: 2018年04月12日
 *@description: 关键词接口
 *@last-updata 2018年04月12日
 */

import request from '@/utils/request'

/**
 * 获取所有关键词列表
 */
export function getAllKeyWords () {
  return request({
    url: '/keyword_tags',
    method: 'GET'
  })
}

/**
 * 新增关键词
 */
export function addKeyWords (data) {
  return request({
    url: '/keyword_tags/',
    method: 'POST',
    data
  })
}

/**
 * 修改关键词
 */
export function updateKeyWords (id, data) {
  return request({
    url: '/keyword_tags/' + id,
    method: 'PUT',
    data
  })
}

/**
 * 删除文章分类
 */
export function deteleKeyWords (id) {
  return request({
    url: '/keyword_tags/' + id,
    method: 'DELETE'
  })
}
