import React, { Component } from 'react';
import NavLink from 'react-router-dom/NavLink';
// import { Field, Control } from 'react-bulma-components/lib/components/form';
// import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';

class Header extends Component {

  state = { active: false }

  toggleNav = () => {
     const { active } = this.state;
     this.setState({ active: !active });
  }

  render() {
    return (
      <Navbar collapseOnSelect color="primary" fixed="top" active={this.state.active}>

      <Navbar.Brand>
        <Navbar.Item>
          <NavLink
            to="/"
            activeClassName="navbar-menu is-active"
            >
            <img
              src="../images/logo.png"
              alt="Friends of Noise : Home of Noise!"
              width="112"
              height="28"
            />
          </NavLink>
        </Navbar.Item>

        <Navbar.Burger
          active={this.state.active}
          onClick={this.toggleNav}
        />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container>
          <div className="navbar-start">
          <Navbar.Item>
          <NavLink
            to="/"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-laugh-squint"></i>
            </span>
            Home
            </NavLink>
            </Navbar.Item>

          <NavLink
            className="navbar-item"
            to="/signup"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-heart"></i>
            </span>
            Sign up
          </NavLink>

          <NavLink
            className="navbar-item"
            to="/signin"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-grin-tongue-squint"></i>
            </span>
            Sign in
          </NavLink>

          <NavLink
            className="navbar-item"
            to="/profile"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-trophy"></i>
            </span>
            My Profile
          </NavLink>

          <NavLink
            className="navbar-item"
            to="/calendar"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-crow"></i>
            </span>
            Calendar
          </NavLink>

          <NavLink
            className="navbar-item"
            to="/store"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-store"></i>
            </span>
            Store
          </NavLink>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link"  href="#overview">
              Overview
            </a>
            <div className="navbar-dropdown">

              <NavLink
                className="navbar-item"
                to="/about"
                activeClassName="is-active"
                >
                <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-hand-peace"></i>
                </span>
                About Us
                </NavLink>

                <hr className="navbar-divider" />

                <NavLink
                  className="navbar-item"
                  to="/membership"
                  activeClassName="is-active"
                  >
                  <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-gem"></i>
                  </span>
                  Membership
                </NavLink>
              </div>
            </div>
          </div>
        </Navbar.Container>

        <Navbar.Container position="end">
          <Navbar.Item href="https://twitter.com/friendsofnoise">
              <span className="icon" style={{ color: '#0084FF' }}>
                <i class="fab fa-lg fa-twitter"></i>
              </span>
              <span /> @FriendsOfNoise
          </Navbar.Item>

          <NavLink
            className="navbar-item"
            to="/logout"
            activeClassName="is-active"
            >
            <span className="icon has-text-warning" style={{ marginRight: 5 }}> <i class="fas fa-wave"></i>
            </span>
            Logout
          </NavLink>
        </Navbar.Container>

      </Navbar.Menu>
    </Navbar>
    )
  }
}

export default Header;
