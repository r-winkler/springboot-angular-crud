package ch.renewinkler.demo_boot_angular.employee;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/employee")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping(produces = "application/json")
    public List<Employee> findAll() {
        return service.findAll();
    }

    @GetMapping(value = "{id}", produces = "application/json")
    public Employee findOne(@PathVariable("id") Long id) {
        return service.findOne(id);
    }

    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @PutMapping(value = "{id}")
    public Employee update(@PathVariable("id") Long id, @RequestBody Employee employee) {
        if (employee.getId() != id) {
            log.warn("Path id does not match entity id. Will not be updated.");
            return employee;
        }
        return service.save(employee);
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        if (employee.getId() != null) {
            log.warn("Entity already has id. Will not be persisted.");
            return employee;
        }
        return service.save(employee);
    }

}
