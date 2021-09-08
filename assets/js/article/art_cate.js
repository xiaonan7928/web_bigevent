$(function() {

    var layer = layui.layer
    var form = layui.form

    // 调用
    iniArtCateList()
        // 获取文章分类的列表
    function iniArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                // 导入了template模板引擎 这里就可以调用
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 未添加按钮绑定点击事件

    var indexAdd = null

    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl-add').html()
        })

    })

    // 通过代理的方式为form—add绑定submit事件 （应为form-add是动态创建的，不是一开始就在页面中的）
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
            // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                iniArtCateList()
                layer.msg('新增分类成功！')

                // 新增分类成功后自动关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理的方式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function(e) {
        // console.log('ok');
        // 弹出一个修改文章分类的层
        // 定义indexEdit是是为拿到弹出层的索引 最后好做自动关闭效果
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        console.log(id);
        // 发起请求 获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })

    })


    // 通过代理的方式 为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                iniArtCateList()

            }
        })

    })



    // 通过代理的方式 为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        // console.log('ok');
        // 获取当前按钮的id属性
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 用户确定删除后 发起ajax请求 完成删除工作
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    iniArtCateList()
                }
            })

        });

    })





})