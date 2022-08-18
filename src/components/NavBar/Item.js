import React from 'react'
import {motion} from 'framer-motion'

function Item({icon,name}) {

const subHeading = {
    true:{
        opacity:1
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
        <motion.div className="iconContainer">
            {icon}
        </motion.div>
        <motion.span variants={subHeading}>
           {name}
        </motion.span>
    </motion.div>
  )
}

export default Item