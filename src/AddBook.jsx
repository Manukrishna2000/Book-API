import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AddBook = () => {
    const [data,setData]=useState('')
    let handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let handleSubmit=async (e)=>{
      e.preventDefault()
        let response=await axios.post('http://localhost:4000/addBook',data)
      setRefresh(!refresh)

    }
    const [book,setBooks]=useState([''])
    const [refresh,setRefresh]=useState(false)
    let token=localStorage.getItem('token')
  useEffect(()=>{
    let fetchData=async()=>{
        let response=await axios.get('http://localhost:4000/viewBook',{
            headers:{
                Authorization:token
            }
        })  
        setBooks(response.data)
    }
    fetchData()
  },[refresh])

  let handleDelete=async(id)=>{
    let response=await axios.delete(`http://localhost:4000/deleteBook/${id}`)
    setRefresh(!refresh)  
}
  return (
    <>
    <div className='bg-slate-500 p-5'>
      <form onSubmit={handleSubmit}>
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} required name="name" placeholder='name' id="" />
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} required name="author" placeholder='author' id="" />
        <input type="text" className='w-[100%] p-2 border mb-5 rounded-lg' onChange={handleChange} required name="description" placeholder='description' id="" />
        <button className='rounded-lg bg-black text-white w-[100%]' >Add</button>
      </form>
    </div>
    <div className='flex gap-4 text-[20px] flex-wrap'>
    {book.map((item)=>(
        <div className='bg-gray-200 mt-6 w-[30%] p-4'>
            <div>
              <span className='font-bold'>  {item.name}</span>
            </div>
            <div>
               <span>By </span> {item.author}
            </div>
            <div>
                {item.description}
            </div>
            <button className='rounded-lg bg-black text-white w-[100%] mb-5 mt-5' onClick={()=>handleDelete(item._id)}>delete</button>
            <Link to={`/user/edit/${item._id}`}><button className='rounded-lg bg-black text-white w-[100%]'>edit</button></Link>
        </div>
    ))}
    </div>
    </>
  )
}

export default AddBook