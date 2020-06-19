$(function () {
  // 表单验证
  var form = layui.form;
  form.verify({
    pwdLength: [/^\w{6,12}$/, '密码长度必须是6到12位，且不能有空客'],

    diffPwd: function (val) {
      var oldPwd = $('input[name="oldPwd"]').val();
      if (oldPwd === val) {
        return '新旧密码不能一样';
      }
    },
    samePwd: function (val) {
      var newPwd = $('input[name="newPwd"]').val();
      if (newPwd !== val) {
        return '两次密码不一致';
      }
    }
  })

  // 修改密码
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    // 获取表单数据
    var data = $(this).serialize();
    // 发送请求
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: data,
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          // reset是dom方法
          $('form')[0].reset();
        }
      }
    })
  })
})