package dev.vrba.wheel.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
object EntityNotFoundException : RuntimeException("Entity not found")