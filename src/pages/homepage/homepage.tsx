import { NavigateFunction, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import Icon from "../../components/icon/icon";
import "./homepage.scss";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";



const HomePage = (): JSX.Element => {

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }else{
            const user: any = jwtDecode(jwt as string);
            if(user.role === 'trainer' || user.role === 'nutritionist'){
            navigate('/chats');
            }
        }
        
    },[navigate]);

    return (
        <div className="homepage_main">
            <Header/>
            <div className="homepage_box">
                <div className="homepage_box1">
                    <div className="homepage_title">Achieve the body you want in the easiest way possible</div>
                    <div className="homepage_statement">Discover Fitness Tech and enjoy life.</div>
                    <Button onClick={() => {navigate('/account')}} name="Get Started"></Button>
                </div>
                <div className="homepage_box2">
                    <Icon type="home_l"></Icon>
                </div>
            </div>
        </div>
    );
}

export default HomePage;