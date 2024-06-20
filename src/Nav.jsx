import axios from 'axios';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Nav = () => {
    let token = localStorage.getItem('token')
    let id=localStorage.getItem('id')
    console.log(id);
    let navigate=useNavigate()

    useEffect(()=>{
        let fetchData=async()=>{
            try{
                let response=await axios.get(`http://localhost:4000/auth/${id}`,{
                    headers:{
                        Authorization:token
                    }
                })
                console.log(response);
            }
            catch(e){
                console.log(e);
navigate('/login')
            }
        }
        fetchData()
    })

    let logout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div>
        <div className='bg-black text-white p-5'>

        <button className='rounded-lg bg-white text-black w-[10%]' onClick={logout}>logout</button>
        </div>
        <div className='p-4 pb-10'>

        <Outlet/>
        </div>
    </div>
  )
}

export default Nav