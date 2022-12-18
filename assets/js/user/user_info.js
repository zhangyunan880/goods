$(function () {
  let form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });

  initUserInfo();

  // ^ 定义 layer
  let layer = layui.layer;
  // ^ 获取用户基本信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        console.log(res);
        // & 利用 form.val() 快速为表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  }

  // ^ 表单的重置功能
  $("#btnReset").on("click", function (e) {
    // & 阻止表单的默认重置行为
    e.preventDefault();
    initUserInfo();
  });

  // ^ 向服务器提交修改之后的表单数据
  $(".layui-form").on("submit", function (e) {
    // & 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败！");
        }
        layer.msg("修改用户信息成功！");
        // & 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo();
      },
    });
  });
});
