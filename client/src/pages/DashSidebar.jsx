import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const DashSidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const [tag, setTag] = useState('')
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const getTag = params.get('tag')
        if (getTag) {
            setTag(getTag)
        }
    }, [location.search])
    const handleSignOut = async () => {
        console.log("cv");

        try {
            dispatch(signoutStart())
            const data = await fetch("/api/user/signout", {
                method: "POST"
            })
            const res = await data.json()
            if (res.success === false) {
                dispatch(signoutFailure(res.message))

            }
            else {

                dispatch(signoutSuccess())

            }
        }
        catch (err) {
            dispatch(signoutFailure(err.message))

        }

    }

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='
                flex flex-col gap-1'>
                    <Link to="/dashboard?tag=profile">
                        <Sidebar.Item active={tag === 'profile'} icon={HiUser} label={
                            currentUser.isAdmin ? "Admin" : "User"
                        } labelColor="dark" as={'div'} >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentUser.isAdmin && <Link to="/dashboard?tag=post">
                            <Sidebar.Item active={tag === 'post'} icon={HiDocumentText} as={'div'} >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    }

                    {
                        currentUser.isAdmin && <Link to="/dashboard?tag=user">
                            <Sidebar.Item active={tag === 'user'} icon={HiOutlineUserGroup} as={'div'} >
                                User
                            </Sidebar.Item>
                        </Link>
                    }

                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut} >
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar