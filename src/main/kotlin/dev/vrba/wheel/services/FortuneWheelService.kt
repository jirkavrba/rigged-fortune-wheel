package dev.vrba.wheel.services

import dev.vrba.wheel.entities.WheelEntry
import dev.vrba.wheel.exceptions.EntityNotFoundException
import dev.vrba.wheel.repositories.WheelEntryRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class FortuneWheelService(private val repository: WheelEntryRepository) {

    fun getWheelEntries(): Iterable<WheelEntry> {
        return repository.findAll()
    }

    fun addWheelEntry(title: String, description: String, color: String): WheelEntry {
        val entry = WheelEntry(UUID.randomUUID(), title, description, color)
        return repository.save(entry)
    }

    fun removeWheelEntity(id: UUID) {
        val entry = repository.findByIdOrNull(id) ?: throw EntityNotFoundException
        repository.delete(entry)
    }
}