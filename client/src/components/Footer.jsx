import React from 'react'
import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsTwitter,BsInstagram , BsGithub} from 'react-iconS/bs'
const FooterSection = () => {
  return (
    <Footer container className='border border-t-8 border-violet-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex '>
                <div className='mt-5'>
                    <Link to='/'className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple- 
                            500 to-pink-500 rounded-lg text-white'>Sara's</span>
                            Blog
                    </Link>  
                </div>
                <div className='grid grid-cols-2 gap-4  mt-5 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <FooterTitle title='About'></FooterTitle>
                        <FooterLinkGroup col>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 1
                            </FooterLink>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 2
                            </FooterLink>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 3
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Follow Us'></FooterTitle>
                        <FooterLinkGroup col>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 1
                            </FooterLink>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 2
                            </FooterLink>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Link 3
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Legal'></FooterTitle>
                        <FooterLinkGroup col>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Privacy Policy
                            </FooterLink>
                            <FooterLink 
                                href='#' 
                                target='_blank'
                                rel="oops">
                                 Terms &amp; Conditions
                            </FooterLink>
                           
                        </FooterLinkGroup>
                    </div>
                   
                </div>
               
            </div>
            <FooterDivider className='w-full'/>
            <div className='flex flex-col  sm:flex-row sm:justify-between sm:items-center'>
                   
                    <FooterCopyright href='#' by='syedsharashree' year={new  Date().getFullYear()}/ >
                    <div className='flex gap-6 mt-6 sm:mt-0 items-center'>
                        <FooterIcon  href='#' icon={BsFacebook}/>
                        <FooterIcon  href='#' icon={BsInstagram}/>
                        <FooterIcon  href='#' icon={BsTwitter}/>
                        <FooterIcon  href='#' icon={BsGithub}/>
                      
                    </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterSection