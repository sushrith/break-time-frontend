import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../../../node_modules/antd/dist/antd.css';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './nav.css'
import { Avatar } from 'antd';

class Nav2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navTog: true
    };
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container" >
            <Link className="navbar-brand" to={"/sign-in"}>Break Time</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span onClick={() => { this.setState({ navTog: !this.state.navTog }) }} className="navbar-toggler-icon"></span>
            </button>
            {
              (this.state.navTog) ?
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/welcome"}><HomeOutlined /> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/chooseIntrest"}>Choose-Interest</Link>
                    </li>

                    <span id="nav2">
                      <li className="nav navbar-nav navbar-right">
                        <Link className="nav-link" to={"/logout"}><UserOutlined /> Logout</Link>
                      </li>
                      <li className="nav navbar-nav navbar-right">
                        <Link className="nav-link" to={"/logout"}>
                          <Avatar style={{ backgroundColor: "orange", verticalAlign: 'middle', }} size="small">{localStorage.getItem('username').charAt(0)}</Avatar> LoggedIn as {localStorage.getItem('username')}</Link>
                      </li>
                    </span>

                  </ul>
                </div>
                :
                <div className="collapsed">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/welcome"}><HomeOutlined /> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/chooseIntrest"}>Choose-Interest</Link>
                    </li>

                    {/* <span id="nav3"> */}
                      <li className="nav navbar-nav navbar-right">
                        <Link className="nav-link" to={"/logout"}><UserOutlined /> Logout</Link>
                      </li>
                      <li className="nav navbar-nav navbar-right">
                        <Link className="nav-link" to={"/logout"}>
                          <Avatar style={{ backgroundColor: "orange", verticalAlign: 'middle', }} size="small">{localStorage.getItem('username').charAt(0)}</Avatar> LoggedIn as {localStorage.getItem('username')}</Link>
                      </li>
                    {/* </span> */}

                  </ul>
                </div>
            }

          </div>
        </nav>
      </div>





    )
  }
}

export default Nav2;