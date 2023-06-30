
import React, { useState, useEffect } from "react";
import * as yup from 'yup';
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import childrenApi from "../../api/childrenApi";

function UpdateChildren() {
    let { id } = useParams();
    const [children, setchildren] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const authenticated = localStorage.getItem('access_token')

                const data = await childrenApi.getchildrenbyid(id, {
                    headers: {
                        Authorization: authenticated
                    }

                })
                console.log(data)
                setchildren(data.message)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập họ va ten'),
    })
    const form = useForm({
        defaultValues: {
            image: '',
            status: '',
            gender: '',
            name: '',
            JoinDate: '',
            age: ''
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        form.setValue('image', children.personalPicture)
        form.setValue('status', children.status)
        form.setValue('name', children.name)
        form.setValue('age', children.age)
        form.setValue('JoinDate', children.JoinDate?.split('T')[0])
        form.setValue('gender', children.gender=== true ? '1' : '0')

    }, [children, form])


    const handleSubmitForm = value => {
        (async () => {
            try {
                const authenticated = localStorage.getItem('access_token')
                console.log(value)
                const data = await childrenApi.upoload(id, value, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: authenticated
                    }
                })
                console.log(data.message)

                 
            } catch (err) {
                console.log(err)
            }
        })()
    }
    return (
        <section className="pt-2 bg-blueGray-50 flex-1">
            <div className="w-full lg:w-8/12 px-2 mx-auto my-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">

                    <div className="px-6">
                        <div className="flex flex-wrap justify-center flex-col">
                            <h1 className="text-3xl">upload Childrent</h1>
                            <form onSubmit={form.handleSubmit(handleSubmitForm)}>

                                <PreviewUploadImg form={form} name="image" />
                                <div className="w-full px-4  mt-10 me-10">

                                    <InputField name="name"
                                        label='Name'
                                        type="input"
                                        form={form}
                                        placeholder="" />

                                    <InputField name="status"
                                        label='Status'
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
                                    <InputField name="JoinDate"
                                        label='JoinDate'
                                        type="date"
                                        form={form}
                                        placeholder="" />
                                    <InputField name="age"
                                        label='Age'
                                        type="input"
                                        form={form}
                                        placeholder="" />
                                    <div className="flex items-center mt-4 p-4">
                                        <button type="submit" className="w-50 px-3 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                            Update
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
export default UpdateChildren
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
                {!previewSource && form.getValues('image') !== '' && <img alt="img" src={form.getValues('image')} className="h-[300px] w-[300px] " />}
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