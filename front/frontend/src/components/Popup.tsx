import { useState, useEffect } from "react";
import type { ApiError } from "../types/error";

interface PopupProps {
    error: ApiError;
    onClose: () => void
}

const DURATION_MS = 4000;

export default function Popup({ error, onClose}: PopupProps) {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (hovered) return;
        const timer = setTimeout(onClose, DURATION_MS + 500);
        return () => clearTimeout(timer);
    }, [hovered, onClose]);
    return (
        <>
            <div
                role="alert"
                onAnimationEnd={onClose}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="fixed bottom-8 left-8 sm:left-9 z-50 flex items-center justify-center animate-toast-left hover:[animation-play-state:paused]"    
            >
                <div className=" flex flex-row w-full max-w-sm rounded-4xl bg-white p-6 shadow-xl items-center ">
                    <div
                        className="w-10 h-10 bg-red-500 mr-4"
                        style={{
                            maskImage: "url('https://unpkg.com/lucide-static@latest/icons/circle-x.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "contain",
                            maskPosition: "center"
                        }}
                        />
                    <div>
                        <h2 className="text-lg font-semibold text-red-700">Operação inválida</h2>
                        {error.status !== null && (
                            <p className="mt-1 text-xs text-gray-500">Código {error.status}</p>
                        )}
                        <p className="mt-3 text-gray-800">{error.message}</p>
                    </div>
                    
                        <button onClick={onClose}
                        >
                            <div className="bg-black w-10 h-10 p-2"
                            style={{
                                maskImage: "url('https://unpkg.com/lucide-static@latest/icons/x.svg')",
                                maskRepeat: "no-repeat",
                                maskSize: "contain",
                                maskPosition: "center"
                            }}>

                            </div>
                        </button>
                </div>
            </div>
        </>
    );
}