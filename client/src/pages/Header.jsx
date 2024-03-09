import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

const Header = () => {
  const location = useLocation().pathname;
  return (
    
    <Navbar className='border-b-2'>
          <Link to='/'className='self-center whitespace-nowrap text-sm
          sm:text-xl front:semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sara's</span>
                Blog
          </Link>
          <form>
            <TextInput
               type='text'
               placeholder='Search..'
               rightIcon={AiOutlineSearch}
               className='hidden lg:inline'
            />
          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
          </Button>
          <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                 <FaMoon/>
            </Button>
            <Link to='/sign-in'>
               <Button  outline gradientDuoTone="purpleToPink">
                    sign in
               </Button>
            </Link>
            
          </div>
          <NavbarToggle/>
          <Navbar.Collapse>
            <Navbar.Link active={location==='/'} as="div">
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={location==='/projects'} as="div">
                <Link to='/projects'>
                    Projects
                </Link>
            </Navbar.Link>
            <Navbar.Link active={location==='/about'} as="div">
                <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
          </Navbar.Collapse>
    </Navbar>
  )
}

export default Header