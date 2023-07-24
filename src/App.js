import { useState } from "react";
import "./App.css";
// import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from './components/TextForm';
import Alert from "./components/Alert";


// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); //whether dark mode is enabled or not
  const [alert,setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      },1500);
  }

  const removeBodyClasses = ()=>{
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-danger')
  }
  const toggleMode = (cls)=>{
    removeBodyClasses();
    console.log(cls)
    document.body.classList.add('bg-' +cls)
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled","success");
      document.title = 'TextUtils - DarkMode';
      //user ka dhyan aakarshit karne ke liye but ye karna nhi chahiye website me acha nhi hota 
      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing Mode';
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now';
      // }, 1500);
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled","success");
      document.title = 'TextUtils - LightMode';
    }
  }
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils"/> */}
      {/* <Navbar/> */}
      {/* <Router>  */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      {/* <Routes> */}
        {/* users --> Component 1
        users --> --> Component 2       this is the main use of exact keyword it will exactly find the place because initially react use partial routing*/}
          {/* <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />}></Route> */}
          <TextForm showAlert={showAlert} heading="Try TextUtils - Word Couneter, Character Counter, Remove extra spaces" mode={mode} />
        {/* </Routes> */}
        </div>
        {/* </Router>
        <About/> */}
    </>
  );
}

export default App;


