import { SignUpPageButton } from '../ui/buttons/Buttons';
import logo from "../../assets/image/movie-logo.webp";
import { Link } from 'react-router-dom';

function ClientAndAdminHeader() {
    
    
    return (
      <>
        <div className="w-full header_padd flex justify-between items-center p-3 bg-white px-10 h-20 shadow-lg sticky top-0">
       
        <div className="flex gap-3 items-center ">
          <img className="w-10 img_dis" src={logo} alt="logo" />
          <h1 className="p-2 rounded font-semibold bg-black text-white font_adj">Movie Ticket</h1>
        </div>
  
          <nav className="flex items-center capitalize gap-4 font-semibold ">
        
            <div className='font_adj_signup'>
              <Link > <SignUpPageButton/> </Link>
            </div>
          </nav>
         
        </div>
      </>
    );
  }
  


export default ClientAndAdminHeader