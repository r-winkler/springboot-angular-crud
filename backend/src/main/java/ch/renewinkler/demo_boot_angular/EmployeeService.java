package ch.renewinkler.demo_boot_angular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository repository;

    public List<Employee> findAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.delete(id);
    }
}
