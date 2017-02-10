package ch.renewinkler.demo_boot_angular;

import org.springframework.data.jpa.repository.JpaRepository;

interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
