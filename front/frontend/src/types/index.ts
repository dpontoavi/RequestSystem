export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: string;
  //createdAt: string; apos terminar o basico
  //updatedAt: string; apos terminar o basico
}
export type Status = 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type Priority = 'BAIXA' | 'MEDIA' | 'ALTA';