import { Alert, Button, FileInput, Select, TextInput, Textarea } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [fdata, setData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);


    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getpost?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setData(data.posts[0]);
                    console.log("data")
                    return
                }
            };

            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId]);




    const handleUpdloadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, imgURL: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);

        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Object.keys(formData).length)
        if (Object.keys(formData).length == 0) {
            return;
        }
        if (formData.title == fdata.title || formData.content == fdata.content || formData.imgURL == fdata.imgURL) {
            setPublishError("No changes")
            return;
        }

        try {
            const res = await fetch(`/api/post/updatepost/${fdata._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };
    console.log(formData)
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        defaultValue={fdata.title || ''}
                        className='flex-1'
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value.trim() })
                        }

                    />

                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}

                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUpdloadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {(formData.imgURL || fdata.imgURL) && (
                    <img
                        src={formData.imgURL || fdata.imgURL}
                        alt='upload'
                        className='w-full h-72 object-cover'
                    />
                )}
                <ReactQuill
                    theme="snow"
                    value={formData.content || fdata.content}
                    className='h-72 mb-10 text-gray-800 dark:text-white'
                    placeholder='Enter the captions'
                    onChange={(value) => setFormData({ ...formData, content: value.trim() })}

                />


                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Update post
                </Button>
                {publishError && (
                    <Alert className='mt-5' color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div >
    );
}