package dev.vrba.wheel

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RiggedFortuneWheelApplication

fun main(args: Array<String>) {
    runApplication<RiggedFortuneWheelApplication>(*args)
}
