package app.models

class TaskNotFoundException(id: Int) :
        RuntimeException("Solicitação $id não encontrada")
class InvalidTransitionException(status: Status) :
        RuntimeException("A solicitação tentou avançar para um estado além de '$status'")
class InvalidTaskDataException(cause: String) :
        RuntimeException(cause)
class InvalidQueryException(cause: String) :
        RuntimeException(cause)