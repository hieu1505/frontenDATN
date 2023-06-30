import React,{useEffect} from "react";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form';
import accountApi from "../api/accountApi";
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const navigate=useNavigate()
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Vui lòng nhập Email')
            .email('Email không hợp lệ')
    })
    const form = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmitForm = value => {
        (async () => {
            try {
            const data =await accountApi.resetpassword(value)
            
                toast.success('Reset mật khẩu thành công, mời vào mail xem mật khẩu', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
                navigate('/login')
            }
            catch (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
            }
        })()
    }
    useEffect(() => {
        document.title = 'Forgot Password'
    }, [])
    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <h3 className="text-4xl font-bold text-purple-600">
                        ForgetPassword
                    </h3>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                    <InputField
                            label="Email"
                            name="email"
                            type="email"
                            form={form}
                            placeholder="Nhập địa chỉ Email"
                        />
                        <div className="flex items-center mt-4">
                            <button   type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Send
                            </button>
                        </div>
                    </form>
                    <a href="/register"><p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' >Create a New Account?</p></a>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword
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