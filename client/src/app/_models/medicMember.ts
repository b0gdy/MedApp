import { Consultation } from "./consultation";

export interface MedicMember {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    consultations: Consultation[];
}