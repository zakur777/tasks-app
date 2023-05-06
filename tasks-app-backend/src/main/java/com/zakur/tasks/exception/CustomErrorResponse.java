package com.zakur.tasks.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorResponse {
    private LocalDateTime dateTime;
    private String message;
    private String path;
}
