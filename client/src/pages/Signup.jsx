import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({})
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErr('Please fill out all fields.');
    }
    if (formData.username.length <= 4) {
      return setErr('Username must be at least 5 characters long.');
    }
    if (formData.password.length < 8) {
      return setErr('Password must be at least 8 characters long.');
    }

    try {
      setLoading(true)

      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await result.json();
      if (data.success == false) {
        if (data.code == 11000) {
          setErr("User or email already exist!")
        }
        else {
          setErr(data.message);
        }

      }
      else {
        setErr(null);
        navigate("/sign-in");
      }
      setLoading(false);
    }
    catch (err) {
      setErr(err.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>

      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>

        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple- 
                    500 to-pink-500 rounded-lg text-white'>Sara's</span>
            Blog
          </Link>

          <p className='mt-5 text-sm'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>

        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>

            <div className=''>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>

            <div className=''>
              <Label value="Your email" />
              <TextInput type="email" placeholder="abc@gamil.com" id="email" onChange={handleChange} />
            </div>

            <div className=''>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>

            <Button className='text-white text-3xl' gradientDuoTone='purpleToPink' type='submit' disabled={loading}>

              {
                loading ? (
                  <>
                    <Spinner size='md' />
                    <span className='ml-2'>Loading...</span>
                  </>
                ) : "Sign Up"
              }
            </Button>
            <OAuth />
          </form>

          <div className='text-sm mt-5'>

            <span>
              Have an  account?
              <Link to="/sign-in" className='text-blue-500 pl-2'>Login</Link>
            </span>

          </div>
          <div>
            {
              err &&
              <Alert className='mt-5' color='failure'>
                {err}
              </Alert>

            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup