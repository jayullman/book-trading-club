// TODO: delete fields when updating profile
// TODO: add the email to the heading 'Profile Information fo {user's email}

/** 
 * This module contains the Page component as well as the components that will
 * render the profile information section and the update profile and password forms.
 * The UserSettingsPage component will contain the user information and pass down as
 * props to the other components.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

// this component will display the user's profile information
const UserProfile = (props) => {
  const {
    firstName, 
    lastName, 
    city, 
    state
  } = props;

  return (
    <div>
      <h2>Profile Information</h2>
      <div>
        First Name: {firstName}
      </div>
      <div>
        Last Name: {lastName}
      </div>
      <div>
        City: {city}
      </div>
      <div>
        State: {state}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string
};

// this component will allow user to update profile information
class UpdateProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameField: '',
      lastNameField: '',
      cityField: '',
      stateField: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.setState({ [field]: value });
  }

  render() {
    const { firstNameField, lastNameField, cityField, stateField } = this.state;
    return (
      <div>
        <h2>Update Profile Information</h2>
        <form>
          Update First Name
        <input name='firstNameField' value={firstNameField} type='text' onChange={this.handleChange} />
          Update Last Name
        <input name='lastNameField' value={lastNameField} type='text' onChange={this.handleChange} />
          Update City
        <input name='cityField' value={cityField} type='text' onChange={this.handleChange} />
          Update State
        <input name='stateField' value={stateField} type='text' onChange={this.handleChange} />
        </form>
        <button 
          onClick={this.props.updateProfile.bind(
            null, firstNameField, lastNameField, cityField, stateField
            )}
        >
          Update
        </button>
      </div>
    ); 
  }
}

UpdateProfileForm.propTypes = {
  updateProfile: PropTypes.func.isRequired
};

class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPasswordField: '',
      newPasswordField: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.setState({ [field]: value });
  }

  render() {
    const { currentPasswordField, newPasswordField } = this.state;
    return (
      <div>
        <h2>Update Password</h2>
        <form>
          Current Password
        <input name='currentPasswordField' value={currentPasswordField} type='password' onChange={this.handleChange} />
          Update Last Name
        <input name='newPasswordField' value={newPasswordField} type='password' onChange={this.handleChange} />
        </form>
        <button
          onClick={this.props.updatePassword.bind(
            null, currentPasswordField, newPasswordField
          )}
        >
          Update
        </button>
        <div>{this.props.message}</div>
      </div>
    );
  }
}

UpdatePasswordForm.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  message: PropTypes.string
};

class UserSettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      passwordAreaMessage: ''
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  componentWillMount() {
    // gets users profile information
    const userInfo = axios.post('/userprofileinfo', {
      email: this.props.currentUser
    });

    userInfo.then(({ data }) => {
      console.log(data);
      this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        state: data.state
      });
    });
  }

  updateProfile(firstName, lastName, city, state) {
    const updatedProfile = axios.post('/updateuserprofileinfo', {
      firstName,
      lastName,
      city,
      state
    });

    updatedProfile.then(({ data }) => {
      // only updates state if there is a value in the field
      this.setState({
        firstName: data.firstName || this.state.firstName,
        lastName: data.lastName || this.state.lastName,
        city: data.city || this.state.city,
        state: data.state || this.state.state
      });
    });
  }

  updatePassword(currentPassword, newPassword) {
    // display error message if user does not fill out both password fields
    if (!currentPassword || !newPassword) {
      this.setState({ passwordAreaMessage: 'Both password fields are required' });
    } else {
      this.setState({ passwordAreaMessage: '' });      
      const updatedPassword = axios.post('/updatepassword', {
        currentPassword,
        newPassword
      });

      updatedPassword.then(({ data }) => {
        console.log(data);

        // display error messages from the server in the message area
        if (data.error) {
          this.setState({ passwordAreaMessage: data.error });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    const { firstName, lastName, city, state } = this.state;
    return (
      <div>
        <UserProfile
          firstName={firstName}
          lastName={lastName}
          city={city}
          state={state}
        />
        <UpdateProfileForm
          updateProfile={this.updateProfile}
        />
        <UpdatePasswordForm
          updatePassword={this.updatePassword}
          message={this.state.passwordAreaMessage}
        />
      </div>
    );
  }
}

UserSettingsPage.propTypes = {
  currentUser: PropTypes.string.isRequired
};

export default UserSettingsPage;
