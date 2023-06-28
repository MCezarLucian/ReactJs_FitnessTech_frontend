export type SummaryTrainingPlans =  {
    goal: string,
    type: string,
    trainingLevel: string,
    duration: number,
    equipment: string[],
    suppliments: string[],
}

export type TrainingPlan = {
    name: string,
    description: string,
    summary: SummaryTrainingPlans,
    exercises: string[],
};

export type TrainingPlanContextType = {
    trainingPlans: TrainingPlan[],
    setTrainingPlans: React.Dispatch<React.SetStateAction<TrainingPlan[]>>,
    getTrainingPlans: any;
}
  