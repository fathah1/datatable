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

  const filterChangeHandler = (data) =>{
    console.log("filter has been changed", data)
    setFilterMinBalance(data);
  }

  return (
    <div className="App">
       <NavBar visible={showNav}/>
       <Header toggle={toggle}/>
       <Filters onFilterChange={filterChangeHandler}/>
       <MainTable minBalanceFilter={filterMinBalance} />
    </div>
  );
}

export default App;
