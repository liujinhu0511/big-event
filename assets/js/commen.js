// 判断是否有token，如果没有，跳转到登录页面
// 需要引入在本页自己js文件之前
if (!localStorage.getItem('token')) {
  location.href = '/login.html'
}

$(function () {
  $.ajaxPrefilter(function (options) {
    // console.log(options);
    // 可以在发送到服务器之前，获取到ajax请求的所有配置
    // 也可以自行再设置

    // 1.统一配置url
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 2.统一配置headers
    options.headers = {
        Authorization: localStorage.getItem('token')
      },
      options.beforeSend = function () {
        NProgress.start();
      },
      options.complete = function (xhr) {
        NProgress.done();
        // 每次ajax请求完成后判断一下
        // 判断是否使用了假token，和token是否过期了
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
          localStorage.removeItem('token');
          location.href = '/login.html';
        }
      }
  })
})