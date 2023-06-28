import Icon from "../icon/icon";
import {useContext, useEffect, useState} from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalculateIcon from '@mui/icons-material/Calculate';
import './header.scss'
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User, UserContextType } from "../../models/user";
import { UserContext } from "../../contexts/user_context";
import jwtDecode from "jwt-decode";


interface HeaderComponent {
    isAdmin?: boolean;
    isLogged?: boolean;
}

interface LocalUser{
    username: string;
    role: string;
}

const Header: React.FC<HeaderComponent> = (props: HeaderComponent): JSX.Element => {
    
    const [active, setActive] = useState("header_menu");
    const [toggleIcon, setToggleIcon] = useState("header_toggler");
    const [logged, setLogged] = useState<boolean>(false);
    const [currentUser, setCurentUser] = useState<User>();
    const {users} = useContext<UserContextType>(UserContext);
    const navigate: NavigateFunction = useNavigate();
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if(jwt){
            setLogged(true);
            const user: LocalUser = jwtDecode(jwt);
            setCurentUser(users.find(u => u.username === user.username));
        }
    }, [users])

    const headerToggle = () => {
        active === "header_menu" 
        ? setActive("header_menu header_active")
        : setActive("header_menu");

        toggleIcon === "header_toggler"
        ? setToggleIcon("header_toggler toggle")
        : setToggleIcon("header_toggler");
    }

    const handleAccount = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        navigate('/account');
    }

    const handleDiets = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        navigate('/diets');
    }

    const handleTraining = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        navigate('/training_plans');
    }

    const handleHome = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        navigate('/home');
    }

    
    return (
        <nav className="header_main">
            <a href="/home" onClick={handleHome} className="logo"><Icon type="logo"/></a>
            <ul className={active}>
                <li className="header_item">
                    <a href="/calculator" className="header_link">
                        <CalculateIcon className="chatIcon"></CalculateIcon>
                        Calculator
                    </a>
                </li>
                <li onClick={handleTraining} className="header_item">
                    <a href="/training_plans" className="header_link">
                        <FitnessCenterIcon className="fitnessIcon"></FitnessCenterIcon>
                        Trainings
                    </a>
                </li>
                <li onClick={handleDiets} className="header_item">
                    <a href="/diets" className="header_link">
                        <MenuBookIcon className="menuIcon"></MenuBookIcon>
                    Diets
                    </a>
                </li>
                <li className="header_item">
                    <a href="/specialists" className="header_link">
                        <Diversity1Icon className="diversityIcon"></Diversity1Icon>
                        Specialists
                    </a>
                </li>
                <li className="header_item">
                    <a href="/contact" className="header_link">
                        <InfoIcon className="infoIcon"></InfoIcon>
                        Contact
                    </a>
                </li>
                <li onClick={handleAccount} className="header_item">
                    {logged?
                    <a href="/account" className="header_link">
                        <img className="img_header" src={currentUser?.image} alt="a"></img>
                        {currentUser?.name}
                    </a>    :
                    <a href="/account" className="header_link">
                    <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                    My Account
                </a>
                }
                    
                </li>
            </ul>
            <div  onClick={headerToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

export default Header;