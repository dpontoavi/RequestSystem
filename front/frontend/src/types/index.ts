export interface Task {
  id: number;
  title: string;
  desc: string;
  status: Status;
  priority: Priority;
  category: string;
  //createdAt: string; apos terminar o basico
  //updatedAt: string; apos terminar o basico
}
export type Status = 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type Priority = 'BAIXA' | 'MEDIA' | 'ALTA';
export type NewTask = Pick<Task, 'title' | 'desc' | 'category' | 'priority'>;