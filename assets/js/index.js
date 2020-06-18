$(function () {
  getUserinfo()
})

// 定义一个加载用户信息函数
function getUserinfo() {
  $.ajax({
    url: 'http://www.liulongbin.top:3007/my/userinfo',
    success: function (res) {
      let name = res.data.nickname || res.data.username;
      if (status === 0) {
        // 设置头像
        if (res.data.user_pic) {
          $('.layui-nav-img').attr('src', res.data.user_pic).show();
          $('.img-text').hide();
        } else {
          $('.img-text').css('display', 'inline-block').text(name.substr(0, 1).toUpperCase());
          $('.layui-nav-img').hide();
        }

      } else {
        layer.msg(res.message);
      }
    },
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}