import { useEffect, useState, type FormEvent } from "react"
import type { Priority, Status, Task } from "../types"
import { getTasks, searchTasks } from "../api/tasks";


const statuses: Status[] = ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"];
const priorities: Priority[] = ["BAIXA", "MEDIA", "ALTA"];

function formatLabel(value: string): string {
  const normalized = value.replace(/_/g, " ").toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getStatusStyles(status: string): string {
  if (status === "ABERTA") return "bg-green-100 text-green-700";
  if (status === "EM_ANDAMENTO" || status === "CONCLUIDA") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-700";
}

function getPriorityStyles(priority: string): string {
  if (priority === "BAIXA") return "bg-green-100 text-green-700";
  if (priority === "MEDIA") return "bg-yellow-100 text-yellow-700";
  if (priority === "ALTA") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}

export function HomePage() {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ searchOpen, setSearchOpen ] = useState<boolean>(false);
  const [ titleFilter, setTitleFilter ] = useState<string>("");
  const [ statusFilter, setStatusFilter ] = useState<Status | "">("");
  const [ priorityFilter, setPriorityFilter ] = useState<Priority | "">("");
  const [ categoryFilter, setCategoryFilter ] = useState<string>("");

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


  //real api call
  /*useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Failed to fetch tasks"))
      .finally(() => setLoading(false))
  }); */

  //test only
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTasks([
          {
            id: 1,
            title: "Task 1",
            description: "Description for Task 1",
            status: "ABERTA",
            priority: "ALTA",
            category: "Category 1",
          },
          {
            id: 2,
            title: "Task 2",
            description: "Description for Task 2",
            status: "EM_ANDAMENTO",
            priority: "MEDIA",
            category: "Category 2"
          },
          {
            id: 3,
            title: "Task 3",
            description: "Description for Task 3",
            status: "CONCLUIDA",
            priority: "BAIXA",
            category: "Category 3"
          },
          {
            id: 4,
            title: "Task 4",
            description: "Description for Task 4",
            status: "ABERTA",
            priority: "ALTA",
            category: "Category 4"
          },
          {
            id: 5,
            title: "Task 5",
            description: "Description for Task 5",
            status: "EM_ANDAMENTO",
            priority: "MEDIA",
            category: "Category 5"
          },
          {
            id: 6,
            title: "Task 6",
            description: "Description for Task 6",
            status: "CONCLUIDA",
            priority: "BAIXA",
            category: "Category 6"
          }
        ]);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
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
          className="z-10 shrink-0">
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
          className="z-10 shrink-0">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        </div>
        <p className="text-gray-500 text-lg text-center p-32">{error}</p>
      </>
      );
  }
  if (!tasks || tasks.length === 0) {
    return (
      <>
        <div className="sticky top-0 z-10 flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <button
          type="button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-expanded={searchOpen}
          aria-label="Toggle task search"
          className="z-10 shrink-0">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        </div>
        <p className="text-gray-500 text-lg text-center p-32">Nenhuma Solicitação encontrada</p>
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
          className="z-10 shrink-0">
          <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="" className="w-10 h-10 mr-2 bg-[#6a71d9] rounded-xl p-2 hover:bg-white transition-colors duration-200" />
        </button>
        <form
          onSubmit={handleSearch}
          className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? "w-full opacity-100 ml-2" : "w-0 opacity-0 ml-0"}`}
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
              <option key={status} value={status}>{formatLabel(status)}</option>
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
              <option key={priority} value={priority}>{formatLabel(priority)}</option>
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
      <div className="fixed bottom-8 right-8 z-20 flex flex-row p-4 flex justify-between items-center">
        <button className="leading-0 bg-radial-[at_25%_25%] from-blue-600 to-blue-400 to-75% text-white rounded-full flex h-16 w-16 text-4xl items-center justify-center hover:from-cyan-300 hover:to-cyan-400 transition-colors duration-400">+</button>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-6xl font-bold mb-4 p-5">Solicitações</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-300 rounded-4xl shadow-md p-4 drop-shadow-xl/15 hover:drop-shadow-xl/25 transition-shadow duration-1000">
              <div className="flex flex-col py-4">
                <span className="text-xl font-bold mb-2">{task.title}</span>
                <span className="h-29 text-gray-600 bg-white rounded-2xl p-3">{task.description}</span>
              </div>
              <div className="flex flex-row justify-between items-center mt-4 p-4">
                <div className={`rounded-2xl p-2 flex flex-row items-center ${getStatusStyles(task.status)}`}>
                  <span className="text-sm">{formatLabel(task.status)}</span>
                  <button className=" leading-0 bg-blue-500 text-white rounded-full w-8 h-8 flex text-xl items-center justify-center ml-2">+</button>
                </div>
                <div className={`rounded-2xl p-2 ${getPriorityStyles(task.priority)}`}>
                  <span className="text-sm">{formatLabel(task.priority)}</span>
                </div>
                <div className="bg-white rounded-2xl p-2">
                  <span className="text-sm text-gray-500">{task.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}