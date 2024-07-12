import React from 'react'
import { Table, Button, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'


const DashComments = () => {
    const { currentUser } = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(
                    "/api/comment/getComments"
                )
                const data = await res.json()
                if (res.ok) {
                    setComments(data.comments)
                    if (data.comments.length < 9) {
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
        const start = users.length;
        try {
            const res = await fetch(
                `/api/comment/getcomments?startIndex=${start}`
            )
            const data = await res.json()
            if (res.ok) {
                setComments([...comments, ...data.comments])
                if (data.comments.length < 9) {
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
            const data = await fetch(`/api/comment/deletecomment/${deleteId}`, {
                method: 'DELETE',
            });
            const res = await data.json()
            if (res.success === false) {
                alert(res.message)

            }
            else {
                const newComment = comments.filter((comment) => comment._id !== deleteId)
                setComments(newComment)
                if (newComment.length < 9) {
                    setShowMore(false)
                }
            }

        }
        catch (err) {
            console.log(err)
            alert(err.message)
        }

    }
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 scrollbar-thumb-slate-300 scrollbar-track-slate-100 mt-7'>
            {
                currentUser.isAdmin && comments.length > 0 ? (
                    <>
                        <Table hoverable className='shadow-md'>
                            <Table.Head >
                                <Table.HeadCell>DATE CREATED</Table.HeadCell>
                                <Table.HeadCell>Comment</Table.HeadCell>
                                <Table.HeadCell>No.of Likes</Table.HeadCell>
                                <Table.HeadCell>User ID</Table.HeadCell>
                                <Table.HeadCell>Post ID</Table.HeadCell>
                                <Table.HeadCell>
                                    <span>DELETE</span>
                                </Table.HeadCell>
                            </Table.Head>
                            {
                                comments.map((comment) => (
                                    <Table.Body key={comment._id} className='divide-y'>
                                        <Table.Row className='bg-slate-100  dark:bg-gray-800'>
                                            <Table.Cell>
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell className='line-clamp-3'>
                                                <span className='line-clamp-3 overflow-hidden'>
                                                    {comment.comment}
                                                </span>

                                            </Table.Cell>


                                            <Table.Cell>
                                                {comment.noLikes}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {comment.userId}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {
                                                    comment.postId
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    onClick={() => {
                                                        setOpen(true)
                                                        setDeleteId(comment._id)
                                                    }
                                                    }
                                                >
                                                    Delete
                                                </span>

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
                                        Are you sure you want to delete your comment?

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

export default DashComments