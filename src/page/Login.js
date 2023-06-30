import React from "react";
import { useState } from "react";
import * as yup from 'yup';
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify';
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";




function Login() {
  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập Email')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(5, 'Mật khẩu 5 - 15 kí tự')
      .max(15, 'Mật khẩu 5 - 15 kí tự')
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })
  //
  const handleSubmitForm = async value => {
    try {
      console.log('falsflas')
      const data = await authApi.login(value)
      console.log(data)
      if(data?.errCode==0){
        localStorage.setItem('access_token', data.accessToken)
        console.log(data.accessToken)
        const account = jwt(data.accessToken)
        console.log(account)
        if (account.role_name!=='center') return navigate('/admin')
        else navigate('/center')
      toast.success('Đăng nhập thành công', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000
        })
      }
      else{
        toast.error('login fail ', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000})
      }
    }
        
    
     catch (err) {
      toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT
      })
     
    }
  }

  return (<div className=" justify-center flex items-center h-screen" >
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full  md:w-1/3 items-center max-w-5xl transition duration-1000 ease-out ">
      <h2 className='p-10 text-5xl font-bold text-blue-400'>Login</h2>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <div className='flex flex-col items-center justify-center p-3 w-150'>


          <InputField name="email"
            type="input"
            form={form}
            placeholder="Email" />
          <InputField

            name="password"
            type="password"
            form={form}
            placeholder="Password"
          />
          <a
            href="/forgetPassword"
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </a>
          <button type="submit" className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
            Login
          </button>

        </div>
      </form>
      <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
      <a href="/register"><p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' >Create a New Account?</p></a>
    </div>
  </div>);
}

export default Login;
function InputField({
  name,
  type = 'input',
  form,
  placeholder,
  icon,
  disabled
}) {
  const {
    formState: { errors }
  } = form
  const err = errors[name]
  return (<>

    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, name }
      }) => (
        <input className='rounded-2xl px-9 py-2 my-3 w-4/5 md:w-full border-[1px]  border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
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
  </>)
}
