package app.routes

import app.models.InvalidQueryException
import app.models.Priority
import app.models.Status
import app.models.TaskModel
import app.services.TaskService
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.patch
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route

fun Route.TaskRoutes(service: TaskService) {
    route("/api/requests") {
        get {
            call.respond(service.getAllTasks())
        }
        get("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
            if (id == null) {
                call.respond(HttpStatusCode.BadRequest, "Id inválido")
                return@get
            }
            call.respond(service.getTaskById(id))
        }
        get {
            val params = call.request.queryParameters
            val status = params["status"]?.let { raw ->
                Status.entries.firstOrNull { it.name == raw.uppercase() }
                    ?: throw InvalidQueryException("Status '$raw' não existe")
            }
            val priority = params["priority"]?.let { raw ->
                Priority.entries.firstOrNull { it.name == raw.uppercase() }
                    ?: throw InvalidQueryException("Priority '$raw' não existe")
            }
            val title = params["title"]?.takeIf { it.isNotBlank() }
            val category = params["category"]?.takeIf { it.isNotBlank() }
            call.respond(service.searchTask(title, status, priority, category))

        }
        post {
            val task = call.receive<TaskModel>()
            call.respond(HttpStatusCode.Created, service.create(task))
        }
        put("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
            if (id == null) {
                return@put call.respond(HttpStatusCode.BadRequest, "Houve algo errado ao tentar puxar o id da solicitação")
            }
            val task = call.receive<TaskModel>()
            val updated = service.update(id, task)
            if (updated == null) {
                return@put call.respond(HttpStatusCode.NotFound, "Solicitação com id: ${id} não encontrado para atualizar")
            }
            call.respond(updated)
        }
        patch("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
            if (id == null) {
                return@patch call.respond(HttpStatusCode.BadRequest)
            }
            call.respond(service.advanceStatus(id))
        }
        delete("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
            if (id == null) {
                return@delete call.respond(HttpStatusCode.BadRequest, "Id inválido")
            }
            if (!service.delete(id)) return@delete call.respond(HttpStatusCode.NotFound, "Solicitação com id ${id} não encontrada")
            call.respond(HttpStatusCode.NoContent)
        }
    }
}