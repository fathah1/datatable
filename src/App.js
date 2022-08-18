import './App.css';
import Table from './components/Table/Table.js'
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import {useState} from 'react';

function App() {
  const [showNav,setShowNav] = useState(false);

  const toggle = () => {
    setShowNav(!showNav);
  } 

  return (
    <div className="App">
       <NavBar visible={showNav}/>
       <Header toggle={toggle}/>
       <Table />
    </div>
  );
}

export default App;
