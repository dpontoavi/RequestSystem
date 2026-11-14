package app.repository

import app.models.Priority
import app.models.Status
import app.models.TaskModel
import jdk.jfr.Category

interface TaskRepository {
    suspend fun findAll(): List<TaskModel>
    suspend fun findById(id: Int): TaskModel?
    suspend fun searchTask(title: String?, status: Status?, priority: Priority?, category: String?): List<TaskModel>
    suspend fun updateStatus(id: Int, newStatus: Status): TaskModel?
    suspend fun create(task: TaskModel): TaskModel
    suspend fun update(id: Int, task: TaskModel): TaskModel?
    suspend fun delete(id: Int): Boolean
}