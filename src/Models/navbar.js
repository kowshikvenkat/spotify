import React from 'react'
import signinpic from '../Assets/sign-out.png'
import searchpic from '../Assets/search.png'
import member from '../Assets/user.png'
import { useContext } from 'react'
import { MyContext } from './data'
function Navbar() {
  const context = useContext(MyContext);
  const inputref= React.createRef()
  const[inputwidth,setinputwidth] = React.useState(false)
  const[username,setusername] = React.useState("")
  const cryptojs = require("crypto-js")
React.useEffect(()=>{
if(context.message=="loggedin"){
  
  var bytes = cryptojs.AES.decrypt(localStorage.getItem('name'),'kowshik123')
setusername(()=> bytes.toString(cryptojs.enc.Utf8))

}
  if(context.message=="search"||context.message=="home"){
    setinputwidth(true)
inputref.current.focus()
  }

})
React.useEffect(()=>{
  if(localStorage.getItem("name")!=undefined&&localStorage.getItem("name")!=null){
var bytes = cryptojs.AES.decrypt(localStorage.getItem('name'),'kowshik123')
setusername(()=> bytes.toString(cryptojs.enc.Utf8))}
})
  return (
    <div className='w-100 d-flex justify-content-between ' style={{background:'black',height:'10%'}}>
    <div className='bg-light m-2 d-flex align-items-center p-2' style={{borderRadius:20}} >
        <h6 style={{fontWeight:800}} className=''>25+ Million Songs</h6>
     
    </div>
      <div className='m-2 d-flex text-light' onClick={()=>setinputwidth(true)}>
         <input type="text" ref={inputref} style={{width:inputwidth?400:40,transition:'0.3s ease-out'}} placeholder='Categories / Podcasts' className='form-control' onChange={(e)=>{context.updatesearch(e.target.value);context.updateMessage("search")}} onKeyUp={()=>context.updateMessage("")} /><label htmlFor=""><img src={searchpic} style={{height:40,width:40,filter:'invert(1)'}} alt="" /></label>
      </div>
      <div className='bg-light m-2 d-flex align-items-center mx-4 p-2' style={{borderRadius:20}}><img src={member} style={{height:20,width:20}} alt="" /><div style={{fontWeight:'800'}}>{username}</div></div>
    </div>
  )
}
 
export default Navbar
