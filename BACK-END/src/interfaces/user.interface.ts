import { Role } from "../enums/role.enum";
import { Auth } from "./auth.interface";
import { CategoryPlan } from "./categoryPlan.interface";
import { Routine } from "./routine.interface";

export interface User extends Auth {
  name: string;
  age: number;
  // email: Auth,
  // password: Auth,
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlan?: CategoryPlan[];
  role: Role;
  routines?: Routine[];
}
