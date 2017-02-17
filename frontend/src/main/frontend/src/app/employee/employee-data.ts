import {InMemoryDbService} from "angular-in-memory-web-api";
import {IEmployee} from "./employee.model";

export class EmployeeData implements InMemoryDbService {

    createDb() {
        let employee: IEmployee[] = [
            {
                "id": 1,
                "firstName": "René",
                "lastName": "Winkler",
                "profession": "Software Engineer",
                "age": 32,
                "fullTime": false,
                "language": "German"
            },
            {
                "id": 2,
                "firstName": "Max",
                "lastName": "Muster",
                "profession": "Chief Financial Officer",
                "age": 30,
                "fullTime": true,
                "language": "English"
            },
            {
                "id": 3,
                "firstName": "Hanna",
                "lastName": "Miller",
                "profession": "Account Manager",
                "age": 35,
                "fullTime": true,
                "language": "French"
            },
            {
                "id": 4,
                "firstName": "Fredy",
                "lastName": "Frog",
                "profession": "Soldier",
                "age": 59,
                "fullTime": false,
                "language": "Spanish"
            }
        ];
        return {employee};
    }
}
