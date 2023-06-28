import { useContext, useEffect, useState } from "react";
import { TrainingPlanContext } from "../../contexts/trainingPlan_context";
import { TrainingPlanContextType } from "../../models/trainingPlan";
import Card from "../../components/card/card";
import Header from "../../components/header/header";
import "./trainingPlans.scss";
import { Pagination } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

const TrainingPlansPage = (): JSX.Element => {
    const {trainingPlans} = useContext<TrainingPlanContextType>(TrainingPlanContext);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = trainingPlans.slice(firstIndex, lastIndex);
    const npage = Math.ceil(trainingPlans.length/recordsPerPage);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }
      }, [navigate]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
      };

    return (
        <div className="trainingPlans">
            <Header></Header>
            <div className="trainingPlans_main">
                {/* <Card content={trainingPlans[0]}></Card> */}
                {records.map(trainingPlan => {
                    return <Card content={trainingPlan}></Card>;
                })}
    
            </div>
            <Pagination className="pagination" count={npage} page={currentPage} onChange={handlePageChange}></Pagination>
        </div>
    );
}

export default TrainingPlansPage;