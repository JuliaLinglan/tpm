import {checkParam} from "../api/register";

export const validateEmail = (rule, value, callback) => {
    const mailReg = /^([^])+@([^])+(.[^])+/
    if (!mailReg.test(value)) {
        return callback(new Error('Please input an email address.'))
    }
    checkParam({email: value}).then(res=>{
        if (res.data.result.emailExist) {
            return callback(new Error('This email has been used.'))
        } else {
            return callback()
        }
    }).catch(()=>{
        return callback()
    })
}
export const validateUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('Username cannot be empty.'))
    }
    if (value.length < 4 || value.length > 20) {
        return callback(new Error('Username needs to be 4-20 characters.'))
    }
    checkParam({username: value}).then(res=>{
        if (res.data.result.usernameExist) {
            return callback(new Error('This username has been used.'))
        } else {
            return callback()
        }
    }).catch(()=>{
        return callback()
    })
}

export const validatePassword = [
    {required: true, trigger: 'blur'},
    { min: 4, max: 20, message: 'Password needs to be 4-20 characters.', trigger: 'blur' },
]