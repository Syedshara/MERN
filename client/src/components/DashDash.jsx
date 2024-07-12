import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi"
import { Button, Table } from "flowbite-react"
import { Link } from "react-router-dom"

const DashDash = () => {
    const { currentUser } = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthPosts, setLastMonthPosts] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)




    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getuser?limit=5')
                const data = await res.json()
                if (res.ok) {

                    setUsers(data.userWithOutPass)
                    setTotalUsers(data.TotalUser)
                    setLastMonthUsers(data.LastMonthUser)

                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }

        }
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getpost?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setPosts(data.posts)
                    setTotalPosts(data.TotalPost)
                    setLastMonthPosts(data.LastMonthPost)

                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }

        }
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setComments(data.comments)
                    setTotalComments(data.TotalComment)
                    setLastMonthComments(data.LastMonthComment)

                }
                else {
                    console.log(data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }

        }
        if (currentUser && currentUser.isAdmin) {
            fetchComments()
            fetchPosts()
            fetchUsers()
        }


    }, [currentUser])


    return (
        <div className="p-3 mx-auto mt-5 mb-5">
            <div className="flex w-full flex-wrap justify-center p-3 gap-4 ">
                <div className="p-3 w-full md:w-80 shadow-md rounded-md dark:bg-slate-800 flex flex-col gap-4">
                    <div className="flex justify-between ">
                        <div>
                            <h1 className="text-gray-500 dark:text-gray-400">
                                TOTAL USERS
                            </h1>
                            <span className="text-3xl">
                                {totalUsers}
                            </span>
                        </div>
                        <HiOutlineUserGroup className="text-5xl bg-teal-500 p-2 rounded-full shadow-lg text-white" />

                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center">
                            <HiArrowNarrowUp className="text-green-400" />
                            {lastMonthUsers}
                        </div>
                        <span>
                            Last month
                        </span>
                    </div>

                </div>
                <div className="p-3 w-full md:w-80 shadow-md rounded-md dark:bg-slate-800 flex flex-col gap-4">
                    <div className="flex justify-between ">
                        <div>
                            <h1 className="text-gray-500 dark:text-gray-400">
                                TOTAL COMMENTS
                            </h1>
                            <span className="text-3xl">
                                {totalComments}
                            </span>
                        </div>
                        <HiAnnotation className="text-5xl bg-indigo-600 p-2 rounded-full shadow-lg text-white" />

                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center">
                            <HiArrowNarrowUp className="text-green-400" />
                            {lastMonthComments}
                        </div>
                        <span>
                            Last month
                        </span>
                    </div>

                </div>
                <div className="p-3 w-full md:w-80 shadow-md rounded-md dark:bg-slate-800 flex flex-col gap-4">
                    <div className="flex justify-between ">
                        <div>
                            <h1 className="text-gray-500 dark:text-gray-400">
                                TOTAL POSTS
                            </h1>
                            <span className="text-3xl">
                                {totalPosts}
                            </span>
                        </div>
                        <HiDocumentText className="text-5xl bg-lime-500 p-2 rounded-full shadow-lg text-white" />

                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center">
                            <HiArrowNarrowUp className="text-green-400" />
                            {lastMonthPosts}
                        </div>
                        <span>
                            Last month
                        </span>
                    </div>

                </div>
            </div>

            <div className="flex flex-wrap justify-center p-3 mt-5 gap-5 mb-10 ">
                <div className="shadow-md w-full  md:w-auto p-3 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between">
                        <h2>Recent users</h2>
                        <Button gradientDuoTone="purpleToPink" outline disabled={
                            users.length === 0
                        }>
                            <Link to="/dashboard?tag=user">
                                View all
                            </Link>

                        </Button>
                    </div>
                    {
                        users.length === 0 ? (
                            <div className="flex flex-col justify-center items-center w-full !w-92  mt-5">
                                <Table hoverable className={`mb-10 
                                ${users.length === 0 && "min-w-96"}
                                `}>
                                    <Table.Head >
                                        <Table.HeadCell>USER IMAGE</Table.HeadCell>
                                        <Table.HeadCell>USERNAME</Table.HeadCell>

                                    </Table.Head>
                                </Table>
                                <h1 className="text-gray-500 dark:text-gray-400">
                                    No users yet
                                </h1>
                            </div>

                        ) :
                            (
                                <Table hoverable className="mt-5">

                                    <Table.Head >
                                        <Table.HeadCell>USER IMAGE</Table.HeadCell>
                                        <Table.HeadCell>USERNAME</Table.HeadCell>

                                    </Table.Head>
                                    {
                                        users.map((user) => (
                                            <Table.Body key={user._id}>
                                                <Table.Row className='bg-slate-100  dark:border-gray-700 dark:bg-gray-800'>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-2">
                                                            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full
                                            " />
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>

                                                        {user.username}

                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        ))

                                    }
                                </Table>
                            )
                    }

                </div>
                <div className="shadow-md w-full md:w-auto p-3 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between">
                        <h2>Recent comments</h2>
                        <Button gradientDuoTone="purpleToPink" outline disabled={
                            comments.length === 0
                        } >
                            <Link to="/dashboard?tag=comment">
                                View all
                            </Link>

                        </Button>
                    </div>
                    {
                        comments.length === 0 ? (
                            <div className="flex flex-col justify-center items-center w-full !w-92  mt-5">
                                <Table hoverable className={`mb-10 
                                ${comments.length === 0 && "min-w-96"}
                                `}>
                                    <Table.Head >
                                        <Table.HeadCell>Comment</Table.HeadCell>
                                        <Table.HeadCell>Likes</Table.HeadCell>

                                    </Table.Head>
                                </Table>
                                <h1 className="text-gray-500 dark:text-gray-400">
                                    No comments yet
                                </h1>
                            </div>
                        ) : (
                            <Table hoverable className="mt-5">

                                <Table.Head >
                                    <Table.HeadCell>Comment</Table.HeadCell>
                                    <Table.HeadCell>Likes</Table.HeadCell>

                                </Table.Head>
                                {
                                    comments.map((comment) => (
                                        <Table.Body key={comment._id} className="divide-y">
                                            <Table.Row className='bg-slate-100 dark:border-gray-700 dark:bg-gray-800'>
                                                <Table.Cell className="w-96">
                                                    <p className="line-clamp-2 overflow-hidden">
                                                        {comment.comment}
                                                    </p>
                                                </Table.Cell>
                                                <Table.Cell>

                                                    {comment.noLikes}

                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    ))

                                }
                            </Table>

                        )
                    }

                </div>
                <div className="shadow-md w-full md:w-auto p-3 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between">
                        <h2>Recent users</h2>
                        <Button gradientDuoTone="purpleToPink" outline disabled={
                            posts.length === 0
                        }>
                            <Link to="/dashboard?tag=post">
                                View all
                            </Link>

                        </Button>
                    </div>
                    {
                        posts.length === 0 ? (
                            <div className="flex flex-col justify-center items-center w-full !w-92  mt-5">
                                <Table hoverable className={`mb-10 
                                ${posts.length === 0 && "min-w-96"}
                                `}>
                                    <Table.Head >
                                        <Table.HeadCell>Post IMAGE</Table.HeadCell>
                                        <Table.HeadCell>POST title</Table.HeadCell>

                                    </Table.Head>
                                </Table>
                                <h1 className="text-gray-500 dark:text-gray-400">
                                    No comments yet
                                </h1>
                            </div>
                        ) : (
                            <Table hoverable className="mt-5">

                                <Table.Head >
                                    <Table.HeadCell>Post IMAGE</Table.HeadCell>
                                    <Table.HeadCell>POST title</Table.HeadCell>

                                </Table.Head>
                                {
                                    posts.map((post) => (
                                        <Table.Body key={post._id}>
                                            <Table.Row className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell>
                                                    <div className="flex items-center gap-2">
                                                        <img src={post.imgURL} alt="" className="w-20 h-10 rounded-lg
                                                " />
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="w-96">

                                                    {post.title}

                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    ))

                                }
                            </Table>

                        )
                    }

                </div>
            </div>



        </div>

    )
}

export default DashDash