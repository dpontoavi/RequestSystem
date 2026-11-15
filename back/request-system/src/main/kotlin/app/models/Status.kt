package app.models

import kotlinx.serialization.Serializable

@Serializable
enum class Status {
    ABERTA,
    EM_ANDAMENTO,
    CONCLUIDA
}

inline fun <reified T: Enum<T>> T.next(): T? {
    val values = enumValues<T>()
    return values.getOrNull(ordinal + 1)
}