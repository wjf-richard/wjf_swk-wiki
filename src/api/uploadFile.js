
/*
 *@author: rolitter
 *@date: 2018年04月17日
 *@description: 文件上传接口
 *@last-updata 2018年04月18日
 */

import request from '@/utils/request'
/**
 * 获取所有项目标签
 */
export function uploadAttachment (data) {
  return request({
    url: 'zuul/ciu/files',
    baseURL: 'http://gateway.mygear.cn',
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
