import React from 'react';
import * as yup from 'yup';
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import accountApi from '../api/accountApi';
function ChangePassword() {
    const schema = yup.object().shape({
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        newPassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu')

    })
    const form = useForm({
        defaultValues: {
            password: '',
            newPassword: ''
        },
        resolver: yupResolver(schema)

    })
    const handleSubmitForm = value => {
        (async () => {
            try {
                const authenticated = localStorage.getItem('access_token')
            const accountid = jwt(authenticated).id
               const data= accountApi.changepassword(accountid,value,{
                    headers: {
                        
                        Authorization: authenticated
                    }
                })
              console.log(data)
              if(data.erroCode==='0'){
                toast.success('thay doi thành công', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
              }
              else{
                toast.error(data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
              }
            } catch (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })()
     }
    return (
        <section className="pt-2 bg-blueGray-50 flex-1">
            <div className="w-full lg:w-5/12 px-2 mx-auto my-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-10">
                        <div className="flex flex-wrap ">
                            <h1 className="text-2xl">ChangePassword</h1>
                            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                                <div className="w-full px-4  mt-10 me-10">
                                    <InputField name="password"
                                        label='password,'
                                        type="password"
                                        form={form}
                                        placeholder="" />
                                    <InputField name="newPassword"
                                        label='newPassword,'
                                        type="password"
                                        form={form}
                                        placeholder="" />
                                    <div className="flex items-center mt-4 p-4">
                                        <button type="submit" className="w-50 px-3 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                            Send
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ChangePassword
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
                    <input className='text-2xl block w-full mt-5 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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