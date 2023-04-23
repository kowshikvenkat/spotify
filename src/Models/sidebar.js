import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/spotify.png'
import indialogo from '../Assets/india.png'
import uslogo from '../Assets/united-kingdom.png'
import frenchlogo from '../Assets/france.png'
import { useContext } from 'react';
import { MyContext } from './data'
const Sidebar = () => {
  const context = useContext(MyContext);
    const[lang,setlang]= React.useState([{0:indialogo,1:'Hindi'},{0:uslogo,1:'English'},{0:frenchlogo,1:'French'}])
    
    const[langno,setlangno] = React.useState(0)
  return (
 <div
      style={{ display: 'flex' , height: 'auto', overflow: 'scroll initial' }}
    >
      <CDBSidebar className='border' textColor={'white'} backgroundColor={'#333'}>
        <CDBSidebarHeader style={{}} prefix={<i className="fa fa-bars fa-large"></i>}>
          <div
            href="#l"

            className="text-decoration-none w-100 m-0"
            style={{ color: 'inherit'}}
          >
           <img src={logo} style={{width:'30%',height:'30%'}} alt="" /> SPOTIFY
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent textColor={'white'} className="sidebar-content">
          <CDBSidebarMenu className='cdbsidebarmenu'>
            <NavLink to="/" onClick={()=>context.updateMessage("home")} className={'text-light'} >
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink className={'text-light'}  activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="table" onClick={()=>context.updateMessage("search")}>Search</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/fav" className={'text-light'} onClick={()=>context.updateMessage("favourites")} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Favourites</CDBSidebarMenuItem>
            </NavLink>
            <NavLink className='text-light' activeClassName="activeClicked">
              <CDBSidebarMenuItem className=''>
                <i>India</i>  <i>Australia</i> <i>Israel</i> <i>Bhutan</i> <br /> <i>Japan</i>  <i>Russia</i>  <i>U.S</i>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              target="_blank"
              activeClassName="activeClicked"
              className={'text-light'}
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                <a style={{textDecoration:'none'}} target="_blank" href="https://www.spotify.com/in-en/legal/privacy-policy/">
                    Policy
                </a>
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
<hr />
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
           <button onClick={()=>setlangno((prev)=>prev!=2?prev+1:prev-2)} style={{background:'transparent',borderRadius:'10px',color:'white',padding:5}}><img src={lang[langno][0]} style={{width:20,height:20}} alt="" />&nbsp;{lang[langno][1]}</button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;