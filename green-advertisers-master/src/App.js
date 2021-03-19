import React from 'react';
import "./assets/style.scss";
import "./assets/bootstrap.min.css";
import Navbar from './components/Navbar';
import Main from './components/Main';
import Hoarding from './components/Hoarding';

const App = (props) => {
    return ( 
            <div className="App ">
                <div className="container-fluid px-0 overflow-hidden">
                    <Main/>
                    {/* <Hoarding/> */}
                </div>
            </div> 
        );
}
 
export default App;