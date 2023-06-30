
import React, { useState } from "react";
import * as yup from 'yup';
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import accountApi from "../../api/accountApi";
import { useNavigate,useLocation } from "react-router-dom";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

function CreateAccount() {
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
            image: '',
            phoneNumber: '',
            email: '',
            name: '',
            gender: '',
            birthday: '',
            password: '',
            passwordConfirm: '',
            address: '',
           
        },
        resolver: yupResolver(schema)
    })

    const handleSubmitForm = value => { 
        value.gender = value.gender === '1' ? 1 : 0;
        //  
         (async () => {
            try {
                console.log(value)
                const authenticated = localStorage.getItem('access_token')
               const data= await accountApi.CreateAccount(value,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: authenticated
                    }
                })
             navigate('/admin/listAccount')
            } catch (err) {
                console.log(err)
            }
        })()
    }
    return (
        <section className="pt-2 bg-blueGray-50 flex-1">
            <div className="w-full lg:w-6/12 px-2 mx-auto my-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">

                    <div className="px-6">
                        <div className="flex flex-col justify-center ">
                            <h1 className="text-2xl">Create Account</h1>
                            <form onSubmit={form.handleSubmit(handleSubmitForm)}>

                                <PreviewUploadImg form={form} name="image" />
                                <div className="w-full px-4  mt-10 me-10">

                                    <InputField name="name"
                                        label='FullName,'
                                        type="input"
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
                                       

                                    <div className="flex items-center mt-4 p-4">
                                        <button type="submit" className="w-50 px-3 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                            Create
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
export default CreateAccount
function PreviewUploadImg({ form, name }) {
    const [fileInput, setFileInput] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const handleChangeImg = e => {
        const file = e.target.files[0]
        if (file) form.setValue(name, file)
        setFileInput(e.target.value)
        previewFile(file)
    }
    const previewFile = file => {
        if (!file)
            return
        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    return (
        <div className="w-100 px-4 flex justify-center flex-col">
            <div className="relative">
                {previewSource && <img alt="img" src={previewSource} className="h-15 w-15  " />}
                {!previewSource && form.getValues('image') !== '' && <img alt="img" src={form.getValues('image')} className="h-15 w-15  " />}
                {!previewSource && form.getValues('image') === '' && <img alt="img" src="https://via.placeholder.com/300" className="h-15 w-15  " />}
            </div>
            <div>
                <label
                    className="chooseImg__label"
                    htmlFor="chooseImg"
                >
                    Chọn ảnh
                </label>
                <input
                    id="chooseImg"
                    type="file"
                    onChange={handleChangeImg}
                    value={fileInput}
                    className="inputFile"
                />
            </div>

        </div>
    )
}

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
                        disabled={disabled}
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