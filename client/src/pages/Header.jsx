import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
const Header = () => {
  const location = useLocation().pathname;
  const dispatcher = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { theme } = useSelector(state => state.theme)
  return (

    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
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
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatcher(toggleTheme())} >
          {
            theme == 'light' ? <FaMoon /> : <FaSun />
          }

        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser.photoURL}
                rounded
              />
            }>
            <Dropdown.Header>
              <span className='block text-sm '>@{currentUser.email}</span>
              <span className='block text-sm '>{currentUser.username}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tag=profile'>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>

            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>
              Sign Out
            </Dropdown.Item>
          </Dropdown>) : (
          <Link to='/sign-in'>
            <Button outline gradientDuoTone="purpleToPink">
              sign in
            </Button>
          </Link>
        )
        }
        <NavbarToggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={location === '/'} as="div">
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={location === '/projects'} as="div">
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
        <Navbar.Link active={location === '/about'} as="div">
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header