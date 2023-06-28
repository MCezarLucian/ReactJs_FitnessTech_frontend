import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import getAxiosInstanceCustom from "../../connection/axios_connection";
import { useEffect } from "react";

const ConfirmAccount = () => {
    const { username } = useParams<{ username: string }>();
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        console.log("aa", username);
        try{
            const usr = {
                confirmed: true,
            }
            getAxiosInstanceCustom().post(`/user/update/role/${username}`, usr);
        }catch{}
        navigate('/login');
    },[username, navigate])

    return (<p>Account confirmed!</p>);
}

export default ConfirmAccount;