package com.dpontoavi.app

import app.models.InvalidTransitionException
import app.models.TaskNotFoundException
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause" , status = HttpStatusCode.InternalServerError)
        }
        exception<TaskNotFoundException> { call, cause ->
            call.respondText(text = "404: $cause", status = HttpStatusCode.NotFound)
        }
        exception<InvalidTransitionException> { call, cause ->
            call.respondText(text = "409: $cause", status = (HttpStatusCode.Conflict))
        }
    }
}
