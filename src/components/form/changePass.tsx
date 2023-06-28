import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import { User } from '../../models/user';
import bcrypt from 'bcryptjs';
import getAxiosInstanceCustom from '../../connection/axios_connection';

interface ChangePass{
    user: any;
}

const ChangePasswordForm: React.FC<ChangePass> = (props: ChangePass) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [cerror,setCError] = useState<string>('');
  const [currentUser, setCurentUser] = useState<User>(props.user);
  const [changed, setChanged] = useState<boolean>(false);

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(currentUser.password)

    if(!await bcrypt.compare(currentPassword, currentUser.password)){
        setCError('Incorrect password');
        return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password regex pattern: at least 8 characters, containing at least one letter and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        'Weak password'
      );
      return;
    }

    // Handle form submission - replace with your logic
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    currentUser.password = newPassword
    setCurentUser(currentUser);
    console.log(currentUser)
    getAxiosInstanceCustom().post(`/user/update/${currentUser.username}`, currentUser);
    setChanged(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <form className='change_form' onSubmit={handleSubmit}>
        <h1>Change your password</h1>
      <TextField
        type="password"
        label="Current Password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        // fullWidth
        margin="normal"
        error={cerror !== ''}
        helperText={cerror}
      />
      <TextField
        type="password"
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        // fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        // fullWidth
        margin="normal"
        error={error !== ''}
        helperText={error}
      />
      {
        changed?
        <Alert severity="success">Password changed</Alert>:<></>
      }
      <Button type="submit" variant="contained" color="primary">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
