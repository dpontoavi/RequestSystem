import { useEffect, useState, type FormEvent } from "react"
import type { NewTask, Priority, Status, Task } from "../types"
import { advanceTaskStatus, createTask, deleteTask, getTasks, searchTasks, updateTask } from "../api/tasks";
import NewTaskModal from "../components/NewTaskModal";
import { priorityLabel, priorityStyle, statusLabel, statusStyle } from "../constants/taskLabels";


const statuses: Status[] = ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"];
const priorities: Priority[] = ["BAIXA", "MEDIA", "ALTA"];

export function HomePage() {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ searchOpen, setSearchOpen ] = useState<boolean>(false);
  const [ titleFilter, setTitleFilter ] = useState<string>("");
  const [ statusFilter, setStatusFilter ] = useState<Status | "">("");
  const [ priorityFilter, setPriorityFilter ] = useState<Priority | "">("");
  const [ categoryFilter, setCategoryFilter ] = useState<string>("");
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ pendingId, setPendingId ] = useState<number | null>(null);
  const [ openMenuId, setOpenMenuId ] = useState<number | null>(null);
  const [ editingTask, setEditingTask ] = useState<Task | null>(null);
  const [ deletingTask, setDeletingTask ] = useState<Task | null>(null);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const results = await searchTasks({
        ...(titleFilter ? { title: titleFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(priorityFilter ? { priority: priorityFilter } : {}),
        ...(categoryFilter ? { category: categoryFilter } : {}),
      });
      setTasks(results);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateTask = async (task: Omit<NewTask, 'id'>) => {
    const newTask = await createTask(task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false);
  }
  const handleUpdateTask = async (task: NewTask) => {
    if (!editingTask) return;
    const updatedTask = await updateTask(editingTask.id, {
      ...task,
      status: editingTask.status,
    });
    setTasks((prevTasks) =>
      prevTasks.map((item) => (item.id === editingTask.id ? updatedTask : item))
    );
    setEditingTask(null);
  }
  const closeTaskModal = () => {
    setShowModal(false);
    setEditingTask(null);
  }
  const handleAdvanceTaskStatus = async (taskId: number) => {
    setPendingId(taskId);
    try {
      const updatedTask = await advanceTaskStatus(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch {
      setError("Failed to advance task status");
    } finally {
      setPendingId(null);
    }
  }
  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    const taskId = deletingTask.id;
    setPendingId(taskId);
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setOpenMenuId(null);
      setDeletingTask(null);
    } catch {
      setError("Failed to delete task");
    } finally {
      setPendingId(null);
    }
  }

  //real api call
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Failed to fetch tasks"))
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-task-menu]")) return;
      setOpenMenuId(null);
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  if (loading) {
    return (
    <>
      <div className="sticky top-0 z-10 flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-expanded={searchOpen}
          aria-label="Toggle task search"
          className="z-10 shrink-0 cursor-pointer">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        </div>
      <p className="text-gray-500 text-lg text-center p-32">Carregando Solicitações</p>
    </>
    );
  }
  if (error) {
    return (
      <>
        <div className="sticky top-0 z-10 flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-expanded={searchOpen}
          aria-label="Toggle task search"
          className="z-10 shrink-0 cursor-pointer">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        </div>
        <p className="text-gray-500 text-lg text-center p-32">{error}</p>
      </>
      );
  }
  if (!tasks.length) {
    return (
      <>
        <div className="sticky top-0 z-10 flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-expanded={searchOpen}
          aria-label="Toggle task search"
          className="z-10 shrink-0 cursor-pointer">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        </div>
        <div className=" z-20 flex flex-col p-4 justify-center items-center">
          <p className="flex text-gray-500 text-lg text-center p-32">Nenhuma Solicitação encontrada</p>
        
          <button onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
            className=" bg-radial-[at_25%_25%] from-blue-600 to-blue-400 to-75% text-white rounded-2xl flex w-120 h-16 text-4xl p-4 items-center justify-center hover:from-cyan-300 hover:to-cyan-400 transition-colors duration-400">
            Crie a primeira Solicitação
          </button>
          {showModal && (
            <NewTaskModal
              onClose={closeTaskModal}
              onSubmit={handleCreateTask}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      { /* Tools */}
      
      <div className="sticky top-0 z-10 flex flex-row items-center bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-expanded={searchOpen}
          aria-label="Toggle task search"
          className="z-10 shrink-0 cursor-pointer">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        <form
          onSubmit={handleSearch}
          className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "w-full/2 opacity-100 ml-2" : "w-0 opacity-0 ml-0"}`}
        >
          <input
            type="text"
            value={titleFilter}
            onChange={(event) => setTitleFilter(event.target.value)}
            placeholder="Title"
            aria-label="Title"
            className="min-w-28 flex-1 rounded-lg bg-white px-3 py-2 text-sm outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as Status | "")}
            aria-label="Status"
            className="min-w-36 rounded-lg bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{statusLabel[status]}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value as Priority | "")}
            aria-label="Priority"
            className="min-w-36 rounded-lg bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="">All priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priorityLabel[priority]}</option>
            ))}
          </select>
          <input
            type="text"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            placeholder="Category"
            aria-label="Category"
            className="min-w-28 flex-1 rounded-lg bg-white px-3 py-2 text-sm outline-none"
          />
          <button type="submit" className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
            Search
          </button>
        </form>
      </div>
      { /* Tasks section */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-row p-4 justify-between items-center">
        <button onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="leading-none  bg-radial-[at_25%_25%] items-center from-blue-600 to-blue-400 to-75% text-white rounded-full flex h-16 w-16 text-4xl items-center justify-center hover:from-cyan-300 hover:to-cyan-400 transition-colors duration-400">
            +
          </button>
          {showModal && (
            <NewTaskModal
              onClose={closeTaskModal}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              initialTask={editingTask ? {
                title: editingTask.title,
                desc: editingTask.desc,
                category: editingTask.category,
                priority: editingTask.priority,
              } : undefined}
              mode={editingTask ? "edit" : "create"}
            />
          )}
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-6xl font-bold mb-4 p-5 underline">Solicitações</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          {tasks.map((task) => (
            <div key={task.id} className="relative bg-gray-100 rounded-4xl shadow-md border-2 border-dashed p-4 drop-shadow-xl/15 hover:drop-shadow-xl/25 animate-pop-in transition duration-500">
              <div className="flex flex-col">

                <div className="flex flex-row justify-between">
                  <span className="text-xl font-bold mb-2">{task.title}</span>
                  <div data-task-menu>
                    <button
                      type="button"
                      onClick={() => setOpenMenuId((currentId) => currentId === task.id ? null : task.id)}
                      aria-expanded={openMenuId === task.id}
                      aria-label={`Ações para ${task.title}`}
                      className="flex h-9 w-9 items-center mb-3 cursor-pointer shadow-lg justify-center rounded-full bg-white text-xl font-bold text-gray-700 shadow hover:bg-gray-100 transition duration-500 "
                    >
                      ⋯
                    </button>
                    {openMenuId === task.id && (
                      <div className="absolute right-0 top-11 z-30 w-32 overflow-hidden rounded-xl bg-white py-1 shadow-lg backdrop-blur-sm z-50 animate-fade-in">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTask(task);
                            setOpenMenuId(null);
                            setShowModal(true);
                          }}
                          className="cursor-pointer block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-500"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeletingTask(task);
                            setOpenMenuId(null);
                          }}
                          disabled={pendingId === task.id}
                          className="cursor-pointer block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 transition duration-500"
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`rounded-2xl p-2 mb-4 text-center ${priorityStyle[task.priority]}`}>
                  <span className="text-lg font-bold">{priorityLabel[task.priority]}</span>
                </div>
                <textarea className="h-29 text-gray-600 bg-white rounded-2xl p-3">{task.desc}</textarea>
              </div>
              <div className="flex flex-col mt-4 p-4">
                <span className="text-2xl font-semibold mb-2 underline">Status:</span>
                <div className={`rounded-2xl p-2 flex flex-row justify-between items-center mb-4 ${statusStyle[task.status]}`}>

                  <span className="text-lg font-semibold">{statusLabel[task.status]}</span>
                  <button onClick={() => handleAdvanceTaskStatus(task.id)} 
                    disabled={pendingId === task.id || task.status === "CONCLUIDA"} 
                    className=" leading-0 bg-blue-500 text-white rounded-full w-8 h-8 flex text-xl items-center justify-center items-center cursor-pointer disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ml-2 hover:bg-blue-800 transition duration-300">
                    +
                  </button>
                </div>
                <span className="text-2xl font-semibold mb-2 underline">Categoria:</span>
                <div className="bg-white rounded-2xl p-2">
                  <span className="text-lg text-gray-500">{task.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {deletingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-task-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 id="delete-task-title" className="text-xl font-bold text-gray-900">
              Excluir solicitação?
            </h2>
            <p className="mt-2 text-gray-600">
              Tem certeza de que deseja excluir “{deletingTask.title}”? Esta ação não pode ser desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingTask(null)}
                disabled={pendingId === deletingTask.id}
                className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteTask}
                disabled={pendingId === deletingTask.id}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pendingId === deletingTask.id ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}