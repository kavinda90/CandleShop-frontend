import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header1 } from '../components'

const HomeLayout = () => {
  return (
    <>
    <Header1 />
    <Outlet />
    <Footer />
    </>
  )
}

export default HomeLayout