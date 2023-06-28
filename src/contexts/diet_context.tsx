import React, { FC, createContext, useState } from "react";
import { Diet, DietContextType } from "../models/diet";
import getAxiosInstanceCustom from "../connection/axios_connection";

export const DietContext = createContext<DietContextType>({
    diets: [],
    setDiets: () => {},
    getDiets: () => {},
});

const DietsProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [diets, setDiets] = useState<Diet[]>([]);
    const data: Diet[] = [];

    async function getDiets(): Promise<Diet[]> {
        const response = await getAxiosInstanceCustom().get("/diet");
        for(let i = 0; i< response.data.length; i++){
            data[i] = response.data[i];
        }

        return data;
    }

    return <DietContext.Provider value={{diets, setDiets, getDiets}}>
        {children}
    </DietContext.Provider>
}

export default DietsProvider;