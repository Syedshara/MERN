import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from "react-router-dom"
const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
         <div className='flex-1'>
         <Link to='/'className='font-bold dark:text-white text-4xl'>
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
            <form className='flex flex-col gap-5 mt-5'>
                <div className=''>
                    <Label value="Your username"/>
                    <TextInput type="text" placeholder="Username" id="username"/>                      
                </div>
                <div className=''>
                    <Label value="Your username"/>
                    <TextInput type="text" placeholder="Username" id="username"/>                      
                </div>
                <div className=''>
                    <Label value="Your username"/>
                    <TextInput type="text" placeholder="Username" id="username"/>                      
                </div>
                <Button className='text-white text-3xl' gradientDuoTone='purpleToPink' type='submit'>
                     Sign Up
                </Button>
            </form>
            <div className='text-sm mt-5'>
            <span>
                Have an  account? 
              <Link to="/sign-in" className='text-blue-500 pl-2'>Login</Link>
            </span>
         </div>
         </div>
         
      </div>
      
    </div>
  )
}

export default Signup