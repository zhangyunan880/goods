$(function () {
  $("#link_reg").on("click", () => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", () => {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: (val) => {
      var pwd = $("#reg-form [name=password]").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });

  $("#reg-form").on("submit", (e) => {
    e.preventDefault();
    var data = {
      username: $("#reg-form [name=username]").val(),
      password: $("#reg-form [name=password").val(),
    };
    $.post("/api/reguser", data, (res) => {
      if (res.status != 0) return layer.msg(res.message);
      console.log(res);
    });
  });

  $("#login_form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "post",
      data: $("#login_form").serialize(),
      success: (res) => {
        console.log(res);
        console.log($(this).serialize());
        if (res.status !== 0) return layer.msg("登录失败");
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
