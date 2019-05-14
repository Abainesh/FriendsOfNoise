import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
import { Field, Control } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';

const colors = {
  Default: '',
  primary: 'primary',
  info: 'info',
  danger: 'danger',
  warning: 'warning',
  success: 'success',
  white: 'white',
  black: 'black',
  light: 'light',
  dark: 'dark',
  link: 'link',
};

class Header extends Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      // <nav className="navbar"
      //     aria-label="main navigation"
      //     style={{
      //       borderBottom: 'solid 1px',
      //     }}>
      //   <div className="navbar-brand">
      //   <NavLink
      //     className="navbar-item"
      //     to="/"
      //     activeClassName="is-active"
      //     >
      //     <img
      //       style={{
      //         borderTopLeftRadius: '50%',
      //         borderTopRightRadius: '50%',
      //         borderBottomLeftRadius: '50%',
      //         borderBottomRightRadius: '50%',
      //         marginRight: 15
      //       }}
      //       src="../images/logo.png"
      //       width="50px"
      //       alt="Home of Noise"
      //       />
      //     </NavLink>
      //     <button className="button navbar-burger" onClick={this.toggleNav}>
      //       <span></span>
      //       <span></span>
      //       <span></span>
      //     </button>
      //   </div>
      //   <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
      //     <div className="navbar-start">
      //     <NavLink
      //       className="navbar-item"
      //       to="/"
      //       activeClassName="is-active"
      //       >
      //       <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-heart"></i>
      //       </span>
      //       Home
      //       </NavLink>
      //     <NavLink
      //       className="navbar-item"
      //       to="/signup"
      //       activeClassName="is-active"
      //       >
      //       <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-heart"></i>
      //       </span>
      //       Sign up
      //       </NavLink>
      //       <NavLink
      //         className="navbar-item"
      //         to="/signin"
      //         activeClassName="is-active"
      //         >
      //         <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-crow"></i>
      //         </span>
      //         Sign in
      //         </NavLink>
      //         <NavLink
      //           className="navbar-item"
      //           to="/calendar"
      //           activeClassName="is-active"
      //           >
      //           <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-crow"></i>
      //           </span>
      //           Calendar
      //           </NavLink>
      //       <div className="navbar-item has-dropdown is-hoverable">
      //         <a className="navbar-link"  href="#overview">
      //           Overview
      //         </a>
      //         <div className="navbar-dropdown">
      //         <NavLink
      //           className="navbar-item"
      //           to="/about"
      //           activeClassName="is-active"
      //           >
      //           <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-crow"></i>
      //           </span>
      //           About Us
      //           </NavLink>
      //           <hr className="navbar-divider" />
      //           <NavLink
      //             className="navbar-item"
      //             to="/membership"
      //             activeClassName="is-active"
      //             >
      //             <span className="icon has-text-primary" style={{ marginRight: 5 }}> <i class="fas fa-crow"></i>
      //             </span>
      //             Membership
      //             </NavLink>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="navbar-end">
      //       <a className="navbar-item" href="https://twitter.com/friendsofnoise">
      //         <span className="icon has-text-info" style={{ color: '#0084FF' }}>
      //           <i class="fab fa-lg fa-twitter"></i>
      //         </span>
      //           @FriendsOfNoise
      //       </a>
      //
      //     </div>
      //   </div>
      // </nav>


      <Navbar>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </Navbar.Item>
        <Navbar.Burger
          // active={open}
          // onClick={() =>
          //   this.setState(state => {
          //     open: !state.open;
          //   })
          // }
        />
      </Navbar.Brand>
      <Navbar.Menu>
      //active={  }
        <Navbar.Container>
          <Navbar.Item href="#">Second</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item href="#">At the end</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    )
  }
}

export default Header;
