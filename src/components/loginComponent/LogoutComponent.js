import React,{Component} from 'react';
import Nav1 from '../navs/Nav1';
class LogoutComponent extends Component{
    
    render(){
        
        return(
            <><Nav1/>
                {localStorage.removeItem("username")}
                {localStorage.removeItem("Id")}
                <div className="logout"> 
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Break-Time
                    </div> 
                <br/>
                <a href="/sign-in"><button type="button" className="btn btn-info">sign-in</button></a>
                </div>
            </>
        );
    }
}
export default LogoutComponent