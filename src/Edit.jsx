import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
    const [data,setData]=useState('')
    let {id}=useParams()
    let navigate=useNavigate()
    useEffect(()=>{
        let fetchData=async()=>{
            let response=await axios.get(`http://localhost:4000/findOneBook/${id}`)
            setData(response.data)
        }
        fetchData()
    },[])
    let handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let handleSubmit=async ()=>{
        let response=await axios.put(`http://localhost:4000/updateBook/${id}`,data)
        navigate('/user/addBook')

    }
  return (
    <div className='bg-slate-500 p-5'>
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' placeholder={data.name} onChange={handleChange} name="name" id="" />
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' placeholder={data.author} onChange={handleChange} name="author" id="" />
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' placeholder={data.description} onChange={handleChange} name="description" id="" />
        <button className='rounded-lg bg-black text-white w-[100%]' onClick={handleSubmit}>Update</button>
    </div>
  )
}

export default EditBook