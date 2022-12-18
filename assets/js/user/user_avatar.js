$(function () {
  // ^ 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // ^ 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // ^  为上传按钮绑定 file 文件 时间
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })
  // ^ 绑定 layer
  let layer = layui.layer
  // ^  为预览试图改变显示图片
  $('#file').on('change', function (e) {
    let fileList = e.target.files
    if (fileList.length === 0) {
      return layer.msg('请选择照片！')
    }
    // & 更换裁剪的图片
    // 1、 拿到用户选择的文件
    let file = e.target.files[0]
    // 2、根据选择的文件，创建一个对应的 URL 地址：
    let imgURL = URL.createObjectURL(file)
    //3、 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // ^ 为确定按钮 绑定事件   将用户选择好的图片上传至服务器
  $('#btnUpload').on('click', function () {
    // 1、获取到裁剪好的图片
    let dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2、将图片上传服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        // & 调用index.js 中的 getUserInfo() 渲染头像
        window.parent.getUserInfo()
      },
    })
  })
})
