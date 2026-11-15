package app.database

import app.models.Priority
import app.models.Status
import org.jetbrains.exposed.v1.core.Table

object TaskTable : Table("Tasks") {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 128)
    val desc = varchar("description", 1024)
    val category = varchar("category", 32)
    val priority = enumerationByName("priority", 10, Priority::class)
    val status = enumerationByName("status", 20, Status::class)
}