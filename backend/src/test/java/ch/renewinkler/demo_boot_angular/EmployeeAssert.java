package ch.renewinkler.demo_boot_angular;

import org.assertj.core.api.AbstractAssert;

import java.util.Objects;

public class EmployeeAssert extends AbstractAssert<EmployeeAssert, Employee> {

    public EmployeeAssert(Employee actual) {
        super(actual, EmployeeAssert.class);
    }

    public static EmployeeAssert assertThat(Employee actual) {
        return new EmployeeAssert(actual);
    }

    public EmployeeAssert hasId(Long id) {
        isNotNull();
        if (!Objects.equals(actual.getId(), id)) {
            failWithMessage("Expected employee's id to be <%s> but was <%s>", id, actual.getId());
        }
        return this;
    }

    public EmployeeAssert hasFirstName(String firstName) {
        isNotNull();
        if (!Objects.equals(actual.getFirstName(), firstName)) {
            failWithMessage("Expected employee's firstname to be <%s> but was <%s>", firstName, actual.getFirstName());
        }
        return this;
    }

    public EmployeeAssert hasLastName(String lastName) {
        isNotNull();
        if (!Objects.equals(actual.getLastName(), lastName)) {
            failWithMessage("Expected employee's lastName to be <%s> but was <%s>", lastName, actual.getLastName());
        }
        return this;
    }

    public EmployeeAssert hasAge(int age) {
        isNotNull();
        if (!Objects.equals(actual.getAge(), age)) {
            failWithMessage("Expected employee's age to be <%s> but was <%s>", age, actual.getAge());
        }
        return this;
    }

    public EmployeeAssert hasProfession(String profession) {
        isNotNull();
        if (!Objects.equals(actual.getProfession(), profession)) {
            failWithMessage("Expected employee's profession to be <%s> but was <%s>", profession, actual.getProfession());
        }
        return this;
    }

    public EmployeeAssert isFulltime(boolean fulltime) {
        isNotNull();
        if (!Objects.equals(actual.getFullTime(), fulltime)) {
            failWithMessage("Expected employee's fulltime to be <%s> but was <%s>", fulltime, actual.getFullTime());
        }
        return this;
    }

    public EmployeeAssert hasLanguage(String language) {
        isNotNull();
        if (!Objects.equals(actual.getLanguage(), language)) {
            failWithMessage("Expected employee's language to be <%s> but was <%s>", language, actual.getLanguage());
        }
        return this;
    }
}
