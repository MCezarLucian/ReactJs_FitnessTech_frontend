import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import Header from '../../components/header/header';
import './forgot_pass.scss';
import getAxiosInstanceCustom from '../../connection/axios_connection';
import { UserContext } from '../../contexts/user_context';
import { UserContextType } from '../../models/user';

interface ErrorType{
    value: boolean;
    message: string;
    checked: boolean;
}

interface Mail{
    to: string;
    subject: string;
    text: string;
}

const generateRandomPassword = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
    return password;
};

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<ErrorType>({
    value: true,
    message: 'Please complete the email field',
    checked: false,
  });
  const {users} = useContext<UserContextType>(UserContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    error.checked = true;
    if(/^\S+@\S+\.\S+$/.test(email)){
        // error.message = 'An email have been send';
        // error.value = false;
        setError({...error, value: false, message: 'An email have been send'});
        const password:string = generateRandomPassword(8);
        const mail: Mail = {
            to: email,
            subject: 'Changed Password',
            text: `Your temporary password is ${password}. Please change it with first occasion.`,
        };
        const myUser = users.find( user => user.email === email);
        
        if(myUser){
            myUser.password = password;
        }

        console.log(password);

        try{
            getAxiosInstanceCustom().post(`/user/update/${myUser?.username}`, myUser);
            getAxiosInstanceCustom().post('/email', mail);
        }
        catch(error){
            console.log("Can't send email");
        }
    }
    else{
        // error.message = 'Please provide a valid email';
        // error.value = true;
        setError({...error, value: true, message: 'Please provide a valid email'});
    }
    console.log('Forgot password form submitted');
    console.log(error);
  };

  return (
    <div className='forgot_main'>
        <Header/>
        <Container className='forgot_container' maxWidth="sm">
        <Typography variant="h3" component="h1" align="center">
            Reset your password
        </Typography>
        <Typography variant="h4" component="h3" align="center">
            If the email exists, we will provide you an email with the new password.
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal" 
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
            </Button>
            <br />
            <br />
            {error.checked && !error.value?
                <Alert severity="success">{error.message}</Alert>
                : <></>
            }
            {error.checked && error.value?
                <Alert severity="error">{error.message}</Alert>
                : <></>
            }
            
        </form>
        </Container>
    </div>
  );
};

export default ForgotPassword;
