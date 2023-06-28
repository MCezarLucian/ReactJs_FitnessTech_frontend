import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import './validate_account.scss';
import Header from "../../components/header/header";
import { User, UserHistory } from "../../models/user";
import jwtDecode from "jwt-decode";
import getAxiosInstanceCustom from "../../connection/axios_connection";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import WeightGraph from "../../components/graph/graph";
import ChangePasswordForm from "../../components/form/changePass";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface FormFields {
  age: number;
  height: number;
  problems: string[];
  weight: number;
}

const initialFormFields: FormFields = {
  height: 0,
  problems: [],
  weight: 0,
  age: 0,
};

const problemsOptions = [
  "Diabet",
  "Vegan",
  "Vegetarian",
  "Problem 4",
  "Problem 5",
];

interface ErrorFormFields{
    height: string;
    problems: string;
    weight: string;
    age: string;
}

interface ViewAccount{
  profile: boolean;
  progress: boolean;
  change: boolean;
}

const AccountValidationForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>(initialFormFields);
  const [errors, setErrors] = useState<Partial<ErrorFormFields>>({});
  const [currentUser, setCurentUser] = useState<User>();
  const navigate: NavigateFunction = useNavigate();
  const [viewAccount, setViewAccount] = useState<ViewAccount>({
    profile: true,
    progress: false,
    change: false,
  });
  const [userHistory, setUserHistory] = useState<UserHistory[]>([]);
  const [updateAccount, setUpdatedAccount] = useState<boolean>(false);
  const [userImg, setUserImg] = useState<string>('');
  // const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const localItem: string | null = localStorage.getItem('jwt');
        if(!localItem){
          navigate('/signup');
        }
        
        if (localItem) {
            const localObject: any = jwtDecode(localItem);
            const username: string = localObject.username;
            getAxiosInstanceCustom().get(`/user/${username}`,).then((res: any) => setCurentUser(res.data));
        }
    }, [])

    useEffect(() => {
      const delay = 2000; // Delay in milliseconds (2 seconds)
  
      if (currentUser) {
        const timer = setTimeout(() => {
          // Set the form fields after the delay
          setFormFields({
            height: currentUser.height,
            problems: currentUser.problems,
            weight: currentUser.weight,
            age: currentUser.age,
          });
          setUserHistory(currentUser.history);
          setUserImg(currentUser.image);
        }, delay);
  
        return () => {
          // Clear the timer if the component unmounts or changes
          clearTimeout(timer);
        };
      }
    }, [currentUser]);


    console.log(currentUser);
    console.log("hhh",userHistory)


  const validateForm = (): boolean => {
    const newErrors: Partial<ErrorFormFields> = {};

    if (formFields.height <= 0) {
      newErrors.height = "Height must be a positive number";
    }

    if (formFields.weight <= 0) {
      newErrors.weight = "Weight must be a positive number";
    }

    if (formFields.age <= 0){
      newErrors.age = "Age must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if(currentUser){
        const updatedUser: Partial<User> = currentUser;
        console.log("img",userImg);
        updatedUser.height = formFields.height;
        updatedUser.problems = formFields.problems;
        updatedUser.weight = formFields.weight;
        updatedUser.valid = true;
        updatedUser.image = userImg;
        updatedUser.age = formFields.age
        if(updatedUser.history !== undefined){
          updatedUser.history.push({weight: formFields.weight, date: new Date()});
        }
        else{
          updatedUser.history = [{weight: formFields.weight, date: new Date()}];
        }
        getAxiosInstanceCustom().post(`/user/update/role/${currentUser.username}`, updatedUser);
        // console.log("img",userImg);
      }
      console.log("Form submitted:", formFields);
      setUpdatedAccount(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const selectedProblems = e.target.value as string[];
    setFormFields((prevFields) => ({ ...prevFields, problems: selectedProblems }));
  };

  const handleLogOut = (event: any) => {
    event.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  }

  const handleCertificateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      // Check if the selected file type is allowed
      if (allowedTypes.includes(selectedFile.type)) {
        setUserImg(await convertBase64(selectedFile));
      } else {
        // Display an error message or perform any other validation feedback
        console.log('Invalid file type. Please select a PNG or JPEG image.');
      }
    }
  };

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

  return (
    <div className="account_main">
      <Header></Header>
      <div className="account_main_2">
        <div className="account_options">
          <p className="account_options_item" onClick={() => {setViewAccount({profile: true, progress: false, change: false})}}><InsertEmoticonIcon/> &nbsp; Profile</p>
          <p className="account_options_item" onClick={() => {setViewAccount({profile: false, progress: true, change: false})}}><TrendingUpIcon/> &nbsp; See Progress</p>
          <p className="account_options_item" onClick={() => {setViewAccount({profile: false, progress: false, change: true})}}><LockIcon/> &nbsp; Change Password</p>
          <p className="account_options_item" onClick={handleLogOut}>
            <LogoutIcon className="logout_icon"/> &nbsp; Log out </p>
        </div>
        {viewAccount.profile? 
          <form className="account-validation-form" onSubmit={handleSubmit}>      
          {
          userImg?
          <img className="img_acc" src={userImg} alt=""></img>
          :
          <AccountCircleIcon className="account_profile"/>
          }
          
          <br />
          {!currentUser?.valid?
          <h1>Please complete your account!</h1>  
            :<h1> Update your account</h1>
          }
            <br />

            <input
                    id="certificate-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCertificateChange}
                    className="image_input"
                    // required
                />
              <br />
          <FormControl className="account-validation-textField">
              <TextField
                  type="number"
                  name="height"
                  label="Height"
                  value={formFields.height}
                  onChange={handleChange}
                  error={!!errors.height}
                  helperText={errors.height} />
          </FormControl>
          <br />
          <FormControl className="account-validation-textField">
              <FormLabel component="legend">Complications</FormLabel>
              <Select
                  multiple
                  name="problems"
                  value={formFields.problems}
                  onChange={handleSelectChange}
                  className="select_lab"
                  renderValue={(selected: any) => (selected as string[]).join(", ")}
              >
                  {problemsOptions.map((problem) => (
                      <MenuItem key={problem} value={problem}>
                          {problem}
                      </MenuItem>
                  ))}
              </Select>
              {errors.problems && <FormHelperText error>{errors.problems}</FormHelperText>}
          </FormControl>
          <br />

          <FormControl>
              <TextField
                  type="number"
                  name="weight"
                  label="Weight"
                  value={formFields.weight}
                  onChange={handleChange}
                  error={!!errors.weight}
                  helperText={errors.weight} />
          </FormControl>
          <br />
          <FormControl>
              <TextField
                  type="number"
                  name="age"
                  label="Age"
                  value={formFields.age}
                  onChange={handleChange}
                  error={!!errors.weight}
                  helperText={errors.weight} />
          </FormControl>
          <br />
          {updateAccount?
            <Alert severity="success">Account updated!</Alert>
            :<></>
          }
          <br />

          <Button variant="contained" type="submit">
              Update
          </Button>
      </form>
        :<></>}
        {viewAccount.progress?
          <WeightGraph data={userHistory}/>
        :<></>}

        {viewAccount.change?
          <ChangePasswordForm user={currentUser}/>
          // <></>
        :<></>}
        </div>
      </div>
      
  );
};

export default AccountValidationForm;
