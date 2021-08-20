class AuthenticationService{

    save=(username)=>{
        
        localStorage.setItem('username',username);
    }

    isUserLoggedIn=()=>{
        let user= localStorage.getItem('username'); 
        if(user)
        {
            return true;
        }
        else
        return false;
    }
}
export default AuthenticationService
