import { FC, createContext, useState } from "react";
import { TrainingPlan, TrainingPlanContextType } from "../models/trainingPlan";
import getAxiosInstanceCustom from "../connection/axios_connection";

export const TrainingPlanContext = createContext<TrainingPlanContextType>({
    trainingPlans: [],
    setTrainingPlans: () => {},
    getTrainingPlans: () => {},
});

const TraininPlanProvider: FC<{children: React.ReactNode}> = ({children}) =>{
    const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
    const data: TrainingPlan[] = [];

    async function getTrainingPlans(): Promise<TrainingPlan[]> {
        const response = await getAxiosInstanceCustom().get("/training-plans");
        for(let i = 0; i < response.data.length; i++) {
            data[i] = response.data[i];
            
        }
        return data;
    }

    return <TrainingPlanContext.Provider value={{trainingPlans, setTrainingPlans,getTrainingPlans}}>
        {children}
    </TrainingPlanContext.Provider>
}

export default TraininPlanProvider;