import {InMemoryDbService} from "angular-in-memory-web-api";
import {IEmployee} from "./employee";

export class EmployeeData implements InMemoryDbService {

    createDb() {
        let employees: IEmployee[] = [
            {
                "id": 1,
                "firstname": "René",
                "lastname": "Winkler",
                "profession": "Software Engineer",
                "age": 32
            },
            {
                "id": 2,
                "firstname": "Max",
                "lastname": "Muster",
                "profession": "Chief Financial Officer",
                "age": 30
            },
            {
                "id": 3,
                "firstname": "Hanna",
                "lastname": "Miller",
                "profession": "Account Manager",
                "age": 35
            },
            {
                "id": 4,
                "firstname": "Fredy",
                "lastname": "Frog",
                "profession": "Soldier",
                "age": 59
            }
        ];
        return {employees};
    }
}