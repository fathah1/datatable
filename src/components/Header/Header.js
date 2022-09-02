import '../../styles/Header.css'
import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import { useEffect } from 'react';


function Header(props) {

  const [MenuVisibility,setMenuVisibility] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const userData = props.user;

  const profileClickHandler = (()=>{
    setMenuVisibility(!MenuVisibility);
    console.log("menu visibility", MenuVisibility);
   
  })


  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
  



  useEffect(()=> {
    if(isEmpty(props.user)){
      setLoggedIn(false);
    }
    else{
      setLoggedIn(true);
    }
  },[props.user]);




  const Usermenu = () =>{
     
    return(   
      <AnimatePresence>
      <motion.div 
      className="list-group userMenuDetails"
      key="userMenuDetails"
      initial={{y:"-50%",opacity:-2,scale:0.7 }}
      animate={{y:0,opacity:1, scale:1}}
      exit={{y:"50%", opacity:0}}
      transition={{duration:0.2,ease:"easeOut"}}
      >
        <ul>
          <a className="list-group-item list-group-item-action"><h4 className="menuDetails" >{userData.name}</h4></a>
          <a className="list-group-item list-group-item-action"><h4 className="menuDetails">{userData.email}</h4></a>
          <a href="#" className="list-group-item list-group-item-action "><h4 className="text-danger menuDetails">Log Out</h4></a>
        </ul>
    
     </motion.div>     
     </AnimatePresence>    


    )
}






  return (
    <div className="Header">

       <div className="headerComponents" >
        {loggedIn ? <img onClick={profileClickHandler} src={props.user.image} alt="user Image" /> : <button className = "btn">Log in</button>}
       </div>

    
         {loggedIn && MenuVisibility ?  Usermenu(): ""}
       

    </div>
  );
}

export default Header;