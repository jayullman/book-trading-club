/** 
 * This module contains the Page component as well as the components that will
 * render the profile information section and the update profile and password forms.
 * The UserSettingsPage component will contain the user information and pass down as
 * props to the other components.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import '../styles/usersettingspage.css';

// this component will display the user's profile information
const UserProfile = (props) => {
  const {
    firstName, 
    lastName, 
    city, 
    state
  } = props;

  return (
    <div className='profile-info-container'>
      <h3>Profile Information</h3>
      <div className='profile-fields-left'>
        <div>
          First Name: 
        </div>
        <div>
          Last Name:
        </div>
        <div>
          City:
        </div>
        <div>
          State:
        </div>
      </div>
      <div className='profile-fields-right'>
        <div className='user-info-field'>
          {firstName}
        </div>
        <div>
          {lastName}
        </div>
        <div>
          {city}
        </div>
        <div>
          {state}
        </div>
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
      stateField: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }


  handleChange(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.setState({ [field]: value });
  }

  handleUpdateClick() {
    const { firstNameField, lastNameField, cityField, stateField } = this.state;
    this.setState({
      firstNameField: '',
      lastNameField: '',
      cityField: '',
      stateField: ''
    });
    this.props.updateProfile.call(
      null, firstNameField, lastNameField, cityField, stateField
    );
  }

  render() {
    const { firstNameField, lastNameField, cityField, stateField } = this.state;    
    return (
      <div>
        <h3>Update Profile Information</h3>
        <form className='column'>
          <label htmlFor='firstNameField'>
            First Name
            <input id='firstNameField' name='firstNameField' value={firstNameField} type='text' onChange={this.handleChange} />
          </label>
          <label htmlFor='lastNameField'>
            Last Name
            <input id='lastNameField' name='lastNameField' value={lastNameField} type='text' onChange={this.handleChange} />
          </label>
          <label htmlFor='cityField'>
            City
            <input id='cityField' name='cityField' value={cityField} type='text' onChange={this.handleChange} />
          </label>
          <label htmlFor='stateField'>
            State
            <input id='stateField' name='stateField' value={stateField} type='text' onChange={this.handleChange} />
          </label>
        </form>
        <button 
          onClick={this.handleUpdateClick}
        >
          Update
        </button>
        <div className='message-display'>{this.props.message}</div>
      </div>
    ); 
  }
}

UpdateProfileForm.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  message: PropTypes.string
};

class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPasswordField: '',
      newPasswordField: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.setState({ [field]: value });
  }

  handleUpdatePassword() {
    const { currentPasswordField, newPasswordField } = this.state;
    this.setState({
      currentPasswordField: '',
      newPasswordField: ''
    });
    this.props.updatePassword.call(null, currentPasswordField, newPasswordField);
  }

  render() {
    const { currentPasswordField, newPasswordField } = this.state;
    return (
      <div>
        <h3>Update Password</h3>
        <form className='column'>
          <label htmlFor='currentPasswordField'>
            Current Password
            <input id='currentPasswordField' name='currentPasswordField' value={currentPasswordField} type='password' onChange={this.handleChange} />
          </label>
          <label htmlFor='newPasswordField'>
            New Password
            <input id='newPasswordField' name='newPasswordField' value={newPasswordField} type='password' onChange={this.handleChange} />
          </label>
        </form>
        <button
          onClick={this.handleUpdatePassword}
        >
          Update
        </button>
        <div className='message-display'>{this.props.message}</div>
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
      passwordAreaMessage: '',
      profileInfoAreaMessage: ''
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
      console.log(data);
      // only updates state if there is a value in the field
      this.setState({
        firstName: data.firstName || this.state.firstName,
        lastName: data.lastName || this.state.lastName,
        city: data.city || this.state.city,
        state: data.state || this.state.state
      });
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        this.setState({ 
          profileInfoAreaMessage: 'Access denied. Try logging in again to update profile information.' 
        });
      }
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
        if (error.response.status === 401) {
          this.setState({ 
            passwordAreaMessage: 'Access denied. Try logging in again to update password.' 
          });
        }
      });
    }
  }

  render() {
    const { firstName, lastName, city, state } = this.state;
    return (
      <div className='user-settings-page'>
        <h2>Settings Page for {this.props.currentUser}</h2>
        <UserProfile
          firstName={firstName}
          lastName={lastName}
          city={city}
          state={state}
        />
        <hr />
        <UpdateProfileForm
          updateProfile={this.updateProfile}
          message={this.state.profileInfoAreaMessage}
        />
        <hr />        
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
