<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{ 'current': item.current }" @click="toggleMenu(item)">{{ item.txt }}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="11">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>





<script>
// import引入过滤特殊字符和正则函数
import { stripscript, validateEmail, validatePass, validateVCode } from '@/utils/validate';

export default {
    // 名称
    name: 'login',
    // 数据
    data() {
        // element组件-start
        // 验证用户名
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else if (!validateEmail(value)) {
            callback(new Error('用户名格式有误'));
            } else {
            callback();// 验证成功返回true
            }
        };
        // 验证密码
        var validatePassword = (rule, value, callback) => {
            // 把过滤后的值赋给密码的绑定数据
            this.ruleForm.password = stripscript(value);
            // 再把密码的绑定数据的值赋给当前函数的value
            value = this.ruleForm.password;
            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (!validatePass(value)) {
            callback(new Error('密码格式有误，请输入6-20位数字+字母组合'));
            } else {
            callback();
            }
        };
        // 验证重复密码
        var validatePasswords = (rule, value, callback) => {
            // 判断当前模块值(绑定v-show属性，控制重复密码模块显示隐藏)
            // 如果是登录状态则不需要提交直接通过
            if (this.model === 'login') {
                callback();
            }
            // 把过滤后的值赋给重复密码的绑定数据
            this.ruleForm.passwords = stripscript(value);
            // 再把重复密码的绑定数据的值赋给当前函数的value
            value = this.ruleForm.passwords;
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value != this.ruleForm.password) {
            callback(new Error('重复密码不正确'));
            } else {
            callback();
            }
        };
        // 校验验证码
        var validateCode = (rule, value, callback) => {
            // // 把过滤后的值赋给验证码的绑定数据
            // this.ruleForm.code = stripscript(value);
            // // 再把验证码的绑定数据的值赋给当前函数的value
            // value = this.ruleForm.code;
            if (value === '') {
            callback(new Error('请输入验证码'));
            } else if (!validateVCode(value)) {
            callback(new Error('验证码格式有误'));
            } else {
            callback();
            }
        };
        // element组件-end
        return{
            // 绑定数据
            menuTab:[
                { txt: "登录", current: true, type: 'login' },
                { txt: "注册", current: false, type: 'register' }
            ],
            // 模块值(绑定v-show属性，控制重复密码模块显示隐藏)
            model: 'login',
            // element组件-start
            ruleForm: {
                username: '',
                password: '',
                // 重复密码
                passwords: '',
                code: ''
                },
                rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
            // element组件-end
        }
    },
    // 创建完成后执行函数（回调函数）
    created(){},
    // 挂载
    mounted(){},
    // 函数
    methods:{
        // 点击事件-高光
        toggleMenu(data){
            // 循环清除所有高光
            this.menuTab.forEach(elem => {
                elem.current = false;
            });
            // 设置点击元素高光
            data.current = true;
            // 修改模块值(绑定v-show属性，控制重复密码模块显示隐藏)
            this.model = data.type;
        },
        // element组件-start
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
        // element组件-end
    }
}
</script>





<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
    .login-wrap{
        width: 330px;
        margin: auto;
        .menu-tab{
            text-align: center;
            li{
                display: inline-block;
                width: 88px;
                line-height: 36px;
                font-size: 14px;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
            .current{
                background-color: rgba(0,0,0,.1);
            }
        }
        .login-form {
            margin-top: 29px;
            label {
                display: block;
                margin-bottom: 3px;
                color: #fff;
                font-size: 14px;
            }
            .item-form {
                margin-bottom: 13px;
            }
            .block {
                display: block;
                width: 100%;
            }
            .login-btn {
                margin-top: 19px;
            }
        }
    }
}
</style>