package app.repository

import app.models.Priority
import app.models.Status
import app.models.TaskModel

interface TaskRepository {
    suspend fun findAll(): List<TaskModel>
    suspend fun findById(id: Int): TaskModel?
    suspend fun findByName(name: String): List<TaskModel>
    suspend fun findByCategory(category: String): List<TaskModel>
    suspend fun findByPriority(priority: Priority): List<TaskModel>
    suspend fun findByStatus(status: Status): List<TaskModel>

    suspend fun create(task: TaskModel): TaskModel
    suspend fun update(id: Int, task: TaskModel): TaskModel?
    suspend fun delete(id: Int): Boolean
}