import '../../styles/NavBar.css'
import {TocRounded ,DashboardRounded, AttachMoneyRounded} from '@material-ui/icons'
import Logo from "./Logo.js"
import Item from './Item.js'
import {motion} from 'framer-motion'
import {useState} from 'react';



function NavBar(props) {

  const [open,setOpen] = useState(false);

  const handleToggle = () =>{
    setOpen(!open)
  }

  const sideContainerVariants = {
    true: {
      width: "30rem"
    },
    false: {
      width:"7rem",
      transition: {
        delay: 0.2,
      },
    },
  };

  const sidebarVariants = {
    true: {width: "25rem"},
    false: {
      width: "5rem",
      transition: {
        delay: 0.2,
      },
    },
  };

  // const profileVariants = {
  //   true: {
  //     alignSelf: "center",
  //     width: "4rem",
  //   },
  //   false: {
  //     content:'TE',
  //     alignSelf: "flex-start",
  //     marginTop: "2rem",
  //     width: "3rem",
  //   },
  // };

  return (
    <motion.div 
    data-Open = {open}
    variants = {sideContainerVariants}
    initial={`${open}`}
    animate={`${open}`}
    className="NavBarContainer">
      
      <motion.div 
      data-Open = {open}
      variants={sidebarVariants}
      initial={`${open}`}
      animate={`${open}`}
      
      className="NavBar">



        <motion.div whileHover={{
          scale:1.2,
          rotate:180,
          backgroundColor:"rgba(255,255,255,0.3)",
          backdropFilter:"blur(3.5px)",
          border: "1px solid rgba(255,255,255,0.18)",
          transition: {
            delay:0.2,
            duration:0.4
          }
        }} 
        onClick={handleToggle}
        className="lines_icon">


          <TocRounded className="Lines"/>
        </motion.div>
         <div className="logoContainer">
           <Logo className="logoText"/>
         </div>

         <div className="groups">
           <div className="group">
            <Item className="MenuIcons"  icon={<DashboardRounded size="3rem"/>} name='Dashboard' />
            <Item className="MenuIcons" icon={<AttachMoneyRounded/>} name='Sales' />
           </div>
         </div>



      </motion.div>
   
    </motion.div>
  );
}

export default NavBar;
