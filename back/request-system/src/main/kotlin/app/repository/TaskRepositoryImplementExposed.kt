package app.repository

import app.models.Priority
import app.models.Status
import app.models.TaskModel

class TaskRepositoryImplement : TaskRepository {
    private val tasks = mutableListOf<TaskModel>()
    private var nextId = 1

    override suspend fun findAll() = tasks.toList()

    override suspend fun findById(id: Int) = tasks.find { it.id == id }

    override suspend fun findByName(name: String): List<TaskModel> {
        return tasks.filter {
            
        }
    }

    override suspend fun findByCategory(category: String): TaskModel? {
        TODO("Not yet implemented")
    }

    override suspend fun findByPriority(priority: Priority): List<TaskModel> {
        TODO("Not yet implemented")
    }

    override suspend fun findByStatus(status: Status): List<TaskModel> {
        TODO("Not yet implemented")
    }

}