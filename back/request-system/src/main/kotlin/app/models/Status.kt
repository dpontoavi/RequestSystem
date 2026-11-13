package app.models

import kotlinx.serialization.Serializable

@Serializable
enum class Status {
    ABERTA,
    EM_ANDAMENTO,
    CONCLUIDA
}