import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react'

function SideBar() {
  const [toggles, setToggles] = useState(false);

  const navRef = useRef();
  function toggle() {
    setToggles(navRef.current.classList.toggle("nav_responsive"));
    console.log("hello")
  }
  return (
   <>
   <div className='w-24 bg-purple-500 '>
    <ul>
      <li>
  HELLO
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <span className="header_ham" onClick={toggle}>
          {!toggles ? <Menu /> : <X />}
        </span>
   </div>
   </>
  )
}

export default SideBar