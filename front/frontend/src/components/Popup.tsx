import type { ApiError } from "../types/error";

interface PopupProps {
    error: ApiError;
    onClose: () => void
}
export default function Popup({ error, onClose}: PopupProps) {
    return (
        <>
            <div
                role="alert"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"    
            >
                <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                    <h2 className="text-lg font-semibold text-red-700">Operação inválida</h2>
                    {error.status !== null && (
                        <p className="mt-1 text-xs text-gray-500">Código {error.status}</p>
                    )}
                    <p className="mt-3 text-gray-800">{error.message}</p>
                    <button onClick={onClose}
                        className="mt-5 w-full rounded bg-red-600 py-2 text-white hover:bg-red-700"
                        >
                        OK
                    </button>
                </div>
            </div>
        </>
    );
}