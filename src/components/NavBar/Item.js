import React from 'react'
import {motion} from 'framer-motion'
import '../../styles/items.css'

function Item({icon,name}) {

const subHeading = {
    true:{
        opacity:1,
        display:'initial'
    },
    false:{
        opacity:0,
        display:'none'
    }
}

  return (
    <motion.div
    whileHover ={{
        backgroundColor:"#623cea"
    }}

    transition ={{
        type:'none',
        duration:0.1
    }}
    
    className='item'>
        <motion.div className="itemIcon">
            {icon}
        </motion.div>
        <motion.span variants={subHeading}>
           {name}
        </motion.span>
    </motion.div>
  )
}

export default Item