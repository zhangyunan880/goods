$(function () {
  // ^ 获取用户信息
  getUserInfo();

  // ^ 获取 layUI
  let layer = layui.layer;
  // ^ 退出按钮模块
  $("#btnLogout").on("click", function () {
    layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "提示" },
      function (index) {
        // & 1、清空本地存储的token
        localStorage.removeItem("token");
        // & 2、跳转到登陆界面
        location.href = "/login.html";
        // & 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

//^ 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // //& headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      //& 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);
    },
    // &不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //    &在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    // 1. 强制清空 token
    //     localStorage.removeItem('token')
    // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // },
  });
}

//^ 渲染用户的头像
function renderAvatar(user) {
  // & 1、设置文本头像
  let uname = user.nickname || user.username;
  // & 2、设置欢迎文本
  $("#welcome").html(`欢迎  ${uname}`);
  // & 3、按需渲染头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let first = uname[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
