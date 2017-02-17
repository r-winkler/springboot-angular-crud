package ch.renewinkler.demo_boot_angular.employee;

import org.springframework.data.jpa.repository.JpaRepository;

interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
