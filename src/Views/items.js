import React from 'react'
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import noheart from '../Assets/noheart-removebg-preview.png'
import heart from '../Assets/heart (1).png'
import axios from 'axios';
function Items() {
    const location = useLocation();
    const [item,setitem] = React.useState([])
     const videoRef = React.useRef(null);
    React.useEffect(()=>{
setitem(location.state.id)

    },[])
   const[favourites,setfavourites] = React.useState([])
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
 const handlePause = (event) => {
  let x=item;
    x.currentTime=event.target.currentTime
    console.log(x)
    localStorage.setItem("resume",JSON.stringify(x))
  };
    const handleReady = () => {
      axios.post("http://localhost:5000/addwatchtime",{
        id:item["_id"]
      })
      if(item['currentTime'])
    videoRef.current.seekTo(item['currentTime'])
    else
       videoRef.current.seekTo(0)
  };
  return (
    <div className=' text-light'>
      <div className='d-flex flex-column align-items-center w-100' style={{overflowX:'hidden',}}>
{item['category']=="Video"?<div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>VIDEO</h3></div>:<div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>AUDIO</h3></div>}


       <div style={{width:'60%',height:'60%',background:'black',borderRadius:'10px',position:'relative'}} className='text-center m-5 '>
<h6 className='p-3'>{item['name']}</h6>
{
  favourites.includes(item['_id'])? <img src={heart} onClick={()=>changefav(item["_id"])} style={{width:15,height:15,position:'absolute',top:5,right:10}} alt="" /> :  <img src={noheart} onClick={()=>changefav(item["_id"])} style={{width:15,height:15,position:'absolute',top:5,right:10}} alt="" />
}
{item['category']=="Video"?<ReactPlayer                                                    
 className="videoFrame"
 url={item['file']}
light={item['thumbnail']}
ref={videoRef}
 onPlay={handleReady}
width="100%"
height="200px"
 playing
 controls
 onPause={handlePause}
/>:
<ReactPlayer                                                    
 className="videoFrame"
 url={item['file']}
light={item['thumbnail']}
ref={videoRef}
 onPlay={handleReady}
width="100%"
height="200px"
 playing
 controls
  onPause={handlePause}
 style={{backgroundImage: `url(${item['thumbnail']})`,backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}
/>}
<div className='d-flex flex-column justify-content-around' style={{height:'150px'}} >
  <p style={{fontSize:14,marginTop:5}}>{item['desc']}</p>
<h6 className='text-danger ' style={{fontWeight:800}}>{item['speaker']}</h6>
</div>
      </div>
  

</div>
      
    </div>
  )
}

export default Items
