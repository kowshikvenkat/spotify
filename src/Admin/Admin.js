import React from 'react'
import './Admin.css'
import axios from 'axios'
import LoadingScreen from 'react-loading-screen'
function Admin() {
  const[category,setcategory] = React.useState("")
  const[name,setname] = React.useState("")
  const[desc,setdesc] = React.useState("")
  const[file,setfile] = React.useState()
  const[tn,settn]  = React.useState()
  const[speaker,setspeaker] = React.useState("")
  const[loading,setloading] = React.useState(false)
  function handlesubmit(e){
e.preventDefault()
setloading(true)
let thumbnail="";
let filedata = "";
const formdata = new FormData()
const videoformdata = new FormData()
formdata.append("file",tn)
formdata.append("upload_preset", "axjn5pob")
axios.post("https://api.cloudinary.com/v1_1/ds27l3mqz/auto/upload",formdata).then((res)=>{if(res){
  thumbnail=res.data.secure_url
videoformdata.append("file",file)
videoformdata.append("upload_preset", "axjn5pob")
axios.post("https://api.cloudinary.com/v1_1/ds27l3mqz/auto/upload",videoformdata,{
    headers:{
    "Content-Type":'multipart/form-data'
  }
}).then((res)=>{if(res){
  console.log("uploaded successfully")
  filedata  = res.data.secure_url
  axios.post("https://spotifybackend.onrender.com/newpodcast",{
    name:name,
    desc:desc,
    category:category,
    speaker:speaker,
    thumbnail:thumbnail,
    filedata:filedata
  })
  setloading(false)
}})
}})
  }
  return (
    <div className=' h-100 d-flex justify-content-center align-items-center'>
      <LoadingScreen
    loading={loading}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    text='Hang On'
  > 
  </LoadingScreen>
      <form action="" name="myform" onSubmit={handlesubmit} className='border bg-light my-5 d-flex flex-column w-50 align-items-center text-left'>
      <h5><b><u>Add New Podcast</u></b></h5>
      <div className='form-group'> <label htmlFor="">Podcast Name : </label> <input className='form-control' onChange={(e)=>setname(e.target.value)} type="text" placeholder='name' /></div>
         <div className='form-group'> <label htmlFor="">Podcast Description : </label> <input className='form-control' type="text"  onChange={(e)=>setdesc(e.target.value)} placeholder='description' required/></div>
         <div className='form-group'> <label htmlFor="">Podcast Category : </label> <select onChange={(e)=>setcategory(e.target.value)} className='form-select' name="" id="" required>
         <option value=""></option>
            <option value="Video">Video</option>
              <option value="Audio">Audio</option>
         </select></div>
        {category.length>1 &&(category=="Video"? <div className='d-flex form-group flex-column'><label htmlFor="">Upload Video (Max Limit 100MB)</label>
       <input onChange={(e)=>setfile(e.target.files[0])} className='form-control' type="file" accept='video/*' required/>
         <label htmlFor="">Thumbnail</label><input onChange={(e)=>settn(e.target.files[0])}  className='form-control' type="file" accept='image/*' required/>
         </div>: <div className='d-flex form-group flex-column'><label htmlFor="">Upload Audio (Max Limit 100MB)</label>
     <input onChange={(e)=>setfile(e.target.files[0])} type="file" accept='.mp3,audio/*' required/>
         <label htmlFor="">Thumbnail</label><input onChange={(e)=>settn(e.target.files[0])} type="file" accept='image/*' required/>
         </div>)}
         <div className='form-group'> <label htmlFor="">Podcast Speaker : </label> <input className='form-control' type="text" onChange={(e)=>setspeaker(e.target.value)} placeholder='Speaker' /></div> <br />
         <input className='btn btn-primary w-25' type="submit" value="Add Podcast" />
      </form>
    </div>
  )
}

export default Admin
