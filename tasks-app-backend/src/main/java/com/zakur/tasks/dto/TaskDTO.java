package com.zakur.tasks.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private Integer idTask;

    @NotNull
    @NotEmpty
    @Size(min = 3, max = 100)
    private String descriptionTask;

    private LocalDateTime creationDateTask;

    @NotNull
    private boolean completedTask;
}
