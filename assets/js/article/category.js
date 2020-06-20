$(function () {
  var addIndex, exitIndex;
  var form = layui.form;
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
      content: $('#tpl-add').html(),
      area: ['500px', '250px'],
    });

  })
  // 点击编辑，显示弹出层
  $('tbody').on('click', '#btn-exit', function () {
    // dom方法,可以快速获取元素身上yidata开头的自定义属性值
    // var id = e.target.dataset.id;
    // var name = e.target.dataset.name;
    // var alias = e.target.dataset.alias;
    var data = JSON.parse(JSON.stringify(this.dataset));
    exitIndex = layer.open({
      type: 1,
      title: '修改文章分类',
      content: $('#tpl-exit').html(),
      area: ['500px', '250px'],
      success: function () {
        // 这里的对象只能是字面量对象
        form.val('exit-form', data)
      }
    });

  })
  // 添加文章分类
  $('body').on('submit', '#category-list', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          renderCategory();
          layer.close(addIndex);
        }
      }
    })
  })

  // 修改文章列表
  $('body').on('submit', '#exit-form', function (e) {
    var data = $(this).serializeArray();
    data[0].name = "Id";
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: data,
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          renderCategory();
          layer.close(exitIndex);
        }
      }
    })
  })


  // 删除列表信息
  $('tbody').on('click', '#btn-del', function () {
    // 获取id
    var Id = $(this).attr('data-id');

    layer.confirm('你确定要删除我吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      $.ajax({
        url: '/my/article/deletecate/' + Id,
        success: function (res) {
          layer.msg(res.message);
          if (res.status === 0) {
            renderCategory();
          }
        }
      })
    });

  })
})