import { Alert, Button, Modal, TextInput, Spinner } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { updateStart, updateFailure, updateSuccess, deleteFailure, deleteStart, deleteSuccess, signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
const DashProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, loading } = useSelector(state => state.user)
    const imref = useRef();
    const [imgFile, setImgFile] = useState(null)
    const [imgURL, setImgURL] = useState(null)
    const [imgFileProgress, setImgFileProgess] = useState(null)
    const [imgFileError, setImgFileError] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [formDataError, setFormDataError] = useState(null)
    const [formDataSuccess, setFormDataSuccess] = useState(null)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({})
    const photoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }
    const handlechange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormDataError(null)
        setFormDataSuccess(null)
        if (formData.username === currentUser.username || formData.email === currentUser.email || formData.photoURL === currentUser.photoURL) {
            setFormDataError("No changes made")
            return
        }
        if (imgLoading) {
            setFormDataError("Image is not loaded yet.please wait a moment .")
            return
        }
        if (Object.keys(formData).length == 0) {

            return
        }

        try {
            dispatch(updateStart())
            const res = await fetch(
                `api/user/update/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                }

            )
            const data = await res.json()
            console.log(data)
            if (data.success == false) {
                dispatch(updateFailure(data.message))
                setFormDataError(data.message)
            }
            else {
                dispatch(updateSuccess(data))
                setFormDataError(null)
                setFormDataSuccess("Updated Successfully")
                setImgFileProgess(null)
                setFormData({})
            }

        }
        catch (err) {
            setFormDataError(err.message)
        }

    }
    useEffect(() => {
        if (imgFile) {
            uploadImg()
        }

    }, [imgFile])
    const uploadImg = () => {
        setImgFileError(null)
        setImgLoading(true)
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
            setImgLoading(false)

        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgURL(downloadURL)
                setFormData({ ...formData, photoURL: downloadURL })
                setImgLoading(false)

            })
        })
    }

    const handleDelete = async () => {
        setFormDataError(null)
        setOpen(false)
        setFormDataSuccess(null)
        try {
            dispatch(deleteStart())
            const data = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const res = await data.json()
            if (res.success === false) {
                setFormDataError(res.message)
                dispatch(deleteFailure(res.message))
            }
            else {

                setFormDataError(null)
                setFormDataSuccess("Deleted Successfully")
                setTimeout(() => {

                    dispatch(deleteSuccess())
                }, 2000)

            }

        }
        catch (err) {
            dispatch(deleteFailure(err.message))
            setFormDataError(err.message)
        }

    }

    const handleSignOut = async () => {
        setFormDataError(null)
        setFormDataSuccess(null)
        try {
            dispatch(signoutStart())
            const data = await fetch("/api/user/signout", {
                method: "POST"
            })
            const res = await data.json()
            if (res.success === false) {
                dispatch(signoutFailure(res.message))
                setFormDataError(res.message)
            }
            else {
                setFormDataError(null)
                setFormDataSuccess("Signed Out Successfully")
                setTimeout(() => {
                    dispatch(signoutSuccess())
                }, 2000)
            }
        }
        catch (err) {
            dispatch(signoutFailure(err.message))
            setFormDataError(err.message)
        }

    }

    return (
        <div className='mt-10 max-w-md mx-auto w-full p-3'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-6'>
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
                    id="username"
                    defaultValue={currentUser.username}
                    onChange={handlechange}
                />
                <TextInput
                    type='email'
                    placeholder='User Name'
                    id="email"
                    defaultValue={currentUser.email}
                    disabled
                />
                <TextInput
                    type='text'
                    id='password'
                    placeholder='Password'
                    onChange={handlechange}

                />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading | imgLoading}>{
                    loading || imgLoading ? (
                        <>
                            <Spinner size='md' />
                            <span className='ml-2'>Loading...</span>
                        </>
                    ) : "Update"
                }

                </Button>
                {
                    currentUser.isAdmin &&
                    <Link to="/create-post">
                        <Button type="button" gradientDuoTone="purpleToPink" className='font-semibold w-full' >
                            Create a  Post
                        </Button>

                    </Link>
                }


            </form>
            <div className='my-7 flex justify-between'>
                <span className=' text-red-500 font-sans cursor-pointer' onClick={() => setOpen(true)}>Delete Account</span>
                <span className=' font-sans cursor-pointer' onClick={handleSignOut}>Sign Out</span>
            </div>
            {
                formDataError &&
                <Alert color="failure" className='my-7 mb-10'>
                    {formDataError}
                </Alert>

            }
            {
                formDataSuccess &&
                <Alert color="success" className='my-7 mb-10'>
                    {formDataSuccess}
                </Alert>

            }
            <Modal
                show={open}
                onClose={() => setOpen(false)}
                size="md"
                popup
            >
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <div className='text-center'>

                        <HiOutlineExclamationCircle className='mx-auto mb-4 w-12 h-12 text-gray-400 dark:text-gray-200' />
                        <h3 className='text-lg font-medium text-gray-400 dark:text-gray-100'>
                            Are you sure you want to delete your account?

                        </h3>
                        <div className='flex justify-center gap-5 mt-7'>
                            <Button color='failure' onClick={handleDelete}>
                                Yes, I am Sure.
                            </Button>
                            <Button color='gray' onClick={() => setOpen(false)}>
                                No, Cancel.
                            </Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashProfile