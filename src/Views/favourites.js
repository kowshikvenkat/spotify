import React from 'react'
import noheart from '../Assets/noheart-removebg-preview.png'
import heart from '../Assets/heart (1).png'
import './home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Favourites() {
    const navigate = useNavigate()
    const[data,setData] = React.useState([])
      const[favourites,setfavourites] = React.useState([])
        const[favouritesarr,setfavouritesarr] = React.useState([])
         React.useEffect(()=>{
if(localStorage.getItem("favourites")!=null&&localStorage.getItem("favourites")!=undefined){
  JSON.parse(localStorage.getItem("favourites"))
  setfavourites(  JSON.parse(localStorage.getItem("favourites")))

}
         },[])
         function changefav(id){
if(localStorage.getItem("favourites")==null||localStorage.getItem("favourites")==undefined){
  setfavourites((prev)=>prev.concat(id))
  let x = favourites
x.push(id)
  localStorage.setItem("favourites",JSON.stringify(x))
}else{
  if(favourites.includes(id)){
 setfavourites(prev=>prev.filter(e=>e!==id))
   let x =   JSON.parse(localStorage.getItem("favourites"))

   x= x.filter(e=>e!=id)

   localStorage.setItem("favourites",JSON.stringify(x))}
   else{
setfavourites(prev=>prev.concat(id))
  let x =   JSON.parse(localStorage.getItem("favourites"))
x.push(id)
  localStorage.setItem("favourites",JSON.stringify(x))
   }
}
}

  React.useEffect(() => {
    axios.get('https://spotifybackend.onrender.com/podcasts')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  React.useEffect(()=>{
    data.map((value,index)=>{
favourites.map((val,ind)=>{
    if(value["_id"]==val){
        setfavouritesarr((prev)=>prev.concat(value))
    }
})
    })
  },[data])
  return (
    <div className='d-flex flex-column align-items-start w-100 text-light' style={{overflowX:'hidden',display:'flex',flexWrap:'wrap'}}>
  {favouritesarr.length>0? <>   <div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>YOUR FAVOURITES</h3></div>
<div className="w-100" style={{display:'flex',flexWrap:'wrap'}}>
      {favouritesarr.map((value,index)=>
       <div  style={{width:'200px',height:'400px',background:'black',borderRadius:'10px',position:'relative'}} className='text-center m-5 py-3 podcast'>
<h6>{value['name']}</h6>
{
  favourites.includes(value['_id'])? <img src={heart} onClick={()=>changefav(value["_id"])} style={{width:15,height:15,position:'absolute',top:5,right:10}} alt="" /> :  <img src={noheart} onClick={()=>changefav(value["_id"])} style={{width:15,height:15,position:'absolute',top:5,right:10}} alt="" />
}
<div onClick={()=>{
        navigate("/items",{state:{id:value}})
       }} className="w-100">
  <img src={value['thumbnail']} style={{width:'200px',height:'200px',objectFit:'cover',}} alt="" />

<div className='d-flex flex-column justify-content-between' style={{height:'150px'}} >
  <p style={{fontSize:14,margin:10}}>{value['desc']}</p>
<h6 className='text-danger ' style={{fontWeight:800}}>{value['speaker']}</h6>
</div>
</div>

      </div>
  )}
</div>
</>
:<h3 className='text-light'>
    No Favourites !
</h3>}
    </div>
  )
}

export default Favourites
