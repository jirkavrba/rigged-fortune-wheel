package dev.vrba.wheel.entities

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "spins_queue")
class SpinQueueEntry(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "wheel_entry_id")
    val entry: WheelEntry,

    @Column(nullable = false, unique = true)
    var previous: UUID? = null
)