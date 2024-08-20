import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommonButton from "./ui/buttons/CommonButton";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

function Header() {
  const [toggles, setToggles] = useState(false);

  const navRef = useRef();
  function toggle() {
    setToggles(navRef.current.classList.toggle("nav_responsive"));
  }
  return (
    <>
      <div className="w-full flex justify-between items-center p-3 px-10 h-20 shadow-lg ">
        <div>logo</div>

        <nav
          className="flex items-center capitalize gap-4 font-semibold header-responsive"
          ref={navRef}
        >
          <Link>Home</Link>
          <Link>About-us</Link>

          <div>
            <CommonButton />
          </div>
        </nav>
        <span className="header_ham" onClick={toggle}>
          {!toggles ? <Menu /> : <X />}
        </span>
      </div>
    </>
  );
}

export default Header;
