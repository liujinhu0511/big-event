$(function () {
  var form = layui.form;


  // 动态渲染下拉框数据
  renderList()

  function renderList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status === 0) {
          $('.article-cate').html(template('tpl-select', res));
          form.render('select');
        }
      }
    })
  }
  // 时间过滤器
  function addZero(num) {
    return num < 10 ? '0' + num : num
  }

  template.defaults.imports.DateFormt = function (date) {
    let dt = new Date(date);
    let y = dt.getFullYear();
    let m = dt.getMonth() + 1;
    let d = dt.getDate();
    let h = dt.getHours();
    let mm = dt.getMinutes();
    let s = dt.getSeconds();

    return y + '-' + addZero(m) + '-' + addZero(d) + '   ' + addZero(h) + ':' + addZero(mm) + ':' + addZero(
      s);
  }
  var cate_data = {
    pagenum: 1,
    pagesize: 10,
    cate_id: '',
    state: ''
  }
  renderArticleList();
  // 加载文章列表
  function renderArticleList() {
    $.ajax({
      url: '/my/article/list',
      data: cate_data,
      success: function (res) {
        if (res.status === 0) {
          $('tbody').html(template('tpl-list', res));
        }
      }
    })
  }

  // 根据id删除文章
  $('tbody').on('click', '#btn-del', function () {
    $.ajax({
      url: '/my/article/delete/' + this.dataset.id,
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          renderArticleList();
        }
      }
    })
  })

  // 修改文章信息
  $('tbody').on('click', '#btn-exit', function () {
    location.href = '/article/publish.html'
  })
  // 筛选文章列表
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    // var data = $(this).serialize();
    cate_data.cate_id = $('select[name=cate_id]').val();
    cate_data.state = $('select[name=state]').val();
    renderArticleList()
  })
})