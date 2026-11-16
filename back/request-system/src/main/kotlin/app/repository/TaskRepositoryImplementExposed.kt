package app.repository

import app.database.TaskTable
import app.models.Priority
import app.models.Status
import app.models.TaskModel
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.single
import kotlinx.coroutines.flow.singleOrNull
import kotlinx.coroutines.flow.toList
import org.jetbrains.exposed.v1.core.Op
import org.jetbrains.exposed.v1.core.ResultRow
import org.jetbrains.exposed.v1.core.and
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.r2dbc.deleteWhere
import org.jetbrains.exposed.v1.r2dbc.insert
import org.jetbrains.exposed.v1.r2dbc.selectAll
import org.jetbrains.exposed.v1.r2dbc.transactions.suspendTransaction
import org.jetbrains.exposed.v1.r2dbc.update


class TaskRepositoryImplementExposed : TaskRepository {
    private fun ResultRow.toTask() = TaskModel(
        id = this[TaskTable.id],
        title = this[TaskTable.title],
        desc = this[TaskTable.desc],
        category = this[TaskTable.category],
        priority = this[TaskTable.priority]
    )

    override suspend fun findAll(): List<TaskModel> = suspendTransaction {
        TaskTable.selectAll()
            .map { it.toTask() }
            .toList()
    }

    override suspend fun findById(id: Int): TaskModel? = suspendTransaction {
        TaskTable.selectAll()
            .where { TaskTable.id eq id }
            .map { it.toTask() }
            .singleOrNull()
    }

    override suspend fun searchTask(
        title: String?,
        status: Status?,
        priority: Priority?,
        category: String?
    ): List<TaskModel> = suspendTransaction {
        TaskTable.selectAll()
            .where {
                val conditions = mutableSetOf<Op<Boolean>>()
                if (title != null) conditions.add(TaskTable.title eq title)
                if (status != null) conditions.add(TaskTable.status eq status)
                if (priority != null) conditions.add(TaskTable.priority eq priority)
                if (category != null) conditions.add(TaskTable.category eq category)
                conditions.reduceOrNull {a, b -> a and b } ?: Op.TRUE
            }
            .map { it.toTask() }
            .toList()
    }

    override suspend fun updateStatus(id: Int,newStatus: Status): TaskModel? = suspendTransaction {
            val updatedTaskStatus = TaskTable.update({ TaskTable.id eq id}) {
                it[status] = newStatus
            }
            if (updatedTaskStatus == 0) null
            else TaskTable.selectAll()
                .where { TaskTable.id eq id }
                .map { it.toTask() }
                .singleOrNull()
    }

    override suspend fun create(task: TaskModel): TaskModel = suspendTransaction {
        val insertedId = TaskTable.insert {
            it[title] = task.title
            it[desc] = task.desc
            it[category] = task.category
            it[priority] = task.priority
            it[status] = task.status
        } get TaskTable.id
        TaskTable.selectAll()
            .where { TaskTable.id eq insertedId }
            .map { it.toTask() }
            .single()
    }

    override suspend fun update(id: Int, task: TaskModel): TaskModel? = suspendTransaction {
        val updated = TaskTable.update({ TaskTable.id eq id}) {
            it[title] = task.title
            it[desc] = task.desc
            it[category] = task.category
            it[priority] = task.priority
            it[status] = task.status
        }
        if (updated == 0) null
        else TaskTable.selectAll()
            .where { TaskTable.id eq id }
            .map { it.toTask() }
            .singleOrNull()
    }

    override suspend fun delete(id: Int): Boolean = suspendTransaction {
        TaskTable.deleteWhere { TaskTable.id eq id } > 0
    }

}