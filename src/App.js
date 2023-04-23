import Admin from "./Admin/Admin";
import Home from "./Views/home";
import Sidebar from './Models/sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./Models/navbar";
import { Routes,Route,useLocation,useNavigate} from 'react-router-dom';
import './App.css'
import React from "react";
import Login from "./Controllers/login";
import Items from "./Views/items";
import { MyContext } from "./Models/data";
import Favourites from "./Views/favourites";
import { useContext } from 'react'
function App() {

    function MyProvider(props) {
  const [message, setMessage] = React.useState("");
const[search,setsearch] = React.useState("")
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  }
   const updatesearch = (newMessage) => {
    setsearch(newMessage);
  }

  return (
    <MyContext.Provider value={{ message, updateMessage,search,updatesearch }}>
      {props.children}
    </MyContext.Provider>
  );
}
 function Navigation(){
      const context = useContext(MyContext);
    const navigate = useNavigate()
React.useEffect(()=>{
  
if(localStorage.getItem("name")==undefined||localStorage.getItem("name")==null){
navigate("/login")
}
},[])
React.useEffect(()=>{
  if(context.message=="search")
  navigate("/")

})
return null
 }

  return (
<MyProvider>
        
      <div style={{fontFamily:'Roboto',height:'100vh',width:window.innerWidth}} className="App d-flex ">
      <Navigation />
          <Sidebar />
       <div className="w-100 bg-dark">
       <Navbar />
         <Routes>
              <Route exact path="/" element={  <Home />} />
       <Route exact path="/Admin" element={  <Admin />} />
              <Route exact path="/Login" element={  <Login />} />
                    <Route exact path="/items" element={  <Items />} />
                             <Route exact path="/fav" element={  <Favourites />} />
        </Routes>
       </div>
    </div>
</MyProvider>
  );
}

export default App;
