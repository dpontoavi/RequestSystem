package com.dpontoavi.app

import app.models.ErrorResponse
import app.models.InvalidTaskDataException
import app.models.InvalidTransitionException
import app.models.TaskNotFoundException
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.BadRequestException
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respond(HttpStatusCode.InternalServerError, ErrorResponse(cause.message ?: "Internal Server Error"))
        }
        exception<TaskNotFoundException> { call, cause ->
            call.respond(HttpStatusCode.NotFound, ErrorResponse(cause.message ?: "Solicitação não encontrada"))
        }
        exception<InvalidTransitionException> { call, cause ->
            call.respond(HttpStatusCode.Conflict, ErrorResponse(cause.message ?: "Transição de estado inválida"))
        }
        exception<InvalidTaskDataException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, ErrorResponse(cause.message ?: "$cause"))
        }
        exception<BadRequestException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, ErrorResponse(cause.message ?: "Corpo da requisição inválido; Confira se os campos foram preenchidos"))
        }
    }
}
