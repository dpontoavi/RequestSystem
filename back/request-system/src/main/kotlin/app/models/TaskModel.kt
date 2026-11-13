package app.models

import kotlinx.serialization.Serializable

@Serializable
data class TaskModel(
    val id: Int = 0,
    val title: String,
    val desc: String,
    val category: String,
    val priority: Priority,
    val status: Status = Status.ABERTA,
)
