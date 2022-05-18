package dev.vrba.wheel.services

import dev.vrba.wheel.entities.SpinQueueEntry
import dev.vrba.wheel.entities.WheelEntry
import dev.vrba.wheel.exceptions.EntityNotFoundException
import dev.vrba.wheel.repositories.SpinQueueRepository
import dev.vrba.wheel.repositories.WheelEntryRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class FortuneWheelService(
    private val entryRepository: WheelEntryRepository,
    private val spinQueueRepository: SpinQueueRepository
) {

    fun getWheelEntries(): Iterable<WheelEntry> {
        return entryRepository.findAll()
    }

    fun addWheelEntry(title: String, description: String, color: String): WheelEntry {
        val entry = WheelEntry(UUID.randomUUID(), title, description, color)
        return entryRepository.save(entry)
    }

    fun removeWheelEntity(id: UUID) {
        val entry = entryRepository.findByIdOrNull(id) ?: throw EntityNotFoundException
        entryRepository.delete(entry)
    }

    fun spin(): WheelEntry {
        // If there are no pre-determined spins in the queue, fallback to random selection
        val current = spinQueueRepository.findByPreviousIsNull()
            ?: return entryRepository.findAll()
                .shuffled()
                .first()

        val next = spinQueueRepository.findByPrevious(current.id)
        next.previous = null

        spinQueueRepository.save(next)
        spinQueueRepository.delete(current)

        return current.entry
    }

    fun getMappedSpinQueue(): List<WheelEntry> {
        val queue = spinQueueRepository.findAll().toSet()

        if (queue.isEmpty()) {
            return emptyList()
        }

        // Find the last entry that no other entry points to
        val chain = queue.map { it.previous }
        val last = queue.first { it.id !in chain }

        // And link the whole chain from there
        TODO()
    }
}