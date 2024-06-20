import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [data,setData]=useState('')
    let handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

        
      }
      let navigate=useNavigate()
    let handleSubmit=async (e)=>{
      e.preventDefault()
      try{

       
        
        let response=await axios.post('http://localhost:4000/login',data)
        console.log(response);
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('id',response.data.users._id)
        navigate('/user/addBook')
      }
      catch(e){
        console.log(e.message);
      }


    }
  return (
    <div className='bg-gray-500 p-10 shadow-xl w-[50%] m-auto mt-14 '>
      <form onSubmit={handleSubmit}>

      <div>

        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} name="username" placeholder='username' required id="" />
      </div>
      <div>

        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} name="password" placeholder='password' required id="" />
      </div>
        <button className='rounded-lg bg-black text-white w-[100%] mb-5 p-2' >Login</button>
      </form>
       <Link to='/'> <button className='rounded-lg bg-black p-2 text-white w-[100%]' >Register</button></Link>
    </div>
  )
}

export default Login