import type { Status, Priority } from "../types";

export const statusLabel: Record<Status, string> = {
    ABERTA: 'Aberta',
    EM_ANDAMENTO: 'Em andamento',
    CONCLUIDA: 'Concluída'
}
export const statusStyle: Record<Status, string> = {
  ABERTA: 'bg-green-200 text-green-700',
  EM_ANDAMENTO: 'bg-purple-200 text-purple-700',
  CONCLUIDA: 'bg-blue-200 text-blue-700',
};
export const priorityLabel: Record<Priority, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
};
export const priorityStyle: Record<Priority, string> = {
  BAIXA: 'bg-green-100 text-green-700',
  MEDIA: 'bg-yellow-100 text-yellow-700 border-2 border-dotted',
  ALTA: 'bg-red-100 text-red-700 border-2',
};