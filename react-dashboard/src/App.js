import React  from 'react';
import Header from './components/Header'
import Data from './components/Data'
import LibraryInfo from './components/library-info/library.component'
import Footer from './components/Footer';
import './App.css'

function App() {

  return (
    
    <div className='container'>
      
      <Header />
      <div className="books-div">
      <Data placeholder={"Get Books"} API_NAME={"Books"} API_ENDPOINT={process.env.REACT_APP_BOOKURL + "/books"} />
      </div>
      
      <div>
      <Data placeholder={"Get Users"} API_NAME={"Users"} API_ENDPOINT={process.env.REACT_APP_UserURL + "/users"} />
      </div>
      <div>
      <Data placeholder={"Get Library"} API_NAME={"Library"} API_ENDPOINT={process.env.REACT_APP_LibraryURL + "/library"} />
      </div>
     <div>
       <LibraryInfo API_ENDPOINT={process.env.REACT_APP_LibraryURL + "/library"}/>
     </div>
      <Footer />
    </div>
  );
}

export default App;
