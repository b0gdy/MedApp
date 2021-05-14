import { Consultation } from "./consultation";

export interface PacientMember {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    consultations: Consultation[];
}