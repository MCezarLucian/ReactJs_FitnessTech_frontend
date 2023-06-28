import { FC, createContext, useState } from "react";
import { Certification, CertificationContextType } from "../models/certification";
import getAxiosInstanceCustom from "../connection/axios_connection";

export const CertificationContext = createContext<CertificationContextType>({
    certifications: [],
    setCertifications: () => {},
    getCertifications: () => {},
});

const CertificationProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const data: Certification[] = [];

    async function getCertifications(): Promise<Certification[]> {
        const response = await getAxiosInstanceCustom().get('/certification');
        for(let i = 0; i < response.data.length; i++) {
            data[i] = response.data[i];
        }

        return data;
    }

    return <CertificationContext.Provider value={{certifications, setCertifications, getCertifications}}>
        {children}
    </CertificationContext.Provider>
}

export default CertificationProvider;