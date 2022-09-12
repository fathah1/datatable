import '../../styles/NavBar.css'
import {TocRounded ,DashboardRounded, AttachMoneyRounded} from '@material-ui/icons'
import Item from './Item.js'
import {motion} from 'framer-motion'
import {useState} from 'react';



function NavBar() {

  const [open,setOpen] = useState(false);

  const handleToggle = () =>{
    setOpen(!open)
  }

  const sideContainerVariants = {
    true: {
      width: "30rem",
    },
    false: {
      width:"7rem",
      transition: {
        delay: 0.2,
      },
    },
  };

  const sidebarVariants = {
    true: {width: "30rem"},
    false: {
      width: "7rem",
      transition: {
        delay: 0.2,
      },
    },
  };


  const linesIconVariants = {
    true: {marginLeft: "80%"},
    false: {
      marginLeft:"25%",
      transition: {
        delay: 0.2,
      },
    },
  };

  const smalllogoVariants = {
    true: {
            display:'none',
            opacity:0
          },
    false: {
      display:'initial',
      opacity:1,
      transition: {
        delay: 0.1,
      },
    },
  };

  const biglogoVariants = {
    true: {
            display:'initial',
            opacity:1
          },
    false: {
      display:'none',
      opacity:0,
      transition: {
        delay: 0.1,
      },
    },
  };


  


  return (
    <motion.div 
    variants = {sideContainerVariants}
    initial={`${open}`}
    animate={`${open}`}
    className="NavBarContainer">
      
      <motion.div 

      variants={sidebarVariants}
      initial={`${open}`}
      animate={`${open}`}
      
      className="NavBar">

        {/* lines_icon */}
        <motion.div className="buttonContainer"
        variants={linesIconVariants}
        initial={`${open}`}
        animate={`${open}`}
        >
          
        <motion.div
         whileHover={{
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
        className="lines_icon"
        labelstyle={{ fontSize: '300%' }}
        >
          
          <TocRounded className= "allIcons"/>

        </motion.div>

        </motion.div>

        


         <div className="logoContainer">
            <motion.h3
            variants={smalllogoVariants}
             className="Logo"
             initial={`${open}`}
             animate={`${open}`}
            
             > TE </motion.h3>
              <motion.h3
            variants={biglogoVariants}
             className="Logo"
             initial={`${open}`}
             animate={`${open}`}
            
             > Trade Easy </motion.h3>
         </div>

         <div className="groups">
           <div className="group">
             <Item icon={<DashboardRounded className= "allIcons"/>} name='Dashboard' />
             <Item icon={<AttachMoneyRounded className= "allIcons"/>} name='Sales' />
           </div>
         </div>



      </motion.div>
   
    </motion.div>
  );
}

export default NavBar;
