import request from './request'

export function $http (type, url, data) {
  // console.log(!!data)
  if (type.toLowerCase() === 'get') {
    // console.log('http request')
    if (true && !!data) {
      url += (url.indexOf('?') < 0 ? '?' : '') + param(data)
    }
    return request.get(url)
  } else if (type.toLowerCase() === 'post') {
    return request.post(url, data)
  }
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
