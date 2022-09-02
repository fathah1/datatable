import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Filters from './components/Filters/Filters.js'
import MainTable from './components/Table/MainTable.js'
import {useState} from 'react';

function App() {
  const [filterMinBalance,setFilterMinBalance]=useState();  
  const [filterVendor,setFilterVendor]=useState();  

  const userDetails={
    name:'john doe',
    email:'jogndoe@gmail.com'
  }

  const minBalanceFilterChangeHandler = (data) =>{
    setFilterMinBalance(data);
  }
  const VendorFilterChangeHandler = (data) =>{
    setFilterVendor(data);
  }


  return (
    <div className="App">
       <NavBar/>
       <Header  user={userDetails}/>
       <Filters onMinBalanceFilterChange={minBalanceFilterChangeHandler} onVendorChange={VendorFilterChangeHandler}/>
       <MainTable minBalanceFilter={filterMinBalance} vendorFilter ={filterVendor}/>
    </div>
  );
}

export default App;
