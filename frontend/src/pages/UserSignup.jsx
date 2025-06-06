import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        const response = await axios.post('', {
            fullname: {
                firstname,
                lastname
            },
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
        setFirstname('');
        setLastname('');
    }

    return (
        <div className='h-screen flex flex-col justify-between p-7'>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className='w-20 ' />
                <form className='mt-10' onSubmit={(e) => submitHandler(e)}>
                    <div className='font-medium mb-2 text-lg'>What's your name</div>
                    <div className='flex gap-4 mb-5'>
                        <input required type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder='First Name' className='bg-[#eeeeee] py-2.5 w-full border rounded-lg px-4 placeholder:text-base' />

                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Last Name' className='bg-[#eeeeee] py-2.5  w-full border rounded-lg px-4 placeholder:text-base' />
                    </div>

                    <div className='font-medium mb-2 text-lg'>What's your email</div>

                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' className='bg-[#eeeeee] py-2.5 mb-5 w-full border rounded-lg px-4 placeholder:text-base' />

                    <div className='font-medium mb-2 text-lg'>Enter Password</div>

                    <input required type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' />

                    <button type='submit' className='w-full bg-[#111] text-white e px-4 py-2 rounded-lg text-lg mb-3 font-semibold '>Login</button>
                </form>
                <p>Already have a User? <Link to='/user-login' className='text-blue-600 underline'>Login here</Link> </p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}

export default UserSignup