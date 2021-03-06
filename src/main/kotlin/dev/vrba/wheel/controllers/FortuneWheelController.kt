package dev.vrba.wheel.controllers

import dev.vrba.wheel.entities.WheelEntry
import dev.vrba.wheel.services.FortuneWheelService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/v1/wheel")
class FortuneWheelController(private val service: FortuneWheelService) {

    @PostMapping("/spin")
    fun spin(): ResponseEntity<WheelEntry> {
        return ResponseEntity.ok(service.spin())
    }

    data class CreateEntryRequest(
        val title: String,
        val description: String,
        val color: String
    )

    @GetMapping("/entries")
    fun getEntries(): ResponseEntity<Iterable<WheelEntry>> {
        return ResponseEntity.ok(service.getWheelEntries())
    }

    @PostMapping("/entries/add")
    fun addEntry(@RequestBody request: CreateEntryRequest): ResponseEntity<Iterable<WheelEntry>> {
        service.addWheelEntry(request.title, request.description, request.color)
        return ResponseEntity.ok(service.getWheelEntries())
    }

    @PostMapping("/entries/{id}/remove")
    fun removeEntry(@PathVariable id: UUID): ResponseEntity<Iterable<WheelEntry>> {
        service.removeWheelEntity(id)
        return ResponseEntity.ok(service.getWheelEntries())
    }

    @GetMapping("/queue")
    fun getSpinQueue(): ResponseEntity<List<WheelEntry>> {
        return ResponseEntity.ok(service.getMappedSpinQueue())
    }

    data class UpdateSpinQueueRequest(val entries: List<UUID>)

    @PostMapping("/queue/update")
    fun updateSpinQueue(@RequestBody request: UpdateSpinQueueRequest): ResponseEntity<List<WheelEntry>> {
        return ResponseEntity.ok(service.updateMappingQueue(request.entries))
    }
}