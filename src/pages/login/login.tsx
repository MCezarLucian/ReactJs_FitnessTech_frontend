import MyForm from "../../components/form/my_form";
import Header from "../../components/header/header";
import "./login.scss";

const Login = (): JSX.Element => {
    return (
        <div className="login_main">
            <Header/>
            <div className="login_box">
                <MyForm type="login"/>
            </div>
        </div>
    );
}

export default Login;