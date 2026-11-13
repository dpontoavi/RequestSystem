package app.services

import app.models.Priority
import app.models.Status
import app.models.TaskModel
import app.repository.TaskRepository

class TaskService (private val repository: TaskRepository) {
    suspend fun getAllTasks() = repository.findAll()
    suspend fun getTaskById(id: Int) = repository.findById(id)
    suspend fun getTaskByName(name: String) = repository.findByName(name)
    suspend fun getTaskByCategory(category: String) = repository.findByCategory(category)
    suspend fun getTaskByPriority(priority: Priority) = repository.findByPriority(priority)
    suspend fun getTaskByStatus(status: Status) = repository.findByStatus(status)
    suspend fun create(task: TaskModel) = repository.create(task)
    suspend fun update(id: Int, task: TaskModel) = repository.update(id,task)
    suspend fun delete(id: Int) = repository.delete(id)
}