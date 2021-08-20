import React from 'react'
import Nav1 from '../navs/Nav1'

function Error() {
    return (
        
            <>
            <Nav1/>
                {localStorage.removeItem("username")}
            <div className="error">
            <h1 id="msg">
            An Error occured!!</h1>
            <p>Please Try Again</p>
            
            <a href="/sign-in"><button type="button" className="btn btn-info">sign-in</button></a>
             </div>
        </>
    )
}

export default Error
