import { useEffect, useState } from "react"
import moment from 'moment'
import { Button, Textarea } from "flowbite-react"
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState(null)
    const { currentUser } = useSelector(state => state.user)
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editedData, setEditedData] = useState(null)
    const image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    useEffect(() => {
        const getuser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setUser(data)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        getuser()
    }, [comment])
    const handleEdit = (comment) => {
        if (!currentUser) {
            alert("Sign in to edit")
            return
        }
        setIsEdit(true)
        setEditId(comment._id)
        setEditedData(comment)


    }
    const handleSave = () => {
        setIsEdit(false)
        onEdit(editId, editedData)

    }
    return (
        <div className=" flex mt-5 p-3 border-b gap-1 dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user ? user.photoURL : image} />
            </div>
            <div className="flex-1 ">
                <div className="flex gap-1">
                    <span className="text-xs  dark:text-gray-200 text-gray-700 font-semibold truncate">
                        {user ? `@${user.username}` : "@Anonymous"}
                    </span>
                    <span className="text-xs text-gray-400">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                {
                    isEdit ? (
                        <div className="flex gap-1 flex-col">

                            <Textarea
                                className="mt-2"
                                value={editedData.comment}
                                onChange={(e) => setEditedData(
                                    { ...editedData, comment: e.target.value }
                                )}
                            >

                            </Textarea>
                            <div className="flex justify-end gap-2 m-3">
                                <Button gradientDuoTone="purpleToBlue"
                                    onClick={handleSave}
                                >Save</Button>
                                <Button gradientDuoTone="purpleToBlue" size="sm" outline
                                    onClick={() => setIsEdit(false)}
                                >Cancel</Button>
                            </div>



                        </div>

                    ) : (
                        <div>
                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-300">{comment.comment}</p>
                            <div className="mt-5 flex items-center gap-1">
                                <Button type="button" color="gray" className="p-0" onClick={() => onLike(comment._id)}>
                                    <FaThumbsUp className={`text-xs hover:text-blue-500 
                        
                            ${currentUser && comment.likes.includes(currentUser._id) && 'text-blue-500'}
                        `} />
                                </Button>
                                <span className="text-xs text-gray-600 ml-2">{comment.likes.length} {comment.length > 1 ? "Likes" : "Like"}</span>
                                {

                                    currentUser && (comment.userId === currentUser._id || currentUser.isAdmin) &&
                                    <button type="button" className="p-0 ml-2" onClick={() => handleEdit(comment)}>
                                        <FiEdit className="w-5 h-5 text-xs text-gray-500
                             hover:text-blue-500 " />
                                    </button>
                                }
                                {

                                    currentUser && (comment.userId === currentUser._id || currentUser.isAdmin) &&
                                    <button type="button" className="p-0 ml-2"
                                        onClick={() => {
                                            onDelete(comment._id)
                                        }}>
                                        <MdDeleteOutline className="w-5 h-5 text-xs text-red-400
                             hover:text-blue-500 " />
                                    </button>
                                }

                            </div>

                        </div>
                    )
                }

            </div >

        </div >
    )
}

export default Comment