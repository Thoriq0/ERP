import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LoginLayout from '@/Layouts/LoginLayout';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from "react";

export default function Login({error, status, canResetPassword}) {
    
    const [showPassword, setShowPassword] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <LoginLayout>
            <Head title="Log in" />

            {/* {error && (
                <div className="mb-4 text-sm font-medium text-red-600 bg-red-100 p-3 rounded">
                    {error}
                </div>
            )} */}

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <h2 className="text-3xl font-bold text-white mb-4 text-center">LOGIN</h2>
            <p className='text-white text-sm my-4 text-center'>Selamat Datang Di Sistem ERP PT Global Edutek Solusindo</p>

            <form onSubmit={submit}>
                <div className='mt-10'>
                    <InputLabel htmlFor="email"/>
                    <div className='relative block'>
                        <FaUser className=" absolute top-3 left-6 text-primaryPurple" />
                    </div>
                    
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="input your username"
                        value={data.email}
                        className="mt-1 block w-full pl-16"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="my-10">
                    <InputLabel htmlFor="password"  />

                    <div className="relative">
                        <FaLock className="absolute top-3 left-6 text-primaryPurple" />
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Input your password"
                            value={data.password}
                            className="mt-1 block w-full pl-16 pr-12"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-3 right-6 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye className='text-primaryPurple' /> : <FaEyeSlash className='text-primaryPurple'/> }
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex flex-col justify-between lg:flex-row">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-white dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                    {/* <div className='mt-3 lg:mt-0'>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-white underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )} 
                    </div> */}
                </div>
                <div className='h-px bg-white my-3'></div>           

                <div className="mt-4 flex flex-col items-center justify-end">
                    <PrimaryButton className="m-5" disabled={processing}>
                        Login
                    </PrimaryButton>
                    {/* <p className='text-white'>Don't have an account?   
                        <Link
                            href={route('register')}
                            className="rounded-md text-sm ml-2 text-white underline"
                        >
                            Sign Up
                        </Link>
                    </p> */}
                </div>
            </form>
        </LoginLayout>
    );
}
