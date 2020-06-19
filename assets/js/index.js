$(function () {
  // 加载用户信息
  getUserinfo()

  // 注册退出事件
  $('#exit').on('click', function () {
    // 实现功能
    // 1.删除token
    // 2.跳转到login页面
    // 3.发出询问
    layer.confirm('你确定要退出吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      localStorage.removeItem('token');
      location.href = '/login.html';
      layer.close(index);
    });
  })
})

// 定义一个加载用户信息函数
function getUserinfo() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      if (status === 0) {
        // 设置头像
        let name = res.data.nickname || res.data.username;
        if (res.data.user_pic) {
          $('.layui-nav-img').attr('src', res.data.user_pic).show();
          $('.img-text').hide();
        } else {
          $('.img-text').css('display', 'inline-block').text(name.substr(0, 1).toUpperCase());
          $('.layui-nav-img').hide();
        }
      }
    }
  })
}