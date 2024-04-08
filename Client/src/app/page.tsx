"use client"
import React from 'react'
import Navbarr from './components/navbar/page'
import MainSection from './components/mainsection/page'
import Footer from './components/footer/page'

function page() {
  return (
    <div>

      <Navbarr/>
      <MainSection/>
      <Footer/> 
      <style jsx>{`
        .container {
          min-height: calc(100vh - 150px);
          position: relative;
        }
      `}</style> 
      </div>
  )
}

export default page