package dev.vrba.wheel.repositories

import dev.vrba.wheel.entities.SpinQueueEntry
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface SpinQueueRepository : CrudRepository<SpinQueueEntry, UUID> {

    fun findFirstByOrderById(): SpinQueueEntry?

}