import { useEffect, useState } from "react"
import { Button, TextInput, Spinner, Select } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GrDocumentTime } from "react-icons/gr";
import PostCard from './PostCard'

const Search = () => {
    const [searchData, setSearchData] = useState({
        searchTerm: '',
        sort: 'desc'
    })
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const Location = useLocation()
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(true)
    const handlechange = (e) => {

        const type = e.target.id
        if (type == "searchTerm") {
            setSearchData({ ...searchData, searchTerm: e.target.value })
        }
        if (type == "sort") {
            const direction = e.target.value || 'desc'
            setSearchData({ ...searchData, sort: direction })
        }


    }
    useEffect(() => {
        const params = new URLSearchParams(Location.search)
        const searchTerm = params.get('searchTerm')
        const sort = params.get('sort')

        if (searchTerm || sort) {
            setSearchData({ searchTerm, sort })
        }
        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/post/getpost?searchTerm=${searchData.searchTerm}&sort=${searchData.sort}`)
                const data = await response.json()
                if (response.ok) {
                    setPosts(data.posts)
                    if (data.posts.length < 9) {
                        setShowMore(false)
                    }
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }

            }
            catch (err) {
                console.log(err.message)
            }

        }
        fetchPost()
    }, [Location.search])


    const handleSubmit = (e) => {
        e.preventDefault()
        const params = new URLSearchParams(Location.search)
        params.set('searchTerm', searchData.searchTerm)
        params.set('sort', searchData.sort)
        const searchQuery = params.toString();
        navigate(`/search?${searchQuery}`);


    }
    const handleShowMore = async () => {
        setShowMore(false)
        const index = posts.length
        try {
            const urlParams = new URLSearchParams(Location.search);
            urlParams.set('startIndex', index);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getpost?${searchQuery}`);
            const data = await res.json()
            if (res.ok) {
                setPosts([...posts, ...data.posts])
                if (data.posts.length == 9) {
                    setShowMore(true)
                }

            }
            else {
                console.log("error")
            }
        }
        catch (err) {

        }



    }

    return (
        <div className='flex flex-col sm:flex-row '>
            <div className='p-3 sm:min-h-screen border-b sm:border-r border-gray-300 pt-10 dark:border-gray-600'>
                <form className='flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
                    <div className='flex gap-2 items-center'>
                        <label>
                            Search Term :
                        </label>
                        <TextInput
                            id="searchTerm"
                            type="text"
                            placeholder="Search"
                            value={searchData.searchTerm}
                            onChange={handlechange}
                        ></TextInput>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label>
                            Sort :
                        </label>
                        <Select
                            id="sort"
                            value={searchData.sort}
                            onChange={handlechange}
                        >
                            <option value="des">Latest</option>
                            <option value="asc">Oldest</option>

                        </Select>
                    </div>

                    <Button gradientDuoTone="purpleToBlue" outline size="lg" type="submit" className='mt-5'>
                        Apply Filter
                    </Button>

                </form>
            </div>
            <div className=" w-full">
                <div className="w-full border-none text-center sm:!border-b mt-10 sm:mt-0 sm:text-start sm:border-gray-300 pt-5 p-4 dark:border-gray-600 text-3xl font-semibold ">
                    <h2>
                        Search Results...
                    </h2>
                </div>


                {
                    loading &&
                    <div className='flex justify-center items-center h-1/2'>
                        <div className="flex items-center gap-1">
                            <span>
                                Loading...
                            </span>
                            <Spinner size="md" />

                        </div>
                    </div>
                }
                {
                    !loading && posts.length == 0 &&
                    <div className='flex justify-center items-center h-1/2'>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <GrDocumentTime className="w-12 h-12 text-gray-500" />
                            <h2 className="text-xl text-gray-500">
                                No Posts Found
                            </h2>
                        </div>

                    </div>

                }
                {
                    !loading && posts.length > 0 &&
                    <div className="mb-20">
                        <div className="flex flex-wrap gap-8 p-5 mt-5 sm:mt-10  justify-center">
                            {
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            }
                        </div>
                        {
                            showMore &&
                            <button className="w-full text-teal-400 font-semibold text-lg text-center  mt-10" onClick={handleShowMore}>
                                Show More...
                            </button>

                        }
                    </div>

                }
            </div>
        </div>
    )
}

export default Search