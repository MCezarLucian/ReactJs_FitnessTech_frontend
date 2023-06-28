export type Diet = {
	_id: string;
    title: string;
	type: string[];
	imgSource: string;
	miniDescription: string;
	mainDescription: string;
	howWork: string;
	menuIdea: {
		breakfast: string[],
		launch: string[],
		dinner: string[],
		snack: string[],
		eatingOut: string[],
	},
	shoppingIdeas: string[];
}

export type DietContextType = {
	diets: Diet[],
	setDiets: React.Dispatch<React.SetStateAction<Diet[]>>,
	getDiets: any,
}