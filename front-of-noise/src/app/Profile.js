import React from 'react';
import UserProfile from './profile/UserProfile';

const Profile = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Friends of Noise</h1>
      <p className="subtitle">
        All ages <strong>always</strong>!
      </p>
      <p className="membertagline">
        Ask about how to be sponsored for a membership.
      </p>
    <div className="col-md-6">
      <br />
      <UserProfile />
    </div>
    </div>
  </section>
);

export default Profile;
