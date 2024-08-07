import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signUpFail, signUpSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
const OAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider)
      console.log(resultFromGoogle)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoURL: resultFromGoogle.user.photoURL
        })
      })
      const data = await res.json();
      if (data.success == false) {
        dispatch(signUpFail(data.message));
      }
      else {
        dispatch(signUpSuccess(data))
        navigate("/");
      }
    }
    catch (err) {
      console.log(err)

    }
  }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  )
}

export default OAuth