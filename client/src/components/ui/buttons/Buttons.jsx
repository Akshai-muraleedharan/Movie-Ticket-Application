import React from "react";


export function LoginButton() {
  return (
    
      <div className="bg-blue-500 text-white px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
        login
      </div>
    
  );
}


export function LoginPageButton({loading}) {

  return (
    
    <button className="bg-blue-500 text-white text-center px-6 py-2 font-normal uppercase tracking-wider rounded-sm disabled:opacity-80 disabled:cursor-not-allowed" disabled={loading === true}>
         {loading === true ? "Loading..." : "login"}  
      </button> 
    
  );
}

export function SignUpPageButton({loading}) {
 
  return (
    
     <button className="bg-blue-500 text-white text-center px-6 py-2 font-normal uppercase tracking-wider rounded-sm disabled:opacity-80 disabled:cursor-not-allowed" disabled={loading === true}>
        {loading === true ? "Loading..." : "Sign-up"}
      </button> 
    
  );
}


export function AddMovieButton({loading}) {


  return (
         
     <button className="bg-green-500 text-white text-center px-6 py-2 font-normal uppercase tracking-wider rounded-sm disabled:opacity-80" disabled={loading === true}>
           {loading === true ? "Loading..." : "Add - movie"}        
      </button>  
    
  );
}

export function CreateTheater() {
  return (
    
      <button className="bg-green-500 text-white text-center px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
        submit
      </button>
    
  );
}

export function Otpgenerate() {
  return (
    
      <button className="bg-green-500 text-white text-center w-full px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
        Generate Otp
      </button>
    
  );
}

export function AddSheduleButton() {
  return (
    
      <button className="bg-green-500 text-white text-center w-full px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
       Add shedule
      </button>
    
  );
}

export function CreateSeatButton({loadings}) {
  return (
    
    loadings === false ?   <button className="bg-green-500 text-white text-center w-full px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
     Create Seat
      </button> : <button disabled className="bg-green-300 cursor-not-allowed text-white text-center w-full px-6 py-2 font-normal uppercase tracking-wider rounded-sm">
     Loading ... 
      </button>
    
  );
}


