/*
 *@author: wjf
 *@date: 2018年04月12日
 *@description: 项目标签接口
 *@last-updata 2018年04月12日
 */

import request from '@/utils/request'

/**
 * 获取所有项目标签
 */
export function getAllProjectTag () {
  return request({
    url: '/project_tags',
    method: 'GET'
  })
}

/**
 * 新增项目标签
 */
export function addProjectTag (data) {
  return request({
    url: '/project_tags',
    method: 'POST',
    data
  })
}

/**
 * 修改项目标签
 */
export function updateProjectTag (id, data) {
  return request({
    url: '/project_tags/' + id,
    method: 'PUT',
    data
  })
}

/**
 * 删除项目标签
 */
export function deteleProjectTag (id) {
  return request({
    url: '/project_tags/' + id,
    method: 'DELETE'
  })
}
