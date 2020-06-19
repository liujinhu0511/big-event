$(function () {

  // 切换注册页面
  $('.go-reg').on('click', function () {
    $('.register').show().siblings().hide();
  })

  // 切换登录页面
  $('.go-log').on('click', function () {
    $('.login').show().siblings().hide();
  })


  // 注册用户
  $('.register form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();
    // console.log(11);
    // 获取表单提交的数据
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
      type: "POST",
      url: 'http://www.liulongbin.top:3007/api/reguser',
      data: data,
      success: function (res) {
        // alert(res.message);
        layer.msg(res.message)
        if (res.status === 0) {
          $('.register').hide().prev().show();
        }
      }
    })
  })


  // 验证
  var form = layui.form;
  form.verify({
    pwdLength: [/^\w{6,12}$/, '密码长度必须是6到12位'],

    checkPwd: function (value) {
      var password = $('#reg-password').val();
      // 比较 password（密码）和value（确认密码）
      if (password !== value) {
        return '两次密码不一致';
      }
    }
  })

  // 登录
  $('.login form').on('submit', function (e) {

    e.preventDefault();

    // console.log(11);
    var data = $(this).serialize();
    $.post('http://www.liulongbin.top:3007/api/login', data, function (res) {
      // alert(res.message);
      layer.msg(res.message);
      // 成功了，跳转到index.html
      if (res.status === 0) {
        // 把token保存到本地存储种
        localStorage.setItem('token', res.token)
        location.href = '/index.html';
      }
    })
  })
})