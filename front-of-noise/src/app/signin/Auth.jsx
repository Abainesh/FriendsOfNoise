import React, {Component} from 'react';
import {auth} from '../../Firebase'
import '../../_components/SocialButtonList.css'
//import SocialButtonList from '../../_components/SocialButtonList'
import{withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';


/* Import Components */
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';

const buttonList = {
    github: {
        visible:true, 
        provider:()=>{
            const provider = auth.githubOAuth();
            provider.addScope('user');
            return provider;
        }
    }, 
    twitter: {
    visible: true,
    provider: () => auth.twitterOAuth()
  },
  facebook: {
    visible: true,
    provider: () => auth.facebookOAuth()
  },
    
    email: {
        visible:true,
        provider:()=>auth.emailOAuth()
    }
    
    
};

class Auth extends Component {

    componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/profile');      
      }
    });
  }

  render() {
    return(
      <Section>
      <Tile kind="parent">
        <Tile renderAs="article" kind="child" size="8" notification color="primary">

          <Heading size="2" weight="semibold" spaced >Welcome back, friend!</Heading>
          <Heading subtitle>need to <a href="/signup">register</a> or <a href="/forgot">forgot password</a>?
          </Heading>

        <Section size="4by3">
          <div className="has-text-centered">
              <SocialButtonList buttonList={buttonList} auth={auth.getAuth} />
          </div>
        </Section>

        
        </Tile>
        </Tile>
      </Section>
    )
  }
}


//This is the propTypes object representing
//the props that the socialbuttonlist below 
//is expecting
const propTypes = {
  buttonList: PropTypes.shape({
    github: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
      email: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
    twitter: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
    facebook: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    })
  }).isRequired,
  auth: PropTypes.func.isRequired,
  currentProviders: PropTypes.func
};

const defaultProps = {
  currentProviders: null
};

//socialbuttonlist component
//buttonList and auth props required
//currentProvider is optional
const SocialButtonList = ({ history, buttonList, auth, currentProviders }) => {
  const authHandler = authData => {
    //auth data is an object that comes from 
      //firebase 
      if (authData) {
      if (currentProviders === null) {
        history.push('/profile');
      } else {
        currentProviders(authData.user.providerData);
      }
    } else {
      console.log('Error authenticating');
    }
  };

function onSignIn(user) {
   // token_id = user.getAuthResponse().id_token
 //this.setState({token_id});
}
    
//providerData is an array of objects 
    //which contains the connected social
    //accounts associated to the current User
  const authenticate = (e, provider) => {
    const providerOAuth = buttonList[provider].provider();
//function is called when someone clicks 
      //one of social buttons to login to connect
      // a social account
    if (!auth().currentUser) {
        var user;
      auth()
        .signInWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => console.error(err));
    } else {
      auth()
        .currentUser.linkWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => console.error(err));
    }
  };
//this prop object has the firebase function to call 
    //each specific provider oAuth method
    //and is used to sign in or link another provider
    //to current user
  const renderButtonList = provder => {
    const visible = buttonList[provder].visible;
//this is where we call the authenticate method
    return (
      <button
        key={provder}
        className={`btn__social btn--${provder} ${!visible && 'hidden'}`}
        onClick={e => authenticate(e, provder)}
      >
        {provder}
      </button>
    );
  };
//this finally returns list of social buttons
  return (
    <div className="btn__social--list">
      {Object.keys(buttonList).map(renderButtonList)}
    </div>
  );
};

SocialButtonList.propTypes = propTypes;
SocialButtonList.defaultProps = defaultProps;

//export default withRouter(SocialButtonList);

export default withRouter(Auth);
