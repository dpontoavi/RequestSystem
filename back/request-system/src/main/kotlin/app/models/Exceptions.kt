package app.models

class TaskNotFoundException(id: Int) :
        RuntimeException("Solicitação $id não encontrada")
class InvalidTransitionException(status: Status) :
        RuntimeException("A solicitação tentou avançar para um estado além de '$status'")