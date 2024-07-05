import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { signUpFail, signUpStart, signUpSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, errorMsg: err } = useSelector(state => state.user);
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signUpFail('Please fill out all fields.'));
    }
    try {
      dispatch(signUpStart())
      const result = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await result.json();
      if (data.success == false) {
        dispatch(signUpFail(data.message));
      }
      else {
        dispatch(signUpSuccess(data))
        navigate("/");
      }
    }
    catch (err) {
      dispatch(signUpFail(err.message));

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
          <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>

            <div className=''>
              <Label value="Your email" />
              <TextInput type="text" placeholder="abc@gamil.com" id="email" onChange={handleChange} />
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
                ) : "Sign In"
              }
            </Button>
            <OAuth />

          </form>

          <div className='text-sm mt-5'>

            <span>
              Don't Have an account
              <Link to="/sign-up" className='text-blue-500 pl-2'>Sign Up</Link>
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

export default Signin