import { useState } from "react";
import type { NewTask } from "../types";
import { toApiError } from "../api/apiError";
import { usePopup } from "../context/PopupContext";

interface newTaskModalProps {
  onClose: () => void;
  onSubmit: (task: NewTask) => void | Promise<void>;
  initialTask?: NewTask;
  mode?: "create" | "edit";
}
const emptyTask: NewTask = {
    title: '',
    desc: '',
    category: '',
    priority: 'BAIXA',
};
export default function NewTaskModal({ onClose, onSubmit, initialTask, mode = "create" }: newTaskModalProps) {
    const [form, setForm] = useState<NewTask>(initialTask ?? emptyTask);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const showPopup = usePopup();
    
    function set(field: string, value: string | number) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {mode === "edit" ? "Editar Solicitação" : "Nova Solicitação"}
                </h2>
                <div className="flex flex-col gap-4">
                    <Field label="Título">
                        <input value={form.title} placeholder="Título" onChange={(e) => set('title', e.target.value)} />
                    </Field>
                    <Section label="Descrição">
                        <textarea value={form.desc} placeholder="Descrição" onChange={(e) => set('desc', e.target.value)} />
                    </Section>
                    <Section label="Informações">
                        <Row>
                            <Field label="Prioridade">
                                <select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                </select>
                            </Field>
                            <Field label="Categoria">
                                <input value={form.category} placeholder="Categoria" onChange={(e) => set('category', e.target.value)} />
                            </Field>
                        </Row>
                    </Section>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
                            Cancelar
                        </button>
                        <button onClick={() => handleSubmit(form)} disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:bg-blue-300 transition-colors duration-200 ">
                            {isSubmitting
                                ? (mode === "edit" ? 'Salvando...' : 'Criando...')
                                : (mode === "edit" ? 'Salvar' : 'Criar Solicitação')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    async function handleSubmit(task: NewTask) {
    setIsSubmitting(true);
    try {
        await onSubmit(task);
        onClose();
    } catch (error) {
        showPopup(toApiError(error))
    } finally {
        setIsSubmitting(false);
    }
}
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