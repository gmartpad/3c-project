import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import React, { useState } from 'react'

function Nav() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <>
      <Sidebar
        variant="drawer"
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Header showSidebarButton={true} onShowSidebar={toggleSidebar} />
    </>
  )
}

export default Nav
