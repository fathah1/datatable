import './App.css';
import Table from './components/Table/Table.js'
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'

function App() {
  return (
    <div className="App">
       <NavBar />
       <Header/>
       <Table />
    </div>
  );
}

export default App;
