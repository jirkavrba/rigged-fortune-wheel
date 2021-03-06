package dev.vrba.wheel.repositories

import dev.vrba.wheel.entities.WheelEntry
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface WheelEntryRepository : CrudRepository<WheelEntry, UUID>