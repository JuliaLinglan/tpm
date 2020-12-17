<template>
    <div>
        <!--        <div class="login-left">-->
        <!--        </div>-->
        <el-card class="login-form">
            <el-form
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm">
                <h2 class="login-title">欢迎登录</h2>
                <el-form-item prop="username">
                    <el-input name="username"
                              type="text"
                              @keyup.enter.native="handleLogin"
                              v-model="loginForm.username"
                              placeholder="用户名">
                  <span slot="prefix">
                    <svg-icon icon-class="user" class="color-main"></svg-icon>
                  </span>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" style="position: relative;">
                    <el-input name="password"
                              :type="pwdType"
                              @keyup.enter.native="handleLogin"
                              v-model="loginForm.password"
                              placeholder="密码">
                  <span slot="prefix">
                    <svg-icon icon-class="password" class="color-main"></svg-icon>
                  </span>
                        <span slot="suffix" @click="showPwd">
                    <svg-icon v-if="pwdType == 'password'" icon-class="eye" class="color-main"
                              style="cursor:pointer;"></svg-icon>
                    <svg-icon v-if="pwdType == ''" icon-class="eye-open" class="color-main"
                              style="cursor:pointer;"></svg-icon>
                  </span>
                    </el-input>
                    <span
                        style="font-size: 12px; margin: 0; position: absolute; left: 0; top: 35px; color: red">{{ this.errorText }}</span>
                </el-form-item>

                <el-form-item style="margin-bottom: 0">
                    <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item style="margin-bottom: 0">
                    <el-button size="medium" type="primary" class="btn-signin" @click="handleLogin"
                               :loading="loginLoading">登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: "login",
    data() {
        const validateUsername = (rule, value, callback) => {
            callback()
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 4) {
                callback(new Error('Password length longer than 4'))
            } else {
                callback()
            }
        };
        return {
            loginForm: {
                username: '',
                password: '',
                rememberMe: false,
            },
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePass}]
            },
            pwdType: 'password',
            loginLoading: false,
            errorText: '',
        }
    },
    // created() {
    //     let loginName = Cookies.get('loginName')
    //     let loginPass = Cookies.get('loginPass')
    //     this.loginForm.username = loginName
    //     this.loginForm.password = loginPass
    // },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },

        handleLogin() {
            this.errorText = ''
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loginLoading = true
                    this.$store.dispatch('user/Login', this.loginForm).then(res => {
                        // if (this.loginForm.rememberMe) {
                        //     Cookies.set('loginName', this.loginForm.username, {expires: 7})
                        //     Cookies.set('loginPass', this.loginForm.password, {expires: 7})
                        // }
                        let redirect = this.$route.query.redirect
                        console.log("redirect", redirect)
                        //此处的redirect事若用户之前在某个页面，重新登录后就跳转到这个redirect页面
                        if (redirect) {
                            this.$router.push(redirect)
                        } else {
                            this.$router.push('/department')
                        }
                    }).catch((err) => {
                        this.loginLoading = false
                        console.log("err:   " + err)
                        this.errorText = "登录失败"
                        // this.$message.error("登录失败");
                    })
                } else {
                    console.log('参数验证不合法！');
                    this.$message.error("登录失败");
                }
            })
        },
    }
}
</script>

<style lang="scss">
.login-left {
    background-size: cover;
    display: flex;
    position: relative;
    width: 100%;
    min-width: 1000px;
    height: 100%;
    min-height: 600px;
    overflow: hidden;

    background: url("../../../public/static/images/bg.png") center center no-repeat;


}

.login-form {
    position: absolute;
    left: 65%;
    top: 100px;
    width: 410px;
    z-index: 1000;
    background-color: white;
    padding: 20px;
    padding-bottom: 10px;
    transition: .3s;
    border: 1px solid rgba(90, 93, 99, 0.2)
}

/*@media (min-width: 1600px) {*/
/*    .login-form {*/
/*        position: absolute;*/
/*        left: 60%;*/
/*        top: 150px;*/
/*        width: 400px;*/
/*        height: 300px;*/
/*        z-index: 1000;*/
/*        background-color: white;*/
/*        padding: 20px;*/
/*        padding-bottom: 10px;*/
/*        transition: .3s;*/
/*        border: 1px solid rgba(90, 93, 99, 0.2);*/
/*        border-radius: 5px*/
/*    }*/
/*}*/

.btn-signin {
    width: 100%;
    margin-top: 10px;
    background: linear-gradient(90deg, rgba(64, 169, 255, 1) 0%, rgba(24, 144, 255, 1) 100%);
    border-width: 0;
}

.login-title {
    text-align: center;
    margin-top: 0;
    color: rgba(0, 0, 0, 0.65);
}

.about h2 {
    font-size: 2rem;
}

.about p {
    color: #666;
    font-size: 1.2rem;
}

.about .image {
    border-radius: 0;
    margin: 2rem auto;
    width: 10rem;
}
</style>
