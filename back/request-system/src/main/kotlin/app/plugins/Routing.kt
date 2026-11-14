package com.dpontoavi.app

import app.repository.TaskRepositoryImplementExposed
import app.routes.TaskRoutes
import app.services.TaskService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.http.content.*

fun Application.configureRouting() {
    routing {
        /*
        get("/") {
            call.respondText("Hello, World!")
        }
        staticResources("/static", "static")
        get("/json/kotlinx-serialization") {
            call.respond(mapOf("hello" to "world"))
        }
        */
        val taskRepository = TaskRepositoryImplementExposed()
        val taskService = TaskService(taskRepository)
        TaskRoutes(taskService)

    }
}