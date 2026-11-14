package app.models

class TaskNotFoundException(id: Int) :
        RuntimeException("Solicitação $id não encontrada")
class InvalidTransitionException(status: Status) :
        RuntimeException("A solicitação tentou avançar para um estado além de '$status'")
class InvalidTaskDataException(task: TaskModel) :
        RuntimeException("Solicitação enviada possui dados inválidos")
class InvalidQueryException(cause: String) :
        RuntimeException(cause)