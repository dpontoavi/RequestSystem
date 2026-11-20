package app.services

import app.models.InvalidTaskDataException
import app.models.InvalidTransitionException
import app.models.Priority
import app.models.Status
import app.models.TaskModel
import app.models.TaskNotFoundException
import app.models.next
import app.repository.TaskRepository

class TaskService (private val repository: TaskRepository) {
    suspend fun getAllTasks() = repository.findAll()
    suspend fun getTaskById(id: Int): TaskModel = repository.findById(id)?: throw TaskNotFoundException(id)
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
        val invalids = buildList {
            if (task.title.isBlank()) add("title")
            if (task.desc.isBlank()) add("desc")
            if (task.category.isBlank()) add("category")
        }
        if (invalids.isNotEmpty()) throw InvalidTaskDataException("Campos obrigatórios vazios: ${invalids.joinToString(", ")}")
        val newtask = task.copy(id = 0, status = Status.ABERTA, title = task.title.trim(), desc = task.desc.trim(), category = task.category.trim())
        return repository.create(newtask)
    }
    suspend fun update(id: Int, task: TaskModel) = repository.update(id,task)
    suspend fun delete(id: Int) = repository.delete(id)
}