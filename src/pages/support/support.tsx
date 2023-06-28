import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import Header from '../../components/header/header';
import './support.scss';
import getAxiosInstanceCustom from '../../connection/axios_connection';
import jwtDecode from 'jwt-decode';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  message: string;
}

const initialFormValues: FormValues = {
  name: '',
  message: ''
};

const Support: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }
      }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform any additional validation or submission logic here
    // For this example, we'll just log the form values
    console.log(formValues);
    // Reset the form
    setFormValues(initialFormValues);

    const jwt = localStorage.getItem('jwt');
    const user: any = jwtDecode(jwt as string);
    const username = user.username as string;

    try{
        const support = {
            title: formValues.name,
            content: formValues.message,
            username: username,
            date: new Date(),
        }
        console.log("support", support);
        getAxiosInstanceCustom().post('/support', support);

    }catch(error){

    }
  };

  return (
    <div className='support'>
        <Header/>
            <form className='support_container' onSubmit={handleSubmit}>
            <h1>Can we help you?</h1>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            
            <TextField
                label="Message"
                variant="outlined"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button variant="contained" type="submit" color="primary">
                Submit
            </Button>
            </form>
    </div>
  );
};

export default Support;
