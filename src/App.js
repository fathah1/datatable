import './App.css';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Filters from './components/Filters/Filters.js'
import MainTable from './components/Table/MainTable.js'
import {useState} from 'react';

function App() {
  const [filterMinBalance,setFilterMinBalance]=useState();  
  const [filterVendor,setFilterVendor]=useState();  

  //Change to Dynamic from API data
  const userDetails={
    image:"https://icons-for-free.com/iconfiles/png/512/user+icon-1320190636314922883.png",
    name:'john doe',
    email:'johndoe@gmail.com'
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
