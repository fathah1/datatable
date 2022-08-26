import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Filters from './components/Filters/Filters.js'
import MainTable from './components/Table/MainTable.js'
import {useState} from 'react';

function App() {
  const [showNav,setShowNav] = useState(false);
  const toggle = () => {
    setShowNav(!showNav);
  } 

  const [filterMinBalance,setFilterMinBalance]=useState();  
  const [filterVendor,setFilterVendor]=useState();  


  const minBalanceFilterChangeHandler = (data) =>{
    setFilterMinBalance(data);
  }

  const VendorFilterChangeHandler = (data) =>{
    setFilterVendor(data);
  }


  return (
    <div className="App">
       <NavBar visible={showNav}/>
       <Header toggle={toggle}/>
       <Filters onMinBalanceFilterChange={minBalanceFilterChangeHandler} onVendorChange={VendorFilterChangeHandler}/>
       <MainTable minBalanceFilter={filterMinBalance} vendorFilter ={filterVendor}/>
    </div>
  );
}

export default App;
