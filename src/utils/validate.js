// exprot暴露方法(因为vue里不添加这个关键字该函数是无法被引用的)
export function stripscript(str) {
    /* 
    * 过滤特殊字符
    */
    var pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// exprot暴露方法(因为vue里不添加这个关键字该函数是无法被引用的)
export function validateEmail(value) {
    // 验证邮箱正则模板
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? false : true;
}

// exprot暴露方法(因为vue里不添加这个关键字该函数是无法被引用的)
export function validatePass(value) {
    // 验证密码正则模板
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? false : true;
}

// exprot暴露方法(因为vue里不添加这个关键字该函数是无法被引用的)
export function validateVCode(value) {
    // 验证码正则模板
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? false : true;
}