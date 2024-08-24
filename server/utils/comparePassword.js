import bcyrpt from "bcrypt";

export const matchPassword = (password,PasswordValue) => {
    const passwordMatch = bcyrpt.compareSync(password,PasswordValue );
  console.log(passwordMatch,"password match")
    return passwordMatch;
}
