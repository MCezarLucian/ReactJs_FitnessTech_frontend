import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './main/main';
import UserProvider from './contexts/user_context';
import TraininPlanProvider from './contexts/trainingPlan_context';
import DietsProvider from './contexts/diet_context';
import GroupsProvider from './contexts/group_context';
import CertificationProvider from './contexts/certification_context';


function App() {
  return (
    <CertificationProvider>
      <GroupsProvider>
        <DietsProvider>
          <TraininPlanProvider>
            <UserProvider>
              <div className="App">
                <Routes>
                  <Route path = "*" element = {<Main />}></Route>
                </Routes>
              </div>
            </UserProvider>
          </TraininPlanProvider>
        </DietsProvider>
      </GroupsProvider>
    </CertificationProvider>
  );
}

export default App;
