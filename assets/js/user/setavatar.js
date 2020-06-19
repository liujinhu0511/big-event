$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')

  // 1.2 配置选项
  const options = {
    // 宽高比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传注册点击事件
  $('#upload').on('click', function () {
    $('#file').click();
  })

  // 文件域改变，更换剪裁区的土拍你
  $('#file').change(function () {
    // 1.找到已选择的图片，
    var fileObj = this.files[0];
    // 2.生成一个临时的URL 通过createObjectURL方法
    var url = URL.createObjectURL(fileObj);
    // 3.更换剪裁区的图片
    //    3.1 销毁剪裁区
    //    3.2 更换图片
    //    3.3 重新生成剪裁区
    $image.cropper('destroy').attr('src', url).cropper(options);
  })

  // 点击确定，发送请求
  $('#sure').on('click', function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: "POST",
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          window.parent.getUserInfo();
        }
      }
    })
  })
})