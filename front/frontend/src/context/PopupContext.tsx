import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApiError } from "../types/error";
import Popup from "../components/Popup";

const PopupContext = createContext<(error: ApiError) => void>(() => {});

export function PopupProvider({ children }: { children: ReactNode}) {
    const [popup, setPopup] = useState<{ error: ApiError; id: number } | null>(null);
    const show = (error: ApiError) => setPopup({ error, id: Date.now() });

    return (
        <PopupContext.Provider value={show}>
            {children}
            {popup && (
                <Popup key={popup.id} error={popup.error} onClose={() => setPopup(null)} />
            )}
        </PopupContext.Provider>
    );
}
export const usePopup = () => useContext(PopupContext)