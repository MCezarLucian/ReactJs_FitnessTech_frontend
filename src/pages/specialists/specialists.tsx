import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import SpecCard from "../../components/spec_card/spec_card";
import './specialists.scss';
import { UserContext } from "../../contexts/user_context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { User } from "../../models/user";

const SpecialistsPage = (): JSX.Element => {
  const { users } = useContext(UserContext);
  const [nutritionists, setNutritionists] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const [currentNutritionistsPage, setCurrentNutritionistsPage] = useState<number>(1);
  const [currentTrainersPage, setCurrentTrainersPage] = useState<number>(1);

  const recordsPerPage = 1;
  const nutritionistsLastIndex = currentNutritionistsPage * recordsPerPage;
  const nutritionistsFirstIndex = nutritionistsLastIndex - recordsPerPage;
  const nutritionistsRecords = nutritionists.slice(nutritionistsFirstIndex, nutritionistsLastIndex);
  const nutritionistsPages = Math.ceil(nutritionists.length / recordsPerPage);

  const trainersLastIndex = currentTrainersPage * recordsPerPage;
  const trainersFirstIndex = trainersLastIndex - recordsPerPage;
  const trainersRecords = trainers.slice(trainersFirstIndex, trainersLastIndex);
  const trainersPages = Math.ceil(trainers.length / recordsPerPage);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt){
      navigate('/login');
    }
  }, [navigate]);


  useEffect(() => {
    const auxNutr = users.filter(user => user.role === "nutritionist");
    setNutritionists(auxNutr);

    const auxTrain = users.filter(user => user.role === "trainer");
    setTrainers(auxTrain);
  }, [users]);

  const handleNutritionistsPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentNutritionistsPage(page);
  };

  const handleTrainersPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentTrainersPage(page);
  };

  return (
    <div className="specialists_container">
      <Header />
      <div className="specialists_main">
        <h1>Nutritionists</h1>
        <div className="specialists_train">
          {nutritionistsRecords.map(n => (
            <SpecCard
              key={n.username}
              name={n.name}
              age={n.age}
              gender={n.gender}
              username={n.username}
              image={n.image}
            />
          ))}
        </div> 
        <Pagination
            className="pagination"
            count={nutritionistsPages}
            page={currentNutritionistsPage}
            onChange={handleNutritionistsPageChange}
          />
        <h1>Trainers</h1>
        <div className="specialists_train">
          {trainersRecords.map(n => (
            <SpecCard
              key={n.username}
              name={n.name}
              age={n.age}
              gender={n.gender}
              username={n.username}
              image={n.image}
            />
          ))}
          
        </div>
        <Pagination
            className="pagination"
            count={trainersPages}
            page={currentTrainersPage}
            onChange={handleTrainersPageChange}
          />
        <p
          onClick={() => {
            navigate('/certification');
          }}
          className="become_specialist"
        >
          Are you a specialist? Become our partner!
        </p>
      </div>
    </div>
  );
};

export default SpecialistsPage;
