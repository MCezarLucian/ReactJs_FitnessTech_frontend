import logo from "../../assets/images/logov2.png";
import login from "../../assets/images/login.png"
import home_l from "../../assets/images/home_l.jpg"

interface IconComponent {
    type: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Icon: React.FC<IconComponent> = (props: IconComponent): JSX.Element => {
    let icon: JSX.Element = <></>;

    switch(props.type){
        case "logo":
            icon = <img src = { logo } alt= "ft_logo" className="ft_logo"></img>
            break;
        case "login":
            icon = <img src= {login} alt = "ft_login" className="ft_login"></img>
            break;
        case "home_l":
            icon = <img src={home_l} alt = "ft_home_l" className="ft_home_l"></img>
            break;
        default:
            break;
    }

    return icon;
}

export default Icon;