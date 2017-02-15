package ch.renewinkler.demo_boot_angular;

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

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public List<Employee> findAll() {
        return service.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value = "{id}", produces = "application/json")
    public Employee findOne(@PathVariable("id") Long id) {
        return service.findOne(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "{id}")
    public Employee update(@PathVariable("id") Long id, @RequestBody Employee employee) {
        if (employee.getId() != id) {
            log.warn("Path id does not match entity id. Will not be updated.");
        }
        return service.save(employee);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Employee create(@RequestBody Employee employee) {
        if (employee.getId() != null) {
            log.warn("Entity already has id. Will not be persisted.");
        }
        return service.save(employee);
    }

}
