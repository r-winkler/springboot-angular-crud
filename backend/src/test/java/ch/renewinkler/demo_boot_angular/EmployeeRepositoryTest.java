package ch.renewinkler.demo_boot_angular;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    public void testFindAll() {
        List<Employee> employees = this.repository.findAll();

        assertThat(employees).hasSize(4);
    }

    @Test
    public void testfindOne() {
        Employee employee = this.repository.findOne(2l);

        EmployeeAssert.assertThat(employee).hasFirstName("Max").hasLastName("Muster").hasAge(45)
                .hasProfession("Chief Financial Officer").isFulltime(true).hasLanguage("English");
    }

    @Test
    public void testDelete() {
        this.repository.delete(2l);

        List<Employee> employees = this.repository.findAll();
        assertThat(employees).hasSize(3).extracting("id").contains(1L, 3L, 4L);
    }

    @Test
    public void testSaveNewEmployee() {
        Employee newEmployee = Employee.builder().firstName("Daniel").lastName("any").age(37)
                .profession("any").fullTime(true).language("any").build();
        this.repository.save(newEmployee);

        Employee employee = this.repository.findOne(5l);
        EmployeeAssert.assertThat(employee).hasFirstName("Daniel");
    }

    @Test
    public void testSaveUpdateEmployee() {
        Employee updatedEmployee = Employee.builder().id(1l).firstName("René").lastName("Winkler")
                .age(33).profession("Software Engineer").fullTime(false).language("German").build();
        this.repository.save(updatedEmployee);

        Employee employee = this.repository.findOne(1l);
        EmployeeAssert.assertThat(employee).hasAge(33);
    }

    @Test
    public void testNotNullContraints() {
        Employee employee1 = Employee.builder().lastName("any").age(32).profession("any")
                .fullTime(true).language("any").build();
        Employee employee2 = Employee.builder().firstName("any").age(32).profession("any")
                .fullTime(true).language("any").build();
        Employee employee3 = Employee.builder().firstName("any").lastName("any").profession("any")
                .fullTime(true).language("any").build();
        Employee employee4 = Employee.builder().firstName("any").lastName("any").age(32)
                .fullTime(true).language("any").build();
        Employee employee5 = Employee.builder().firstName("any").lastName("any").profession("any")
                .age(32).language("any").build();
        Employee employee6 = Employee.builder().firstName("any").lastName("any").profession("any")
                .age(32).fullTime(true).build();

        assertThatThrownBy(() -> this.repository.save(employee1)).isInstanceOf(ConstraintViolationException.class);
        assertThatThrownBy(() -> this.repository.save(employee2)).isInstanceOf(ConstraintViolationException.class);
        assertThatThrownBy(() -> this.repository.save(employee3)).isInstanceOf(ConstraintViolationException.class);
        assertThatThrownBy(() -> this.repository.save(employee4)).isInstanceOf(ConstraintViolationException.class);
        assertThatThrownBy(() -> this.repository.save(employee5)).isInstanceOf(ConstraintViolationException.class);
        assertThatThrownBy(() -> this.repository.save(employee6)).isInstanceOf(ConstraintViolationException.class);
    }
}