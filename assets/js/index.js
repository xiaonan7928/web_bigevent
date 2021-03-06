 $(function() {

     // 调用 getUserInfo() 获取用户基本信息
     getUserInfo()



     var layer = layui.layer
         //  点击按钮  实现退出功能
     $('#btnLogout').click(function() {
         //  提示用户是否确认退出
         layer.confirm('确认退出登录?', { icon: 3, title: '提示' },
             function(index) {
                 //do something

                 //  1、清空本地存储的token
                 localStorage.removeItem('token')
                     // 2、跳转到登录页面
                 location.href = '/login.html'


                 // 关闭confirm询问框
                 layer.close(index);
             });
     })
 })



 //  定义一个方法 获取用户信息
 function getUserInfo() {
     $.ajax({
         method: 'GET',
         url: '/my/userinfo',
         //  headers就是请求头配置对象
         //  headers: {
         //      Authorization: localStorage.getItem('token') || ''
         //  },
         success: function(res) {
             if (res.status !== 0) {
                 return layui.layer.msg('获取信息失败！')
             }
             //  调用renderAvatar 渲染用户头像
             renderAvatar(res.data)
         },

         //  不论成功还是失败，最终都会调用complete回调函数
         //  complete: function(res) {
         //  //  console.log('执行complete回调');
         //  //  console.log(res);

         //  // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
         //  if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
         //      //  强制清空token
         //      localStorage.removeItem('token')
         //          //  跳转到登录页面
         //      location.href = '/login.html'
         //  }

         //  }
     })

 }

 //  渲染用户头像
 function renderAvatar(user) {
     var name = user.nickname || user.username
     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
     if (user.user_pic !== null) {
         $('.layui-nav-img').attr('src', user.user_pic).show()
         $('.text-avatar').hide()
     } else {
         $('.layui-nav-img').hide()
         var first = name[0].toUpperCase()
         $('.text-avatar').html(first).show()

     }
 }