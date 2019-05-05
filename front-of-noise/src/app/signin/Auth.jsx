import React, {Component} from 'react';

/* Import Components */
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';

class Auth extends Component {

  state = {
    authenticated: false
  }

  loginWithEmailAndPassword = () => { this.setState({ authenticated: true }) }

  loginWithProvider = () => { this.setState({ authenticated: true }) }

  handleClose = () => { this.setState({ authenticated: false }) }

  render() {
    return(
      <section className="section">
        <Tile renderAs="article" kind="parent" notification color="primary">
        <div className="has-text-centered" style={{ padding: '10px 8px' }}>
        <Heading>Log in!</Heading>
        <Heading subtitle>or <a href="/signup">register</a>~</Heading>
        </div>
        <div className="has-text-centered">
          <LoginButton icon="google" name="Google" onClick={this.loginWithProvider} />
          <LoginButton icon="twitter" name="Twitter" onClick={this.loginWithProvider} />
          <LoginButton icon="facebook" name="Facebook" onClick={this.loginWithProvider} />
        </div>

        <div className="has-text-centered" style={{ margin: '10px 0' }}>
          <span style={{ verticalAlign: 'middle', padding: '0 10px' }}><hr /> OR <hr /></span>
        </div>

        <LoginForm handleSubmit={this.loginWithEmailAndPassword} />

        <SignInSuccess active={this.state.authenticated} handleClose={this.handleClose} />
        </Tile>

      </section>
    )
  }
}

const LoginButton = ({ icon, name, onClick }) => (
  <div className="field">
    <p className="control button is-medium is-danger" style={{ width: '300px' }} onClick={onClick}>
      <span className="icon">
        <i className={`fab fa-${icon}`} aria-hidden="true"></i>
      </span>
      <span>{`Sign In With ${name}`}</span>
    </p>
  </div>
);

class LoginForm extends Component {

  state = {
    email: null,
    password: null
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => this.props.handleSubmit(this.state)

  render() {
    return (
      <div className="container has-text-centered box" style={{ maxWidth: '350px' }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit();
          }}>
          <div className="field">
          <p class="control has-icons-left has-icons-right">
            <label className="label" htmlFor="email">Email</label>
            <div className="control">
              <input className="input" name="email" type="email" placeholder="email" required onChange={this.handleChange} />
              <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            </div>
            </p>
          </div>

          <div className="field">
           <p class="control has-icons-left">
            <label className="label" htmlFor="password">Password</label>
            <div className="control">
              <input className="input" name="password" type="password" placeholder="password" required onChange={this.handleChange}/>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              </div>
            </p>
          </div>

          <div className="field">
            <div className="control buttons is-centered">
              <input className="button is-medium is-danger is-fullwidth" type="submit" value="Sign In" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const SignInSuccess = ({ active, handleClose }) => (
  <div className={`modal ${active && 'is-active'}`}>
    <div className="modal-background" onClick={handleClose}></div>
    <div className="modal-content">
      <div className="notification is-success has-text-centered">
        <button className="delete" onClick={handleClose}></button>
        <p>
          <span className="icon is-large">
            <i className="fa fa-check-square fa-2x"></i>
          </span>
          <span className="title"> Sign In Succesful!</span>
        </p>

      </div>
    </div>
  </div>
);

export default Auth;
