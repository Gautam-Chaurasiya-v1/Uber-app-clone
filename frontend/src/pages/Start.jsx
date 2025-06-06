import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div className=''>
            <div className='h-screen w-full bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] [background-position:20%-25px] pt-7 flex flex-col justify-between'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className='w-20 ml-7' />
                <div className='bg-white flex flex-col items-center h-[24%] pl-4 pr-4 '>
                    <h2 className='font-bold text-3xl w-full mt-4' > Get started with Uber</h2>
                    <Link to='/user-login' className='bg-black text-white w-full p-3 inline-flex justify-center rounded mt-4'>Continue
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 mt-1.5 ml-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Start