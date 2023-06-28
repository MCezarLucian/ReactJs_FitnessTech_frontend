import React, { ChangeEventHandler, useEffect, useState } from 'react';
import {
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Snackbar
} from '@mui/material';

import './require_pg.scss';
import Header from '../../components/header/header';
import jwtDecode from 'jwt-decode';
import getAxiosInstanceCustom from '../../connection/axios_connection';
import { NavigateFunction, useNavigate } from 'react-router-dom';


interface Certification {
    aboutYou: string,
    role: string,
    certificate: string,
    idImage: string,
    username: string,
}

const CertificationForm: React.FC = () => {
  const [aboutYou, setAboutYou] = useState('');
  const [role, setRole] = useState('trainer');
  const [certificate, setCertificate] = useState<File | null>(null);
  const [idImage, setIdImage] = useState<File | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      navigate('/login');
    }
  }, [navigate]);

  const convertBase64 = (file: File): any => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAboutYouChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setAboutYou(event.target.value);
  };
  
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleCertificateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      // Check if the selected file type is allowed
      if (allowedTypes.includes(selectedFile.type)) {
        setCertificate(selectedFile);
      } else {
        // Display an error message or perform any other validation feedback
        console.log('Invalid file type. Please select a PNG or JPEG image.');
      }
    }
  };

  const handleIdImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['image/png', 'image/jpeg'];

      // Check if the selected file type is allowed
      if (allowedTypes.includes(selectedFile.type)) {
        setIdImage(selectedFile);
      } else {
        // Display an error message or perform any other validation feedback
        console.log('Invalid file type. Please select a PNG or JPEG image.');
      }
    }
  };

  const handleSubmit = async () => {
    // Perform form submission logic here, such as sending data to a server
    // and saving the certificate and ID images
    console.log(aboutYou, role, certificate,idImage);

    const jwt = localStorage.getItem('jwt');
    if(jwt){
      const user: any = jwtDecode(jwt as string);
      const newCertification: Certification = {
        aboutYou: aboutYou,
        role: role,
        certificate: await convertBase64(certificate as File),
        idImage: await convertBase64(idImage as File),
        username: user.username,
    } 

    try{
        getAxiosInstanceCustom().post('/certification', newCertification);
    } catch(error){

    }

    // Reset form fields
    setAboutYou('');
    setRole('trainer');
    setCertificate(null);
    setIdImage(null);

    // Show snackbar
    setIsSnackbarOpen(true);
    navigate('/specialists');
    }else{
      navigate('login');
    }

    
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className='"certification_main'>
        <Header/>
        <div className="certification-form-container">
        <Typography variant="h4" className="certification-form-title">
            Become a specialist
        </Typography>
        <form onSubmit={handleSubmit} className='certification_form'>
            <textarea
            value={aboutYou}
            onChange={handleAboutYouChange}
            required
            className="certification-form-textarea"
            placeholder="Tell us something about you"
            />
            <FormControl component="fieldset" margin="normal" className="certification-form-radio-group">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup name="role" value={role} onChange={handleRoleChange}>
                <FormControlLabel value="trainer" control={<Radio />} label="Trainer" />
                <FormControlLabel value="nutritionist" control={<Radio />} label="Nutritionist" />
            </RadioGroup>
            </FormControl>
            <FormControl className="certification-form-file-input">
                <p>Upload a image with a docoument that certificate you</p>
                <input
                    id="certificate-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCertificateChange}
                    required
                />
                {certificate && <img className='upload_img' src={URL.createObjectURL(certificate)} alt="Selected" />}
            </FormControl>
            <FormControl className="certification-form-file-input">
                <p>Upload a image with your id to provide the identity</p>
                <input
                    id="id-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleIdImageChange}
                    required
                />
                {idImage && <img className='upload_img' src={URL.createObjectURL(idImage)} alt="Selected" />}
            </FormControl>
            <Button
            // type="submit"
            variant="contained"
            color="primary"
            className="certification-form-submit-button"
            onClick={handleSubmit}
            >
            Submit
            </Button>
        </form>
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message="Form submitted successfully!"
            className="snackbar"
        />
        </div>
    </div>
  );
};

export default CertificationForm;
