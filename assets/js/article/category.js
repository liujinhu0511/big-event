$(function () {
  var addIndex;
  // 获取文章信息,渲染列表
  renderCategory();

  function renderCategory() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status === 0) {
          $('tbody').html(template('tpl-list', res));
        }
      }
    })
  }
  // 点击添加类别，显示弹出层
  $('#showAdd').click(function () {
    addIndex = layer.open({
      type: 1,
      title: '添加文章分类',
      content: $('#add-form').html(),
      area: ['500px', '300px'],
    });

  })

  // 添加文章分类
  $('body').on('submit', '#add-form', function (e) {
    e.preventDefault();
    alert('11');
    // $.ajax({
    //   type: 'POST',
    //   url: '/my/article/addcates',
    //   data: this.serialize(),
    //   success: function (res) {
    //     layer.msg(res.message);
    //     if (res.status === 0) {
    //       renderCategory();
    //       layer.close(addIndex);
    //     }
    //   }
    // })
  })
})