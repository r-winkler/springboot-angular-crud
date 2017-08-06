package ch.renewinkler.demo_boot_angular.employee;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private EmployeeService employeeService;

    private ObjectMapper mapper = new ObjectMapper();

    private List<Employee> employees = new ArrayList<>();
    private Employee employee1;
    private Employee employee2;
    private Employee employee3;

    String jsonEmployee;
    String jsonEmployees;

    @Before
    public void before() throws JsonProcessingException {
        employee1 = Employee.builder().id(1l).firstName("René").lastName("Winkler").age(32)
                .profession("Software Engineer").fullTime(false).language("German").build();
        employee2 = Employee.builder().id(2l).firstName("Max").lastName("Muster").age(27)
                .profession("Account Manager").fullTime(true).language("English").build();
        employee3 = Employee.builder().id(3l).firstName("Michael").lastName("Meister")
                .age(35).profession("Product Owner").fullTime(true).language("Spanish").build();

        employees.add(employee1);
        employees.add(employee2);
        employees.add(employee3);

        jsonEmployee = mapper.writeValueAsString(employee1);
        jsonEmployees = mapper.writeValueAsString(employees);
    }

    @Test
    public void testFindAll() throws Exception {
        given(this.employeeService.findAll())
                .willReturn(employees);

        this.mvc.perform(get("/api/employee/")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployees));
    }

    @Test
    public void testFindOne() throws Exception {
        given(this.employeeService.findOne(1l))
                .willReturn(employee1);

        this.mvc.perform(get("/api/employee/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployee));
    }

    @Test
    public void testDelete() throws Exception {
        this.mvc.perform(delete("/api/employee/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(this.employeeService, times(1)).delete(1l);
    }

    @Test
    public void testUpdate() throws Exception {
        given(this.employeeService.save(any()))
                .willReturn(employee1);

        this.mvc.perform(put("/api/employee/1")
                .content(jsonEmployee)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployee));
        verify(this.employeeService, times(1)).save(employee1);
    }

    @Test
    public void testUpdateWrongId() throws Exception {
        given(this.employeeService.save(any()))
                .willReturn(employee1);

        this.mvc.perform(put("/api/employee/2")
                .content(jsonEmployee)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployee));
        verify(this.employeeService, never()).save(employee1);
    }

    @Test
    public void testCreate() throws Exception {
        employee1.setId(null);
        given(this.employeeService.save(any()))
                .willReturn(employee1);
        String jsonEmployee = mapper.writeValueAsString(employee1);

        this.mvc.perform(post("/api/employee")
                .content(jsonEmployee)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployee));
        verify(this.employeeService, times(1)).save(employee1);
    }

    @Test
    public void testCreateHasAlreadyId() throws Exception {
        given(this.employeeService.save(any()))
                .willReturn(employee1);

        this.mvc.perform(post("/api/employee")
                .content(jsonEmployee)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(jsonEmployee));
        verify(this.employeeService, never()).save(employee1);
    }

}