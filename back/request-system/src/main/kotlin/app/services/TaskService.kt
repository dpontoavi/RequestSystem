package app.services

import app.database.TaskTable
import app.models.InvalidTaskDataException
import app.models.InvalidTransitionException
import app.models.Priority
import app.models.Status
import app.models.TaskModel
import app.models.TaskNotFoundException
import app.models.next
import app.repository.TaskRepository
import jdk.jfr.Category

class TaskService (private val repository: TaskRepository) {
    suspend fun getAllTasks() = repository.findAll()
    suspend fun getTaskById(id: Int) = repository.findById(id)
    suspend fun searchTask(title: String? = null,
                           status: Status? = null,
                           priority: Priority? = null,
                           category: String? = null ) = repository.searchTask(title, status, priority, category)
    suspend fun advanceStatus(id: Int) : TaskModel {
        val task = repository.findById(id)?: throw TaskNotFoundException(id)
        val nextStatus = task.status.next()?: throw InvalidTransitionException(task.status)
        return repository.updateStatus(id, nextStatus)?: throw TaskNotFoundException(id)
    }
    suspend fun create(task: TaskModel): TaskModel {
        val newtask = task.copy(id = 0, status = Status.ABERTA)
        return repository.create(newtask)
    }
    suspend fun update(id: Int, task: TaskModel) = repository.update(id,task)
    suspend fun delete(id: Int) = repository.delete(id)
}