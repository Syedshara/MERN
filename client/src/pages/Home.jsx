import { useEffect, useState } from "react"
import { Spinner } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from "react-router-dom"
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'


const Home = () => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/post/getpost')
        const data = await response.json()
        if (response.ok) {
          setPost(data.posts)
          setLoading(false)

        }
        else {
          setLoading(false)
          setError(true)
        }
      }
      catch (err) {
        setLoading(false)
        setError(true)
      }

    }
    fetchPost()

  }, [])
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-xl">
            Something went wrong...
          </h1>
          <span>
            <HiOutlineExclamationCircle className="w-12 h-12 text-red-500" />
          </span>
        </div>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex gap-1 items-center justify-center">
          <h1>
            Loading...
          </h1>
          <span>
            <Spinner size="xl">

            </Spinner>
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full ">
      <div className="w-full  p-28 px-3 mx-auto ">
        <h1 className="text-3xl md:text-6xl max-w-6xl mx-auto p-3 font-bold ">
          Welcome to My Blog!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-6xl mx-auto p-3 ">
          Welcome to our blog, a place where ideas come to life! Whether you're a tech enthusiast, a budding writer, or someone who loves to share their thoughts and experiences, this is the perfect space for you. Our blog is dedicated to fostering a community of curious minds and passionate storytellers.

          Share Your Ideas
          Do you have an innovative idea, a unique perspective, or a personal story to tell? This blog is your platform to share your voice with the world. We believe that everyone has something valuable to contribute, and we’re here to help you share it.
        </p>
        <div className="text-teal-400 hover:underline p-3 max-w-6xl mx-auto text-xs font-semibold md:text-sm md:font-bold">
          <Link to="/search" >
            View all posts
          </Link>

        </div>

      </div>
      <div className='w-full bg-amber-100 dark:bg-gray-800 mb-5 mx-auto p-3'>
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 className="text-center py-7 font-semibold text-xl sm:text-3xl">Recents Posts</h2>
          <div className="flex flex-wrap gap-8 p-5 justify-center">
            {
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            }
          </div>

        </div>
        <div className="text-teal-400 hover:underline p-3 max-w-6xl mx-auto text-sm font-semibold md:text-lg md:font-bold text-center my-10">
          <Link to="/search" >
            View all posts
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Home