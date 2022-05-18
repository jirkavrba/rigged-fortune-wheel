package dev.vrba.wheel.entities

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "spins_queue")
class SpinQueueEntry(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Int = 0,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "wheel_entry_id")
    val entry: WheelEntry,
)