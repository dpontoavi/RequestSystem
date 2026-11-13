package app.repository

import app.models.Priority
import app.models.Status
import app.models.TaskModel

interface TaskRepository {
    suspend fun findAll(): List<TaskModel>
    suspend fun findByName(name: String): List<TaskModel>
    suspend fun findByCategory(category: String): TaskModel?
    suspend fun findByPriority(priority: Priority): List<TaskModel>
    suspend fun findByStatus(status: Status): List<TaskModel>
}