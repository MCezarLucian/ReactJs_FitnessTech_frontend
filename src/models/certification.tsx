export type Certification = {
    _id: string;
    aboutYou: string,
    role: string,
    certificate: string;
    idImage: string;
    username: string;
}

export type CertificationContextType = {
    certifications: Certification[],
    setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>,
    getCertifications: any,
}