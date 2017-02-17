package ch.renewinkler.demo_boot_angular.language;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Language {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String language;
}
