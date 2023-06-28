import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import { UserContextType } from "../models//user";
import { UserContext } from '../contexts/user_context';
import { useContext, useEffect } from 'react';
import HomePage from '../pages/homepage/homepage';
import TrainingPlansPage from '../pages/trainingPlans/trainingPlans';
import { TrainingPlanContextType } from '../models/trainingPlan';
import { TrainingPlanContext } from '../contexts/trainingPlan_context';
import { DietContextType } from '../models/diet';
import { DietContext } from '../contexts/diet_context';
import DietsPage from '../pages/diets/diets';
import DietPage from '../pages/diet/dietPage';
import ReceipesPage from '../pages/receipes/receipes';
import AccountValidationForm from '../pages/account/account';
import ForgotPassword from '../pages/forgot_pass/forgot_pass';
import Chat from '../components/chat/chat';
import { GroupContextType } from '../models/group';
import { GroupContext } from '../contexts/group_context';
import SpecialistsPage from '../pages/specialists/specialists';
import KcalCalculator from '../pages/calculator/calculator';
import CertificationForm from '../pages/require/require_pg';
import { CertificationContextType } from '../models/certification';
import { CertificationContext } from '../contexts/certification_context';
import AdminPage from '../pages/admin/admin';
import ChatsPage from '../pages/chats/chats';
import Support from '../pages/support/support';
import ConfirmAccount from '../pages/confirmAccount/confirmAccount';


const Main = (): JSX.Element => {
    const {setUsers, getUsers} = useContext<UserContextType>(UserContext);
    const {setTrainingPlans, getTrainingPlans} = useContext<TrainingPlanContextType>(TrainingPlanContext);
    const {setDiets, getDiets} = useContext<DietContextType>(DietContext);
    const {groups, setGroups, getGroups} = useContext<GroupContextType>(GroupContext);
    const {setCertifications, getCertifications} = useContext<CertificationContextType>(CertificationContext);

    useEffect(function dataFetch() {
        getUsers().then((res: any) => {
            setUsers(res);
        });
        
        getTrainingPlans().then((res: any) => {
            setTrainingPlans(res);
        });

        getDiets().then((res: any) => {
            setDiets(res);
        });

        getGroups().then((res: any) => {
            // console.log(res);
            setGroups(res);
            console.log(groups);
        });

        getCertifications().then((res: any) => {
            setCertifications(res);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Register/>}></Route>
                <Route path='/home' element={<HomePage/>}></Route>
                <Route path='/training_plans' element={<TrainingPlansPage/>}></Route>
                <Route path='/diets' element={<DietsPage></DietsPage>}></Route>
                <Route path='/diet/:id' element={<DietPage></DietPage>}></Route>
                <Route path='/search' element={<ReceipesPage/>}></Route>
                <Route path='/account' element={<AccountValidationForm/>}></Route>
                <Route path='/forgot_password' element={<ForgotPassword/>}/>
                <Route path="/chat/:roomId/:user" element={<Chat/>} />
                <Route path='/specialists' element={<SpecialistsPage/>}></Route>
                <Route path='/certification' element={<CertificationForm/>}></Route>
                <Route path='/admin' element={<AdminPage/>}></Route>
                <Route path='/calculator' element={<KcalCalculator/>}></Route>
                <Route path='/specialist' element={<ChatsPage/>}></Route>
                <Route path='/contact' element={<Support/>}></Route>
                <Route path='/chats' element={<ChatsPage/>}></Route>
                <Route path='/confirm/:key/:username' element={<ConfirmAccount/>}></Route>
            </Routes>
        </div>
    );
}

export default Main;