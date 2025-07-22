import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

function Applayout() {
  return (
    <div>
      <main className='min-h-screen'>
         <Header/>
         <Outlet/>
      </main>
      <div className='text-center text-lg font-medium bg-cyan-50 mt-5 p-8 text-slate-600'>
         Made with 💗 by Jnanjyoti
      </div>
    </div>
  )
}

export default Applayout