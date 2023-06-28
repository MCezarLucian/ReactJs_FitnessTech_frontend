import MyForm from "../../components/form/my_form";
import Header from "../../components/header/header";
import "./register.scss";

const Register = (): JSX.Element => {
    return (
        <div className="register_main">
            <Header/>
            <div className="register_box">
                <MyForm type="register"></MyForm>
            </div>
        </div>
    );
}

export default Register;