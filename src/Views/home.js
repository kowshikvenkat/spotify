import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/lazy'
import { useContext } from 'react'
import { MyContext } from '../Models/data'
import noheart from '../Assets/noheart-removebg-preview.png'
import heart from '../Assets/heart (1).png'
import './home.css'
import { useNavigate } from 'react-router-dom'
import playpic from '../Assets/play.png'
function Home() {
  const navigate = useNavigate()
       const context = useContext(MyContext);
   const [data, setData] = React.useState([]);
   const[popular,setpopular] = React.useState([])
      const[video,setvideo] = React.useState([])
         const[audio,setaudio] = React.useState([])
         const[favourites,setfavourites] = React.useState([])
         React.useEffect(()=>{
if(localStorage.getItem("favourites")!=null&&localStorage.getItem("favourites")!=undefined){
  JSON.parse(localStorage.getItem("favourites"))
  setfavourites(  JSON.parse(localStorage.getItem("favourites")))

}
         },[])

  React.useEffect(() => {
    axios.get('http://localhost:5000/podcasts')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  React.useEffect(()=>
  {
data.map((val,ind)=>{
  val['watchtime']>4&&setpopular((prev)=>prev.concat(val))
  val['category']=="Video"?setvideo((prev)=>prev.concat(val)):setaudio((prev)=>prev.concat(val))
})
  },[data])
  React.useEffect(()=>{
    console.log(favourites)
  })
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
  const Popular=()=>{
    return <div className='d-flex flex-column align-items-start w-100 ' style={{overflowX:'hidden'}}>
<div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>POPULAR</h3></div>

<div className="w-100" style={{display:'flex',flexWrap:'wrap',}}>
  {
  popular.map((value,index)=>
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
  )
}
</div>
</div>
  }
  const Audio=()=>{
return <div className='d-flex flex-column align-items-start w-100' style={{overflowX:'hidden',display:'flex',flexWrap:'wrap'}}>
<div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>AUDIO</h3></div>
<div className="w-100" style={{display:'flex',flexWrap:'wrap',}}>
{
  audio.map((value,index)=>
       <div style={{width:'200px',height:'400px',background:'black',borderRadius:'10px',position:'relative'}} className='text-center m-5 py-3 podcast'>
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
  )
}</div>
</div>
  }
  const Video=()=>{
     return <div className='d-flex flex-column align-items-start w-100' style={{overflowX:'hidden',display:'flex',flexWrap:'wrap'}}>
<div className='text-light mx-2 p-2' style={{borderRadius:'10px',background:'brown'}}><h3>VIDEO</h3></div>
<div className="w-100" style={{display:'flex',flexWrap:'wrap',}}>
{
  video.map((value,index)=>
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
  )
}</div>
</div>
  }
  const CategorySearch=()=>{
       if("video".includes(context.search.toLowerCase())){
       return <Video />}     
      if("audio".includes(context.search.toLowerCase())){
      return <Audio />}     
      if("popular".includes(context.search.toLowerCase())){return <Popular />}
  }
  return (
    <div className=' w-100 text-light text-center' style={{overflowY:'scroll',height:'90%',overflowX:'hidden'}}>
    {context.search.length<1?
<div className='w-100 ' style={{position:'relative'}}>
  <div className='text-light d-flex mx-2 p-2 w-100' style={{background:' rgb(52,52,52)'}}>
  <hr className='w-100'/> <h3 className='w-100' style={{fontWeight:800}}>PODCASTS</h3>  <hr className='w-100'/></div>
  <br />
<Popular />
<Video />
<Audio />
{(localStorage.getItem("resume")!=undefined&&localStorage.getItem("resume")!=null)&&
<div className=' d-flex justify-content-center align-items-center' onClick={()=> {navigate("/items",{state:{id:JSON.parse(localStorage.getItem("resume"))}});localStorage.removeItem("resume")}} style={{position:'fixed',bottom:0,background:'brown',borderTopRightRadius:'10px',borderBottomRightRadius:'10px',width:'50%',height:'10%'}}>
<div className='d-flex align-items-center'><img src={playpic} style={{width:15,height:15,filter:'invert(1)'}} alt="" />
  <div className='h4  m-2'>Resume Playing - </div></div>
  <div  className='d-flex  align-items-center'>
    <img src={JSON.parse(localStorage.getItem("resume")).thumbnail} style={{width:55,height:55,objectFit:'cover'}} alt="" /><p className='h4'><i>{JSON.parse(localStorage.getItem("resume")).name}</i></p>
  </div>
</div>
}
</div>:<div className='w-100 d-flex' style={{overflowX:'hidden',display:'flex',flexWrap:'wrap'}}>
  {
    data.map((value,index)=>{
      if(value['name'].toLowerCase().includes(context.search.toLowerCase())){
        if(value['category']!="Video"){
        return    <div  style={{width:'200px',height:'400px',background:'black',borderRadius:'10px',position:'relative'}} className='text-center m-5 py-3 podcast'>
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
        }
        else{
          return      <div  style={{width:'200px',height:'400px',background:'black',borderRadius:'10px',position:'relative'}} className='text-center m-5 py-3 podcast'>
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
        }
      }
         })

      
  }
    <CategorySearch />  
 
</div>
    }
    </div>
  )
}
export default Home
