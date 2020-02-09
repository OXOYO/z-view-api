/**
 * Created by OXOYO on 2020/2/3.
 *
 */

import Config from './Config'
import CategoryConfig from '../category/Config'
import config from '../../config'
// 接口服务根地址
const serverPath = config.system.protocol + config.system.host + (config.system.port ? ':' + config.system.port : '')
// 静态文件服务地址
const staticPath = serverPath + '/' + config.system.static
const fs = require('fs')
const path = require('path')

// 缓存数据
const cacheData = {
  pictures: null,
  videos: null
}

const getSubDirectories = function (dirPath, parentDir, types = []) {
  let fileList = []
  let directories = fs.readdirSync(dirPath)
  directories.forEach(function (childName) {
    let childPath = dirPath + '/' + childName
    let stats = fs.statSync(childPath)
    if (stats.isDirectory()) {
      fileList = fileList.concat(getSubDirectories(dirPath + '/' + childName, parentDir + '/' + childName, types))
    } else if (stats.isFile()) {
      let file = getFile(dirPath, parentDir, childName, types)
      if (file) {
        fileList.push(file)
      }
    }
  })
  return fileList
}

const getFile = function (dirPath, parentDir, fileName, types) {
  let typeArr = types.filter(type => fileName.toLocaleLowerCase().endsWith(type))
  if (!typeArr.length) {
    return
  }
  let type = typeArr[0].replace('.', '')
  let filePath = dirPath + '/' + fileName
  let stats = fs.statSync(filePath)
  if (stats.isFile()) {
    // 返回文件地址
    let fileUrl = staticPath + '/' + parentDir + '/' + fileName
    let file = {
      name: fileName,
      size: stats.size,
      modified_at: stats.mtime,
      type,
      dir: parentDir,
      fileUrl
    }
    return file
  }
}

const getOne = function (reqQuery, cacheName, dirName, types = []) {
  if (!cacheData[cacheName]) {
    let fileList = getSubDirectories(path.join(Config.baseDir, Config[dirName]), Config[dirName], types)
    cacheData[cacheName] = fileList || null
  }
  if (cacheData[cacheName]) {
    // 按分类目录过滤
    let categoryList = reqQuery.type ? CategoryConfig[reqQuery.type] : []
    let targetCategory = JSON.parse(reqQuery.category)
    let category = categoryList.find(item => item.name === targetCategory.name)
    let list = []
    if (cacheData) {
      cacheData[cacheName].filter(item => {
        category.dirs.forEach(dir => {
          if (item.dir.startsWith(dir)) {
            list.push(item)
          }
        })
      })
    }
    // 随机一个
    return list[Math.floor((Math.random() * list.length))]
  }
  return null
}

export default {
  async getPicture (reqQuery) {
    return getOne(reqQuery, 'pictures', 'picturesDir', ['.gif', '.jpg', '.jpeg', '.png'])
  },
  async getVideo (reqQuery) {
    return getOne(reqQuery, 'videos', 'videosDir', ['.mp4'])
  }
}
