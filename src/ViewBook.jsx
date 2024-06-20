import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewBook = () => {
    const [data,setData]=useState([''])
    const [refresh,setRefresh]=useState(false)
    let token=localStorage.getItem('token')
  useEffect(()=>{
    let fetchData=async()=>{
        let response=await axios.get('http://localhost:4000/viewBook',{
            headers:{
                Authorization:token
            }
        })  
        setData(response.data)
    }
    fetchData()
  },[refresh])

  let handleDelete=async(id)=>{
    let response=await axios.delete(`http://localhost:4000/deleteBook/${id}`)
    setRefresh(!refresh)  
}
  return (
    <div>
    {data.map((item)=>(
        <div>
            <div>
                {item.name}
            </div>
            <div>
                {item.author}
            </div>
            <div>
                {item.description}
            </div>
            <button onClick={()=>handleDelete(item._id)}>delete</button>
            <Link to={`/user/edit/${item._id}`}><button>edit</button></Link>
        </div>
    ))}
    </div>
  )
}

export default ViewBook