$(function () {
  var form = layui.form;
  form.render('select');

  renderArticleList();
  // 加载文章列表
  function renderArticleList() {
    $.ajax({
      url: '/my/article/list',
      data: {
        pagenum: 1,
        pagesize: 2
      },
      success: function (res) {
        if (res.status === 0) {
          $('tbody').html(template('tpl-list', res));
        }
      }
    })
  }
})