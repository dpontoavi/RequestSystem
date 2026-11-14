package app.services

import app.database.TaskTable
import app.models.InvalidTransitionException
import app.models.Priority
import app.models.Status
import app.models.TaskModel
import app.models.TaskNotFoundException
import app.models.next
import app.repository.TaskRepository

class TaskService (private val repository: TaskRepository) {
    suspend fun getAllTasks() = repository.findAll()
    suspend fun getTaskById(id: Int) = repository.findById(id)
    suspend fun getTaskByName(name: String) = repository.findByName(name)
    suspend fun getTaskByCategory(category: String) = repository.findByCategory(category)
    suspend fun getTaskByPriority(priority: Priority) = repository.findByPriority(priority)
    suspend fun getTaskByStatus(status: Status) = repository.findByStatus(status)
    suspend fun advanceStatus(id: Int) : TaskModel {
        val task = repository.findById(id)?: throw TaskNotFoundException(id)
        val nextStatus = task.status.next()?: throw InvalidTransitionException(task.status)
        return repository.updateStatus(id, nextStatus)?: throw TaskNotFoundException(id)
    }
    suspend fun create(task: TaskModel) = repository.create(task)
    suspend fun update(id: Int, task: TaskModel) = repository.update(id,task)
    suspend fun delete(id: Int) = repository.delete(id)
}