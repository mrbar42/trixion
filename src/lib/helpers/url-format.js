'use strict';

export function format(urlObj) {
  return [
    'protocol',
    'auth',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash'
  ]
    .map(key => {
      switch (key) {
      case 'protocol':
        return urlObj.protocol ? urlObj.protocol + '://' : '';
      case 'auth':
        return urlObj.auth ? urlObj.auth + '@' : '';
      case 'port':
        return urlObj.port ? ':' + urlObj.port : '';
      case 'search':
        return urlObj.search ? '?' + urlObj.search : '';
      case 'hash':
        return urlObj.hash ? '#' + urlObj.hash : '';
      case 'hostname':
        return urlObj[key] || '';
      case 'pathname':
        return '/' + (urlObj[key] || '').replace(/^\//, '');
      }
    }).join('');
}
