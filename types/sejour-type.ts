import { Specialite } from "./specialite-type";

export default interface SejourType {
    id: string;
    dateEntree: string;
    dateSortie: string;
    motif: string;
    specialite: Specialite;
}