import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user)
    const imref = useRef();
    const [imgFile, setImgFile] = useState(null)
    const [imgURL, setImgURL] = useState(null)
    const [imgFileProgress, setImgFileProgess] = useState(null)
    const [imgFileError, setImgFileError] = useState(null)
    const photoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }
    useEffect(() => {
        if (imgFile) {
            uploadImg()
        }

    }, [imgFile])
    const uploadImg = () => {
        setImgFileError(null)
        const storage = getStorage(app)
        const filename = new Date().getTime() + imgFile.name
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, imgFile)
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setImgFileProgess(progress.toFixed(0))

        }, (error) => {
            setImgFileError("Cannot Upload (File should below 2 mb)")
            setImgFile(null)
            setImgURL(null)
            setImgFileProgess(null)

        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgURL(downloadURL)

            })
        })
    }





    return (
        <div className='mt-10 max-w-md mx-auto w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-5 mt-6'>
                <input type='file' accept='image/*' onChange={photoChange} ref={imref} hidden ></input>
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => imref.current.click()}>
                    {imgFileProgress &&
                        (
                            <CircularProgressbar value={imgFileProgress || 0} text={`${imgFileProgress}%`}
                                strokeWidth={5}
                                styles={
                                    {
                                        root: {
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            top: '0',
                                            left: '0'

                                        },
                                        path: {
                                            stroke: `rgba(62,152,199,${imgFileProgress / 100})`,
                                        }
                                    }
                                }
                            >

                            </CircularProgressbar>
                        )
                    }
                    <img src={imgURL || currentUser.photoURL} alt="user" className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${imgFileProgress && imgFileProgress < 100 && 'opacity-60'}`} />
                </div>
                {imgFileError &&
                    <Alert color="failure">
                        {imgFileError}
                    </Alert>}
                <TextInput
                    type='text'
                    placeholder='User Name'
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type='email'
                    placeholder='User Name'
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type='text'
                    placeholder='Password'

                />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                    Update
                </Button>

            </form>
            <div className='my-7 flex justify-between'>
                <span className=' text-red-500 font-sans cursor-pointer'>Delete Account</span>
                <span className=' font-sans cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile