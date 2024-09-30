import React, { useEffect, useState } from 'react'

function Home() {
    const [user,setuser]=useState(null);

    useEffect(()=>{
        const storeduser=localStorage.getItem('users');
        if(storeduser){
            setuser(JSON.parse(storeduser));

        }
    },[])
  return (
    <div>
        <h2>Hone</h2>
        {user?(
        <div>
            <h1>WELCOME,{user.username}</h1>
            </div>
        ):(
            <p>NOTHING</p>
        )}


    </div>
  )
}

export default Home