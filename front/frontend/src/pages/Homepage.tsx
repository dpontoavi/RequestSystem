import { useEffect, useState } from "react"
import type { Task } from "../types"
import { getTasks } from "../api/tasks";

export function HomePage() {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ searchQuery, setSearchQuery ] = useState<string>("");
  const [ statusFilter, setStatusFilter ] = useState<string>("");
  const [ priorityFilter, setPriorityFilter ] = useState<string>("");
  const [ showModal, setShowModal ] = useState<boolean>(false);


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
    return <p>Carregando Solicitações</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!tasks || tasks.length === 0) {
    return <p>Nenhuma Solicitação encontrada</p>;
  }

  return (
    <div>
      { /* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 p-4">
        <img src="https://unpkg.com/lucide-static@1.75.0/icons/search.svg" alt="Search" className="w-6 h-6 mr-2" />
      </div>
      { /* Tasks section */}
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
                <span className="text-sm text-gray-500">{task.status}</span>
                <span className="text-sm text-gray-500">{task.priority}</span>
                <span className="text-sm text-gray-500">{task.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}