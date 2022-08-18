import '../../styles/Header.css'
import { FaBars } from 'react-icons/fa'

function Header({toggle}) {
  return (
    <div className="Header">
       <div onClick={toggle}></div>

       <div className="mid"></div>

       <div>
        <img src="https://icons-for-free.com/iconfiles/png/512/user+icon-1320190636314922883.png" alt="" />
        <h6>    admin</h6>
       </div>
    </div>
  );
}

export default Header;