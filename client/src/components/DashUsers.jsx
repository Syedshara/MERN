import React from 'react'
import { Table, Button, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

const DashPost = () => {
    const { currentUser } = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(
                    "/api/user/getuser"
                )
                const data = await res.json()
                if (res.ok) {
                    setUsers(data.userWithOutPass)
                    if (data.userWithOutPass.length < 9) {
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
                `/api/user/getuser?startIndex=${start}`
            )
            const data = await res.json()
            if (res.ok) {
                setUsers([...users, ...data.userWithOutPass])
                if (data.userWithOutPass.length < 9) {
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
            const data = await fetch(`/api/user/delete/${deleteId}`, {
                method: 'DELETE',
            });
            const res = await data.json()
            if (res.success === false) {
                alert(res.message)

            }
            else {
                alert("User Deleted Successfull")
                const newUser = users.filter((user) => user._id !== deleteId)
                setUsers(newUser)
                if (newUser.length < 9) {
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
                currentUser.isAdmin && users.length > 0 ? (
                    <>
                        <Table hoverable className='shadow-md'>
                            <Table.Head >
                                <Table.HeadCell>DATE CREATED</Table.HeadCell>
                                <Table.HeadCell>USER IMAGE</Table.HeadCell>
                                <Table.HeadCell>USERNAME</Table.HeadCell>
                                <Table.HeadCell>EMAIL</Table.HeadCell>
                                <Table.HeadCell>ADMIN</Table.HeadCell>
                                <Table.HeadCell>
                                    <span>DELETE</span>
                                </Table.HeadCell>
                            </Table.Head>
                            {
                                users.map((user) => (
                                    <Table.Body key={user._id} className='divide-y'>
                                        <Table.Row className='bg-slate-100  dark:bg-gray-800'>
                                            <Table.Cell>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link>
                                                    <img src={user.photoURL} alt="Post" className='w-10 h-10 object-cover bg-gray-500 rounded-full self-center mx-auto' />
                                                </Link>
                                            </Table.Cell>


                                            <Table.Cell>
                                                {user.username}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {user.email}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    onClick={() => {
                                                        setOpen(true)
                                                        setDeleteId(user._id)
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