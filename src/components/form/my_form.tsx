import Button from "../button/button";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import "./my_form.scss";
import { useContext, useState } from "react";
import { Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import getAxiosInstanceCustom from "../../connection/axios_connection";
import { User, UserContextType } from "../../models/user";
import { UserContext } from "../../contexts/user_context";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface MyFormComponent{
    type?: string;
}

interface RegisterFormData {
    email: string;
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
    weight: number | string;
}

interface Mail{
    to: string;
    subject: string;
    text: string;
}

const initialFormData: RegisterFormData = {
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    weight: 0,
};

const MyForm: React.FC<MyFormComponent> = (props: MyFormComponent): JSX.Element => {
    const {users, setUsers} = useContext<UserContextType>(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailLogin, setEmailLogin] = useState({error: false, value: ''});
    const [passwordLogin, setPasswordLogin] = useState({error: false, value: ''});
    const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const [created, setCreated] = useState<string>("none");
    const [loginMessage, setLoginMessage] = useState<string>('');
    const navigate: NavigateFunction = useNavigate();

    const generateRandomPassword = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters.charAt(randomIndex);
        }
      
        return password;
    };

    const validateForm = () => {
        const newErrors: Partial<RegisterFormData> = {};
    
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
    
        if (!formData.fullName) {
          newErrors.fullName = 'Full name is required';
        }
    
        if (!formData.username) {
          newErrors.username = 'Username is required';
        }
    
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(formData.password)){
            newErrors.password = 'Invalid password format';
            alert("Password is weak!")
        }
    
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
    
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
        }
    
        if (!formData.weight) {
          newErrors.weight = 'Weight is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
        //   console.log('Form submitted:', users);
          const newUser: User = {
              email: formData.email,
              username: formData.username,
              password: formData.password,
              name: formData.fullName,
              gender: formData.gender,
              height: 0,
              weight: formData.weight as number,
              age: 0,
              role: 'user',
              valid: false,
              registrationDate: new Date(),
              history: [{ weight: formData.weight as number, date: new Date() }],
              problems: [],
              image: '',
              confirmed: false,
          }

          const valid = users.find(u => 
            (u.email === newUser.email || u.username === newUser.username)
          );

          if(valid){
            setCreated("fail");
          }  
          else{
            setCreated("succes");
            users.push(newUser);
            setUsers(users);
            getAxiosInstanceCustom().post("/user", JSON.stringify(newUser));
            navigate('/login');


            const pss = generateRandomPassword(16);
            const mail: Mail = {
                to: formData.email,
                subject: 'Confirm account',
                text: `http://localhost:3000/confirm/${pss}/${formData.username}`,
            };

            try{
                getAxiosInstanceCustom().post('/email', mail);
            }
            catch(error){}
          }
        }
    };

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleChange = (event: SelectChangeEvent) => {
        // setGender(event.target.value);
        setFormData({...formData, gender: event.target.value});
      };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleForgotPass = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        navigate('/forgot_password');
    }

    async function handleLogin(event: any) {
        // console.log( emailLogin.value, passwordLogin.value );
        const email = emailLogin.value;
        const password = passwordLogin.value
        const loginDataA = {email, password};
        console.log(loginDataA);
        event.preventDefault();
        try{
            const response = await getAxiosInstanceCustom().post("/login", loginDataA);
            const { data } = response;
            // console.log("DATA", data)
            // console.log(auxUsr)
            const usr = users.find(u => u.email === email);
            console.log("confirmed", (usr as User).confirmed)
            if((usr as User).confirmed){
                localStorage.setItem("jwt", data.acces_token);
                setLoginMessage('Registration successful');
                navigate('/home');
            }
            setLoginMessage("Unconfirmed account")
            // console.log(loginData);
            
        } catch (error) {
            setLoginMessage('Registration failed');
        }
    }
    
    return (
        <div className="form_main">
            <div className="form_left"></div>
            <div className="form_right">
                {props.type === "login" ?
                <>
                <h1 className="welcome_form">Welcome Back!</h1>
                <p>Being consistent is the most important thing in fitness!</p>
                <form className="login_form">
                    <TextField 
                        className="form_box" 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e: { target: { value: string; }; }) => {emailLogin.value = e.target.value; setEmailLogin(emailLogin);}} 
                        error = {emailLogin.error}
                        required
                    />
                    <FormControl className="form_box" sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            onChange={e => {passwordLogin.value = e.target.value; setPasswordLogin(passwordLogin);}}
                            error = {passwordLogin.error}
                            required
                        />
                    </FormControl>
                    <Button name="Log in" onClick={handleLogin}></Button>
                    <div className="sign_up">
                        <p>Don't already have an account? </p>
                        <a href="/signup" className="sign_link"> Sign up</a>
                    </div>
                    <p onClick={handleForgotPass} className="forgot_pass">Forgot your password?</p>
                    {
                        loginMessage === "Registration successful"?
                        <Alert severity="success">{loginMessage}</Alert>
                        : <></>
                    }
                    {
                        loginMessage === "Registration failed" || loginMessage === "Unconfirmed account"?
                        <Alert severity="error">{loginMessage}</Alert>
                        : <></>
                    }
                </form>
                </>
                : <>
                <h1> Sign in!</h1>
                <div className="sign_up">
                    <p>Already have an account?</p>
                    <a href="/login" className="sign_link">LOG IN</a>
                </div>
                <form className="register_form" onSubmit={handleSubmit}>
                <TextField
                    className="form_box" 
                    id="outlined-basic" 
                    label="Email" 
                    type={"email"} 
                    variant="outlined" 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChangeRegister}
                    error = {!!errors.email}
                    helperText = {errors.email}
                />
                <TextField 
                    className="form_box" 
                    id="outlined-basic" 
                    label="Full Name" 
                    variant="outlined" 
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChangeRegister}
                    error = {!!errors.fullName}
                    helperText = {errors.fullName} 
                />
                <TextField 
                    className="form_box" 
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined" 
                    required 
                    name="username"
                    value={formData.username}
                    onChange={handleChangeRegister}
                    error = {!!errors.username}
                    helperText = {errors.username}
                />
                <div className="passwords"> 
                    <FormControl className="form_box2" sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" required >Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChangeRegister}
                                error = {!!errors.password}
                            />
                    </FormControl>
                    <FormControl className="form_box2" sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" required>Confirm pass</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                    edge="end"
                                    >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Confirm pass"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChangeRegister}
                                error = {!!errors.confirmPassword}
                            />
                    </FormControl>
                </div>
                <div className="gender_weight">
                <FormControl className="form_box3" fullWidth>
                    <InputLabel id="demo-simple-select-label" required >Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.gender}
                        name="gender"
                        label="Gender"
                        onChange={handleChange}
                    >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                </FormControl>

                <TextField required className="form_box3" fullWidth type="number"
                    label="Weight"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                    name="weight"
                    value={formData.weight}
                    onChange={handleChangeRegister}
                    error = {!!errors.weight}
                    helperText={errors.weight}
                />
                </div>
                <div className="terms_conditions">
                    <FormControlLabel required control={<Checkbox />} label="I agree " />
                    <a href="/" className="link_terms">terms and conditions</a>
                </div>
                <Button name="Sign in" onClick={handleSubmit} ></Button>
                {
                    created === "succes"?
                   <Alert severity="success">Account created successfully!</Alert>
                    : <></>
                }
                {
                    created === "fail"?
                    <Alert severity="error">Email or username already used!</Alert>
                    :<></>
                }
                </form>
                </>
                }
            </div>
        </div>
    );
}

export default MyForm;