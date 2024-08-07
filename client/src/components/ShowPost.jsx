import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Spinner } from 'flowbite-react'
import CallToAction from './CallToAction'
import CommentPost from './CommentPost'
import PostCard from './PostCard'


const ShowPost = () => {
    const { postslug } = useParams()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [recents, setRecents] = useState(null)
    useEffect(() => {
        try {
            setLoading(true)
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getpost?slug=${postslug}`);
                const data = await res.json();
                if (!res.ok) {
                    setLoading(false)
                    return;
                }
                if (res.ok) {
                    setLoading(false);
                    setPost(data.posts[0]);
                    return
                }
            };

            fetchPost();
        } catch (error) {
            setLoading(false)
        }
    }, [postslug])

    useEffect(() => {
        try {
            const getRecentPost = async () => {
                const res = await fetch(`/api/post/getpost?limit=3`)
                const data = await res.json()
                if (res.ok) {
                    setRecents(data.posts)
                }
                else {
                    console.log(data.message)
                }
            }
            getRecentPost()
        } catch (error) {
            console.log(error.message)
        }
    }, [])



    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size="xl"></Spinner>
            </div>
        )
    }

    return (
        <main className='min-h-screen max-w-6xl flex flex-col mx-auto p-3 '>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <img
                src={post && post.imgURL}
                alt={post && post.title}
                className='max-h-[600px] mt-10 object-cover p-3 w-full'

            />
            <div className='max-w-4xl w-full mx-auto p-3 flex justify-between items-center border-b border-gray-500 text-xs'>
                <span>
                    {post && new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className='italic'>
                    {post && (post.content.replace(/[\n ]/g, '').length
                        / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-3 max-w-2xl mt-10 mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>

            <div className='w-full max-w-4xl mx-auto p-3'>
                <CallToAction />
            </div>
            <CommentPost postId={post && post._id} />
            <div className='flex flex-col justify-center items-center my-20 '>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {recents &&
                        recents.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>

        </main>
    )
}

export default ShowPost