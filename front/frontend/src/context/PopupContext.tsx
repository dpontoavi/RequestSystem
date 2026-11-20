import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApiError } from "../types/error";
import Popup from "../components/Popup";

const PopupContext = createContext<(error: ApiError) => void>(() => {});

export function PopupProvider({ children }: { children: ReactNode}) {
    const [error, setError] = useState<ApiError | null>(null);

    return (
        <PopupContext.Provider value={setError}>
            {children}
            {error && <Popup error={error} onClose={() => setError(null)} />}
        </PopupContext.Provider>
    );
}
export const usePopup = () => useContext(PopupContext)