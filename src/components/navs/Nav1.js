import React from 'react'
import { Link } from "react-router-dom";
import {UsergroupAddOutlined} from '@ant-design/icons';

function Nav1() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
<div className="container">
  <Link className="navbar-brand" to={"/sign-in"}>Break Time</Link>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-in"}><UsergroupAddOutlined /> Sign in</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-up"}><UsergroupAddOutlined /> Sign up</Link>
      </li>
    </ul>
  </div>
</div>
</nav>
        </div>
    )
}

export default Nav1


