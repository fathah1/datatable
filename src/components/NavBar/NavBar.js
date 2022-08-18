import '../../styles/NavBar.css'
import NavBarElems from "./NavBarElems.js"
import styled from "styled-components";

const NavBarDiv = styled.div`
--navbar-width: 250px;
 width: var(--navbar-width)
 position:relative;
 background-color: #12192c;
 color:white;
 z-index:1000;

 &::before{
  content:"";
  position:absolute;
  width:100%;
  height:100%;
  z-index:-1;
 }

 @media(max-width: 700px){
  position:fixed;
  transform:translate3d(${p=>p.visible ? 0 : "calc(var(--navbar-width) - var(--navbar-width)*2)"}, 0, 0);
 }


`;

function NavBar(props) {
  return (
    <NavBarDiv className="NavBar" {...props}>
       <NavBarElems {...props} />
    </NavBarDiv>
  );
}

export default NavBar;
