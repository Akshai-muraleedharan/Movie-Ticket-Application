


export const errorSignupHandler = (req,res,next) => {
        try {
            // console.log(req.body)
            const { email, username, password, city,confirmPassword,mobile } = req.body;

            if (!email || email.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Email is required", value: 'email' });
            }

            if (!password || password.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Password is required", value: 'password' });
            }

            if (password != confirmPassword) {
                return res.status(400).json({ success: false, message: "password does not match" ,value:'confirm-paassword'});
              }

            if (!username || username.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Username is required", value: 'username' });
            }
           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email) ) {
                return res.status(400).json({ success: 'error', message: "Invalid email format", value: 'email' });
            }

            if (!mobile || mobile.trim() === "" ) {
                return res.status(400).json({ success: 'error', message: "mobile number is required", value: 'mobile' });
            }


            const cleanedMobile = mobile.replace(/\D/g, '');
    if (cleanedMobile.length < 10 || cleanedMobile.length > 15) {
        return res.status(400).json({ success: 'error', message: "Mobile number must be between 10 and 15 digits", value: 'mobile' });
    }
    
           
    
            if (!city || city.trim() === "") {
                return res.status(400).json({ success: 'error', message: "City is required", value: 'city' });
            }
            

            next();
        } catch (error) {
            res.status(error.status || 501).json(error.message || "internal  errorHandler error")
        }
}



export const loginErrorHandler = (req,res,next)=> {
    try {

        const {email,password} =req.body; 

        if (!email || email.trim() === "") {
            return res.status(400).json({ success: 'error', message: "Email is required", value: 'email' });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ success: 'error', message: "Password is required", value: 'password' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email) ) {
                return res.status(400).json({ success: 'error', message: "Invalid email format", value: 'email' });
            }

            next()

    } catch (error) {
        res.status(error.status || 501).json(error.message || "internal  errorHandler error")
    }
};



export const otpErroHandler = async (req,res,next) => {

    try {
        const { mobile,otp} = req.body;
        if(!mobile || mobile.trim() == '' ) return res.json({success:false,message:"mobile requird",value: 'mobile' })
        if(!otp || otp.trim() == '') return res.json({success:false,message:"otp requird",value: 'otp' })
          
          
            next()

    } catch (error) {
        res.status(error.status || 501).json(error.message || "internal  errorHandler error")
    }
}