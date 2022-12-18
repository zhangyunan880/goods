$(function () {
  let form = layui.form
  // ^ 表单的校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samepwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    repwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次输入的密码不一致！'
      }
    },
  })

  // ^ 表单的提交行为
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('修改密码失败！')
        }
        layui.layer.msg('修改密码成功！')
        // & 重置表单   需要用到原生 DOM 中的 reset() 方法
        $('.layui-form')[0].reset()
      },
    })
  })
})
