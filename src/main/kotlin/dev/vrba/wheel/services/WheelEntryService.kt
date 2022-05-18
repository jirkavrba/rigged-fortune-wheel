package dev.vrba.wheel.services

import dev.vrba.wheel.entities.WheelEntry
import dev.vrba.wheel.exceptions.EntityNotFoundException
import dev.vrba.wheel.repositories.WheelEntryRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class WheelEntryService(private val repository: WheelEntryRepository) {

    fun getWheelEntries(): Iterable<WheelEntry> {
        return repository.findAll()
    }

    fun addWheelEntry(title: String, color: String): WheelEntry {
        val entry = WheelEntry(id = UUID.randomUUID(), title = title, color = color)
        return repository.save(entry)
    }

    fun removeWheelEntity(id: UUID) {
        val entry = repository.findByIdOrNull(id) ?: throw EntityNotFoundException
        repository.delete(entry)
    }

}