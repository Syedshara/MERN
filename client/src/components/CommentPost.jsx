import { Alert, Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const CommentPost = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commemtError, setCommentError] = useState(null)
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

            }
            else {
                setCommentError(data.message)

            }

        }
        catch (err) {
            setCommentError(err.message)
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
                        maxLength="20"
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
        </div >
    )
}

export default CommentPost