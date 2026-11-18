import client from './client';
import { type Priority, type Status, type Task } from '../types';

export async function getTasks(): Promise<Task[]> {
  const response = await client.get<Task[]>('/api/requests');
  return response.data;
}
export async function getTaskById(id: number): Promise<Task> {
  const response = await client.get<Task>(`/api/requests/${id}`);
  return response.data;
}
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const response = await client.post<Task>('/api/requests', task);
  return response.data;
}
export async function updateTask(id: number, task: Omit<Task, 'id'>): Promise<Task> {
  const response = await client.put<Task>(`/api/requests/${id}`, task);
  return response.data;
}
export async function deleteTask(id: number): Promise<void> {
  await client.delete(`/api/requests/${id}`);
}
export async function advanceTaskStatus(id: number): Promise<Task> {
  const response = await client.patch<Task>(`/api/requests/${id}`);
  return response.data;
}
export async function searchTasks(filters?: { status?: Status; priority?: Priority; title?: string; category?: string }): Promise<Task[]> {
  const response = await client.get<Task[]>(`/api/requests`, { params: filters });
  return response.data;
}