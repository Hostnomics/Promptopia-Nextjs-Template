// import React from 'react'

'use client';
// we are using the browsers capabilities so use client

//built out (~1:16:00): https://youtu.be/wm5gMKuwSYk?t=4566
import { SessionProvider } from 'next-auth/react'

//get children and current session from props
const Provider = ({ children, session}) => {

  //want this to be higher order component, which means we wrap the children with session provider tags:
  return (
    <SessionProvider session={session}>     
       {children}
    </SessionProvider> 


  )
}

export default Provider