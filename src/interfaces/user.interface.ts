import { Role } from "@prisma/client";
import { Auth } from "./auth.interface";
import { CategoryPlan } from "./categoryPlan.interface";
import { Routine } from "./routine.interface";

export interface User extends Auth {
  name: string;
  age: number;
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlans: CategoryPlan[];
  role: Role;
  routines?: Routine[];
}
