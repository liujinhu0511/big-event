$(function () {
  // 初始化富文本编辑器
  initEditor()
  // 重新渲染form数据
  var form = layui.form;
  renderList()
  // 加载下拉框数据
  function renderList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status === 0) {
          $('.article-cate').html(template('tpl-list', res));
          form.render('select');
        }
      }
    })
  }
  // 实现基本裁剪效果：
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#chooseImage').click(function () {
    $('#file').click();
  })
  $('#file').change(function () {
    // 生成一个临时的url
    var url = URL.createObjectURL(this.files[0]);
    // 重新生成剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);
  })

  // 获取状态
  var state = '';
  $('#temporary').click(function () {
    state = '草稿';
  })
  $('#release').click(function () {
    state = '已发布';
  })
  // 发布文章
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    // 接口要求数据格式是formdata
    var data = new FormData(this);
    data.append('state', state);

    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    }).toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      data.append('cover_img', blob);
      $.ajax({
        type: "POST",
        url: '/my/article/add',
        data: data,
        success: function (res) {
          layer.msg(res.message);
          if (res.status === 0) {
            location.href = "/article/article-list.html"
          }
        },
        contentType: false,
        processData: false
      })
    })
  })

})