import {InMemoryDbService} from "angular-in-memory-web-api";
import {IEmployee} from "./employee";

export class EmployeeData implements InMemoryDbService {

    createDb() {
        let employee: IEmployee[] = [
            {
                "id": 1,
                "firstName": "René",
                "lastName": "Winkler",
                "profession": "Software Engineer",
                "age": 32
            },
            {
                "id": 2,
                "firstName": "Max",
                "lastName": "Muster",
                "profession": "Chief Financial Officer",
                "age": 30
            },
            {
                "id": 3,
                "firstName": "Hanna",
                "lastName": "Miller",
                "profession": "Account Manager",
                "age": 35
            },
            {
                "id": 4,
                "firstName": "Fredy",
                "lastName": "Frog",
                "profession": "Soldier",
                "age": 59
            }
        ];
        return {employee};
    }
}
