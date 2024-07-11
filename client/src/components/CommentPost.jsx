import { Alert, Button, Textarea, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
const CommentPost = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commemtError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            return
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    comment,
                    userId: currentUser._id
                })
            })
            const data = await res.json()
            if (res.ok) {
                setComment('')
                setCommentError(null)
                setComments([data.newComment, ...comments]);


            }
            else {
                setCommentError(data.message)

            }

        }
        catch (err) {
            setCommentError(err.message)
        }


    }
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomment/${postId}`)
                const data = await res.json()
                if (res.ok) {
                    setComments(data)
                }
            }
            catch (err) {
                setCommentError(err.message)
            }
        }
        getComments()
    }, [postId])
    const handleLikes = async (commentId) => {
        if (!currentUser) {
            alert("Sign in to like")
            return

        }
        try {
            const res = await fetch(`/api/comment/likes/${commentId}`, {
                method: 'PUT'
            }
            )
            const data = await res.json()

            if (res.ok) {
                setComments(comments.map(comment =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        noLikes: data.noLikes
                    } :
                        comment

                ))

            }
            else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }
    const handleEdit = async (commentId, editedData) => {
        try {
            const res = await fetch(`/api/comment/editcomment/${commentId}`, {
                method: 'PUT',
                body: JSON.stringify(editedData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            const data = await res.json()
            if (res.ok) {
                setComments(comments.map(comment =>
                    comment._id === commentId ? {
                        ...comment,
                        comment: editedData.comment
                    } :
                        comment
                ))
            }
            else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const handleDeleteClick = (commentId) => {
        if (!currentUser) {
            alert("You must be logged in to delete a comment")
            return
        }
        setOpen(true)
        setDeleteId(commentId)

    }
    const handleDelete = async () => {
        setOpen(false)
        try {
            const res = await fetch(`/api/comment/deletecomment/${deleteId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (res.ok) {
                setComments(comments.filter(comment => comment._id !== deleteId))

            }
            else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='w-full max-w-2xl mx-auto p-3 '>
            {
                currentUser ? (<div className='text-gray-500 flex items-center gap-2 p-3'>
                    <span>Signed up as: </span>
                    <img src={currentUser.photoURL} rel='user profile' className='w-5 h-5 rounded-full object-cover' />
                    <Link to="/dashboard?tag=profile" className='text-blue-400  hover:underline'>@{currentUser.username}</Link>
                </div>) : (<div className='text-gray-500 flex items-center gap-2 p-3'>
                    <span className='text-gray-500'>You must to be signed in to comment : </span>
                    <Link to="/sign-in" className='text-blue-400   hover:underline text-sm'>Login</Link>
                </div >)
            }
            <div className='w-full max-w-2xl  mx-auto p-6 border border-teal-300 rounded-md'>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        rows="3"
                        placeholder="Write a comment..."
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        required
                    >

                    </Textarea>
                    <div className='mt-5 flex justify-between items-center'>
                        <span className='text-gray-500 text-xs'>{200 - comment.length} characters remaining..</span>
                        <Button gradientDuoTone="purpleToBlue" type='submit' outline>
                            Submit
                        </Button>
                    </div>

                </form>
                {
                    commemtError && <Alert color="failure" className='mt-7'>
                        {commemtError}
                    </Alert>
                }

            </div>
            {
                (comments && comments.length != 0) ? (
                    <div className='mt-16'>
                        <div className='flex w-full gap-2 items-center'>
                            <span className='text-sm text-gray-500'>Comments</span>
                            <div className='px-2 py-1 border border-gray-500  text-xs'>
                                {comments.length}
                            </div>
                        </div>
                        <div>
                            {
                                comments.map((comment) => (
                                    <Comment key={comment._id} comment={comment}
                                        onLike={handleLikes}
                                        onEdit={handleEdit}
                                        onDelete={handleDeleteClick}
                                    />
                                ))
                            }

                        </div>
                    </div>

                ) : (
                    <div className='mt-7 text-gray-500 text-center'>
                        <span>No comments yet..</span>
                    </div>
                )
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

        </div >
    )
}

export default CommentPost