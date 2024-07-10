import React from 'react'
import { Table, Button, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DashPost = () => {
    const { currentUser } = useSelector(state => state.user)
    const [userPost, setUserPost] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(
                    `/api/post/getpost?userId=${currentUser._id}`
                )
                const data = await res.json()
                if (res.ok) {
                    setUserPost(data.posts)
                    if (data.posts.length < 9) {
                        setShowMore(false)
                    }
                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchPost();
    }, [currentUser._id])

    const handleShowMore = async () => {
        const start = userPost.length;
        try {
            const res = await fetch(
                `/api/post/getpost?userId=${currentUser._id}&startIndex=${start}`
            )
            const data = await res.json()
            if (res.ok) {
                setUserPost([...userPost, ...data.posts])
                if (data.posts.length < 9) {
                    setShowMore(false)
                }

            }
            else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleDelete = async () => {
        setOpen(false)
        try {
            const res = await fetch(`/api/post/deletepost/${deleteId}/${currentUser._id}`, {
                method: 'DELETE'
            }
            )
            const data = await res.json()
            if (res.ok) {
                const newPost = userPost.filter((post) => post._id !== deleteId)
                setUserPost(newPost)
                if (newPost.length < 9) {
                    setShowMore(false)
                }

            }
            else {
                console.log(data.message)
            }

        }
        catch (err) {
            console.log(err)
        }


    }
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 scrollbar-thumb-slate-300 scrollbar-track-slate-100 mt-7'>
            {
                currentUser.isAdmin && userPost.length > 0 ? (
                    <>
                        <Table hoverable className='shadow-md'>
                            <Table.Head className='text-center'>
                                <Table.HeadCell>Date updated</Table.HeadCell>
                                <Table.HeadCell>Post image</Table.HeadCell>
                                <Table.HeadCell>Post title</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                                <Table.HeadCell>
                                    <span>Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            {
                                userPost.map((post) => (
                                    <Table.Body key={post._id} className='divide-y'>
                                        <Table.Row className='bg-slate-100  dark:bg-gray-800'>
                                            <Table.Cell>
                                                {new Date(post.updatedAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/post/${post.slug}`}>
                                                    <img src={post.imgURL} alt="Post" className='w-30 h-20 object-cover bg-gray-900' />
                                                </Link>
                                            </Table.Cell>


                                            <Table.Cell>
                                                <Link to={`/post/${post.slug}`} className='font-medium text-gray-800 dark:text-slate-100'>
                                                    {post.title}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    onClick={() => {
                                                        setOpen(true)
                                                        setDeleteId(post._id)
                                                    }
                                                    }
                                                >
                                                    Delete
                                                </span>

                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link className='font-medium text-teal-300 hover:underline cursor-pointer' to={`/update-post/${post._id}`}>
                                                    <span
                                                    >
                                                        Edit
                                                    </span>
                                                </Link>

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                        {showMore && (
                            <button
                                onClick={handleShowMore}
                                className='w-full text-teal-500 self-center text-sm py-7'
                            >
                                Show more
                            </button>
                        )}
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
                                    <h3 className='text-lg font-medium text-gray-500 dark:text-gray-100'>
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

                    </>
                ) :
                    "No posts yet!"

            }

        </div >
    )
}

export default DashPost