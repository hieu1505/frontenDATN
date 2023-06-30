import React from "react";
import * as yup from 'yup';
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authApi from "../api/authApi";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form';
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const Register = () => {
    const navigate = useNavigate()
    const schema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required('Vui lòng nhập số điện thoại')
            .matches(phoneRegExp, 'Vui lòng nhập số điện thoại')
            .min(10, 'Số điện thoại không hợp lệ')
            .max(10, 'Số điện thoại không hợp lệ'),
        name: yup.string().required('Vui lòng nhập họ va ten'),

        email: yup
            .string()
            .required('Vui lòng nhập Email')
            .email('Email không hợp lệ'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        birthday: yup.string().required('Vui lòng nhập ngày sinh'),
        passwordConfirm: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    })
    const form = useForm({
        defaultValues: {
            phoneNumber: '',
            email: '',
            name: '',
            gender: '',
            birthday: '',
            password: '',
            passwordConfirm: '',
            address: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmitForm = value => {
        console.log(value)
        const valueSubmit = { ...value }
        valueSubmit.gender = valueSubmit.gender === '1' ? 1 : 0
        delete valueSubmit.passwordConfirm
        const formData = new FormData()
        for (let key in valueSubmit) {
            formData.append(key, valueSubmit[key])
        }
       
        (async () => {
            try {
                const data = await authApi.signup(formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                console.log(data)
                toast.success('Đăng ký thành công, mời bạn vào mail để xác nhận', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                navigate('/login')
            } catch (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
            
        })()
    }
    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <h3 className="text-4xl font-bold text-purple-600">
                        Register
                    </h3>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                        <InputField name="name"
                            label='FullName,'
                            type="input"
                            form={form}
                            placeholder="" />
                        <InputField name="address"
                            label='Address,'
                            type="input"
                            form={form}
                            placeholder="" />
                        <InputField name="phoneNumber"
                            label='phoneNumber,'
                            type="input"
                            form={form}
                            placeholder="" />
                        <InputField name="birthday"
                            label='Birthday,'
                            type="date"
                            form={form}
                            placeholder="" />
                      
                        <RadioGroup
                            title="Gender"
                            name="gender"
                            form={form}
                            mode="gender"
                            optionData={[
                                { label: ' Male', value: Number(1) },
                                { label: 'Female', value: Number(0) }
                            ]}
                        />
                        <InputField name="email"
                            label='Email,'
                            type="input"
                            form={form}
                            placeholder="" />
                        <InputField name="password"
                            label='Password,'
                            type="password"
                            form={form}
                            placeholder="" />
                        <InputField name="passwordConfirm"
                            label='PasswordConfirm,'
                            type="password"
                            form={form}
                            placeholder="" />
                        <div className="flex items-center mt-4">
                            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-purple-600 hover:underline" href="/login">
                                Log in
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>)
}
export default Register
function InputField({
    name,
    type = 'input',
    form,
    placeholder,
    icon,
    label,
    disabled
}) {
    const {
        formState: { errors }
    } = form
    const err = errors[name]
    return (<>
        <div >
            <label
                htmlFor="password_confirmation"
                className=" block text-sm font-medium text-gray-700 undefined"
            >
                {label}
            </label>
            <Controller
                name={name}
                control={form.control}
                render={({
                    field: { onChange, onBlur, name }
                }) => (
                    <input className='text-2xl block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        formNoValidate
                        id={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={form.getValues(name)}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}

                    />

                )}
            />
            <span className="">
                {err && err.message}
            </span>
        </div>
    </>)
}
function RadioGroup({ title, form, name, optionData, disabled, mode }) {
    return (
        <div >
            <label className="block text-sm font-medium text-gray-700 undefined">{title}</label>
            <div className={`${mode === 'gender' ? 'list-gender ' : ''}radio-group__list`}>
                {form && optionData.map((item, index) => (<>
                    <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="radio"
                            value={item.value}
                            disabled = {disabled}
                            {...form.register(name)}
                        />
                    <label key={index} className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500 me-10">
                        {item.label}

                    </label>
                </>
                ))}
                {!form && optionData.map((item, index) => (
                    <>
                      <input className="w-4 ms-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="radio"
                            value={item.value}
                            disabled={disabled}
                        />
                    <label key={index} className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      
                        {item.label}
                    </label>
                    </>
                ))}
            </div>
        </div>
    )
}