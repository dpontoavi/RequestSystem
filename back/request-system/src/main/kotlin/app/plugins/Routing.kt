package com.dpontoavi.app

import app.repository.TaskRepositoryImplementExposed
import app.routes.TaskRoutes
import app.services.TaskService
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        val taskRepository = TaskRepositoryImplementExposed()
        val taskService = TaskService(taskRepository)
        TaskRoutes(taskService)

    }
}