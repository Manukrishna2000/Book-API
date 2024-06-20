import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate=useNavigate()
    const [data,setData]=useState('')
    let handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let handleSubmit=async (e)=>{
      e.preventDefault()
        let response=await axios.post('http://localhost:4000/register',data)
        navigate('/login')
    }
  return (
    <div className='bg-gray-500 p-10 shadow-xl w-[50%] m-auto mt-14'>
      <div className='w-fit m-auto text-[30px] text-white font-bold mb-4'>Register</div>
      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='username' required className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} name="username" id="" />
        <input type="text" placeholder='password' required className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} name="password" id="" />
        <button className='rounded-lg hover:bg-slate-100 hover:text-black bg-black text-white w-[100%] mb-5 p-2 mt-2' >Register</button>
      </form>
      <Link to='/login'>  <button className='rounded-lg hover:bg-slate-100 hover:text-black bg-black p-2 mt-2 text-white w-[100%]'>Login</button></Link>
    </div>
  )
}

export default Register