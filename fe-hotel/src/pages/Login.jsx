import React, { useContext, useState } from 'react'
import axios from 'axios';
import AuthContext from '../context/auth-context';

const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const ctx = useContext(AuthContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      nama: username,
      password: password
    }

    axios.post(baseUrl + '/auth/login', data)
      .then((res) => {
        console.log(res.data.logged);
        let data = res.data.data;
        const nama = data.nama;
        const role = data.role;

        if(res.data.logged) {
          console.log(nama)
          console.log(role)
          ctx.onLogin(data.nama, data.role);
          window.location.href = '/'
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div className='font-lato'>

      {/* awal wrapper konten utama */}
      <div className="w-full h-screen bg-main-bg">

        {/* konten utama */}
        <div className="min-h-full py-20">
          <div className="flex justify-center items-center ">
            <div className="text-white flex bg-secondary-dark-bg rounded-md flex-col justify-center items-center text-center p-5">

              {/* icon login */}
              <img />

              {/* title */}
              <h1 className='text-xl font-semibold mb-12'>Login</h1>

              <form action='POST' onSubmit={handleSubmit} >
                {/* wrraper username */}
                <div className='hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 w-full mb-4'>
                  <div className='text-black bg-darkblue rounded-md flex items-center gap-x-3'>
                    <input className='w-full rounded-md px-3 bg-darkblue focus:outline-none border-b-2 border-gray focus:border-purple transition ease-in-out duration-300' placeholder='Username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>

                {/* wrraper password */}
                <div className='hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 w-full mb-4'>
                  <div className='text-black bg-darkblue rounded-md flex items-center gap-x-3'>
                    <input className='w-full rounded-md px-3 bg-darkblue focus:outline-none border-b-2 border-gray focus:border-purple transition ease-in-out duration-300' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>

              </form>

              {/* forget password */}
              <button className='text-[15px] tracking-wider text-gray italic hover:text-white duration-300 transition ease-in-out mb-5'>Forget Password?</button>

              <form className='w-full' action="POST" onSubmit={handleSubmit}>

                {/* button submit */}
                <button type='submit' className='bg-purple-600 py-1.5 w-full lg:w-1/2 rounded-md text-lg font-semibold hover:scale-105 transition ease-in-out duration-300'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login