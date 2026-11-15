package app.models

import kotlinx.serialization.Serializable

@Serializable
enum class Priority {
    BAIXA,
    MEDIA,
    ALTA
}