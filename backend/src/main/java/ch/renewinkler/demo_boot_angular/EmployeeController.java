package ch.renewinkler.demo_boot_angular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/employee")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public List<Employee> findAll() {
        return service.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

}
