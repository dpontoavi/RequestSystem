import { useState } from "react";
import type { Task, Status, Priority } from "../types";

interface newTaskModalProps {
  onClose: () => void;
  onTaskCreated: (task: Omit<Task, 'id'>) => void;
}
const emptyTask = {
    title: '',
    description: '',
    status: 'ABERTA' as Status,
    priority: 'BAIXA' as Priority,
    category: '',
};
export default function NewTaskModal({ onClose, onTaskCreated }: newTaskModalProps) {
    const [form, setForm] = useState(emptyTask);
    
    function set(field: string, value: string | number) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Nova Solicitação</h2>
                <div className="flex flex-col gap-4">
                    <Field label="Título">
                        <input placeholder="Título" onChange={(e) => set('title', e.target.value)} />
                    </Field>
                    <Section label="Descrição">
                        <textarea placeholder="Descrição" onChange={(e) => set('description', e.target.value)} />
                    </Section>
                    <Section label="Informações">
                        <Row>
                            <Field label="Status">
                                <select onChange={(e) => set('status', e.target.value)}>
                                    <option value="ABERTA">Aberta</option>
                                    <option value="EM_ANDAMENTO">Em Andamento</option>
                                    <option value="CONCLUIDA">Concluída</option>
                                </select>
                            </Field>
                            <Field label="Prioridade">
                                <select onChange={(e) => set('priority', e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                </select>
                            </Field>
                            <Field label="Categoria">
                                <input placeholder="Categoria" onChange={(e) => set('category', e.target.value)} />
                            </Field>
                        </Row>
                    </Section>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
                            Cancelar
                        </button>
                        <button onClick={() => onTaskCreated(form)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
                            Criar Solicitação
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold">{label}</label>
            {children}
        </div>
    );
}
function Row({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-2">
            {children}
        </div>
    );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold">{label}</label>
            {children}
        </div>
    );
}