$(function () {
  var form = layui.form;
  // 给表单加载数据
  function renderForm() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        form.val('userinfo', res.data)
      }
    })
  }
  renderForm();

  // 修改用户信息
  $('.layui-form').on('submit', function (e) {
    // 阻止表单默认提交事件
    e.preventDefault();
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: data,
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          window.parent.getUserInfo();
        }
      }
    })
  })

  // 重置
  $('button[type="reset"]').on('click', function (e) {
    e.preventDefault();
    renderForm();
  })
})