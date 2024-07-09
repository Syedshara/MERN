import { Alert, Button, FileInput, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import React, { useDebugValue, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CreatePost = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})
    const [imgProgess, setImgPorgress] = useState(null)
    const [imgError, setImgError] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const handleSubmit = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])

    }
    const uploadImg = () => {

        if (!file) {
            setImgError('Please select an image')
            return
        }
        setImgError(null)
        const storage = getStorage();
        const filename = new Date().getTime() + file.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgPorgress(progress.toFixed(0))
            },
            (error) => {
                setImgError("Upload Failed");
                setImgPorgress(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, imgURL: downloadURL })
                    setImgError(null)
                    setImgPorgress(null)
                })
            }
        )
    }
    const handlePublish = async (e) => {
        e.preventDefault()
        console.log(formData)
        try {
            const res = await fetch("/api/post/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })
            const data = await res.json()
            if (res.ok) {
                setPublishError(null)
                navigate(`/post/${data.slug}`)

            }
            else {
                setPublishError(data.message)
            }

        }
        catch (err) {
            setPublishError(err.message)
        }


    }


    return (
        <div className='min-h-screen max-w-3xl m-10 mx-auto p-3 flex flex-col gap-5' >
            <h1 className='text-center text-3xl font-semibold '>Create Post</h1>
            <form className='flex flex-col gap-5' onSubmit={handlePublish}>
                <TextInput
                    id="title"
                    placeholder="Title"
                    required
                    className='!outline-none 
                    !border-none '
                    onChange={handleSubmit}

                >
                </TextInput>
                <div className='border-dotted border-4 items-center justify-between border-teal-400 p-6 flex gap-5'>
                    <FileInput type="file" accept='image/*'
                        onChange={handleFileChange}
                    ></FileInput>
                    <Button
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={uploadImg}
                        disabled={imgProgess}
                    >
                        {
                            imgProgess ? (
                                <div className='w-10 h-10'>
                                    <CircularProgressbar value={imgProgess}
                                        text={`${imgProgess}%` || 0}
                                        className='relative ' />

                                </div>
                            ) :
                                <span>Upload Image</span>

                        }
                    </Button>
                </div>
                {
                    imgError &&
                    <Alert color="failure">
                        {imgError}
                    </Alert>
                }
                {
                    formData.imgURL &&
                    <img
                        src={formData.imgURL}
                        alt="img"
                        className='w-1/2 h-1/2 mx-auto '
                    ></img>
                }
                <ReactQuill
                    theme="snow"
                    className='h-72 mb-10'
                    placeholder='Enter the captions'
                    onChange={(value) => setFormData({ ...formData, content: value.trim() })}

                />
                <Button
                    type="submit"
                    gradientDuoTone="purpleToPink"
                    className="!text-xl "

                >
                    Publish
                </Button>

                {
                    publishError &&
                    <Alert color="failure">
                        {publishError}
                    </Alert>
                }

            </form>


        </div>
    )
}

export default CreatePost