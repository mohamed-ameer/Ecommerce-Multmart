import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from "../../routers/Routers";
function Layout() {
  return (
    <>
      <Header/>
      <main>
        <Routers/>
      </main>  
      <Footer/>
    </>
  )
}

export default Layout
