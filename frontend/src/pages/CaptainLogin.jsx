import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainLogin = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        const response = await axios.post('', {
            email,
            password
        })

        if (response.status === 200) {
            const data = response.data;

            localStorage.setItem('token', data.token)
            navigate('/home');
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className='h-screen flex flex-col justify-between p-7'>
            <div>
                <img src="https://pngimg.com/uploads/uber/uber_PNG24.png" className='w-20 ' />
                <form className='mt-10' onSubmit={(e) => submitHandler(e)}>
                    <div className='font-medium mb-2 text-lg'>What's your email</div>

                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' className='bg-[#eeeeee] py-2.5 mb-7 w-full border rounded-lg px-4 placeholder:text-base' />

                    <div className='font-medium mb-2 text-lg'>Enter Password</div>

                    <input required type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' />

                    <button type='submit' className='w-full bg-[#111] text-white e px-4 py-2 rounded-lg text-lg mb-3 font-semibold '>Login</button>
                </form>
                <p>Join as Captain? <Link to='/captain-signup' className='text-blue-600 underline'>Create new Account</Link> </p>
            </div>
            <div>
                <Link to='/user-login' className="bg-[#11c6e6] inline-flex w-full justify-center rounded px-4 py-2 text-white font-semibold mb-5 text-lg">Sign in as User
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 mt-2 ml-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin