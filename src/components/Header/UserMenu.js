import React, { useEffect, useRef, useState } from 'react'
import './usermenu.css';
import { AnimatePresence,motion } from 'framer-motion';
const UserMenu = ({props}) => {
  const [isMenu,setIsMenu] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const getClickOutside = (e) => {
      if(isMenu && e.target !== menuRef.current ){
        setIsMenu(false);
      }
    }
    window.addEventListener('click',getClickOutside);
    return () => {
      window.removeEventListener('click',getClickOutside);
    }
  },[isMenu]);
  return (
    <li className='user-menu-container'>
      <div className={isMenu ? "user-data active" :"user-data"} onClick={() => setIsMenu(!isMenu)}>
        <img src={user.image} alt="user" className='rounded-image' />
        <AnimatePresence>
        {isMenu && (
        <motion.ul
         initial={{opacity:0,y:"-50%"}}
         animate={{opacity:1,y:"0%"}}
         exit={{opacity:0,y:"-50%",transition:{duration:"0.35"}}}
         transition={{type:"spring",stiffness:"100", duration:"0.75"}} 
        className="user-menu"
        ref={menuRef}
        >
          <li>{user.email}</li>
          <li>Profile</li>
          <li>Logout</li>
        </motion.ul>
        )}
        </AnimatePresence>
      </div>
    </li>
  )
}

export default UserMenu;