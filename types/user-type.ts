import { RoleType } from "./role-type";
import SejourType from "./sejour-type";

export default interface UserType {
    email: string;
    firstName: string;
    lastName: string;
    zipCode: string;
    roles: RoleType;
    sejour: SejourType[];
}