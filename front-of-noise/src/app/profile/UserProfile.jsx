import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SocialButtonList from '../../_components/SocialButtonList';
import SocialProfileList from '../../_components/SocialProfileList';
import Layout from '../../_components/Layout';
import {auth} from '../../Firebase'
import Firebase from 'firebase';
import Auth from "../signin/Auth";

//import { render } from 'react-dom'
import '../../_components/UserProfile.css'

class UserProfile extends Component {
    
    static propTypes = {
        providerData: PropTypes.arrayOf(PropTypes.object).isRequired
    };

static defaultProps = {
    providerData:[]
};

state = {
    buttonList: {
      github: {
        visible: true,
        provider: () => {
          const provider = auth.githubOAuth();
          provider.addScope('user');
          return provider;
        }
      },
      twitter: {
        visible: true,
        provider: () => auth.twitterOAuth()
      },
      email: {
        visible:true,
        provider:()=>auth.emailOAuth()
      },
      facebook: {
        visible: true,
        provider: () => auth.facebookOAuth()
      }
    },
    providerData: this.props.providerData
  };

getUserData=()=>{
    let ref = Firebase.database().ref('/');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    this.setState(state);
  });
  console.log('DATA RETRIEVED');
}

componentDidMount() {
    this.updateProviders(this.state.providerData);
    this.getUserData();
  }

handleCurrentProviders = providerData => {
    this.updateProviders(providerData);
  };

  updateProviders = providerData => {
    let buttonList = { ...this.state.buttonList };

    providerData.forEach(provider => {
      const providerName = provider.providerId.split('.')[0];
      buttonList = this.updateButtonList(buttonList, providerName, false);
    });

    this.setState({ buttonList, providerData });
  };

  handleUnlinkedProvider = (providerName, providerData) => {
    if (providerData.length < 1) {
      auth
        .getAuth()
        .currentUser.delete()
        .then(() => console.log('User Deleted'))
        .catch(() => console.error('Error deleting user'));
    }

    let buttonList = { ...this.state.buttonList };
    buttonList = this.updateButtonList(buttonList, providerName, true);

    this.setState({ buttonList, providerData });
  };

  updateButtonList = (buttonList, providerName, visible) => ({
    ...buttonList,
    [providerName]: {
      ...buttonList[providerName],
      visible
    }
  });

  render() {
    return (
      <Layout>
        <h1>Secure Area</h1>
            
        <SocialProfileList
          auth={auth.getAuth}
          providerData={this.state.providerData}
          unlinkedProvider={this.handleUnlinkedProvider}
        />
        <p style={{ textAlign: 'center' }}>
          <strong>Connect Other Social Accounts</strong>
        </p>
        <SocialButtonList
          buttonList={this.state.buttonList}
          auth={auth.getAuth}
          currentProviders={this.handleCurrentProviders}
        />
        <button
          className="btn__logout"
          onClick={() => auth.getAuth().signOut()}
        >
          Logout
        </button>
      </Layout>
    );
  }


}

  
export default UserProfile;
