(function () {
  let Fpa = function (selector, context) {
    return new Fpa.fn(selector, context)
  }
  Fpa.fn = Fpa.prototype = {
    version: 'v1.0',
    constructor: Fpa,
    /**
     * 对地址栏url解析拦截
     * @param url
     * @returns {{}|any}
     */
    parseUrl: function (url) {
      url = url == null ? window.location.href : url
      var search = url.substring(url.lastIndexOf('?') + 1)
      if (!search) {
        return {}
      }
      return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '')
        .replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }
  }
  window.fpa = Fpa.fn
})(window)
