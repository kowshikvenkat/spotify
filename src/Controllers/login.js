import React from 'react'
import {OAuthProvider,getAuth,GoogleAuthProvider,signInWithPopup,signOut,deleteUser} from 'firebase/auth';
import  app  from '../Models/firebase';
import { Link ,useNavigate} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import { useContext } from 'react';
import { MyContext } from '../Models/data'
var cryptojs = require("crypto-js")

function Login() {
    const context = useContext(MyContext);
    const[loading,setloading] = React.useState(false)
      let navigate = useNavigate()
        const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
       provider.setCustomParameters({
      prompt:'select_account'
       })
      const signInWithGoogle = ()=>{
      signInWithPopup(auth,provider).then((result)=>{
let name = cryptojs.AES.encrypt(result.user.displayName,'kowshik123').toString()
localStorage.setItem('name',name)
context.updateMessage("loggedin")
navigate('/')
}).catch((error)=>{
    setloading(true)
console.log(error.message)
})
}
React.useEffect(()=>{
if(localStorage.getItem("name")==undefined||localStorage.getItem("name")==null)
signInWithGoogle()
},[])
  return (
    <div className='w-100'>
        <LoadingScreen
    loading={loading}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    text='We Have A Problem Signing You In!'
  > </LoadingScreen>
    </div>
  )
}

export default Login
