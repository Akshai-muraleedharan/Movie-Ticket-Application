import React from "react";
import { Link } from "react-router-dom";

function CommonButton() {
  return (
    <Link>
      <div className="bg-blue-500 text-white px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
        login
      </div>
    </Link>
  );
}

export default CommonButton;
