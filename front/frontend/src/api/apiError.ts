import { isAxiosError } from "axios";
import type { ApiError } from "../types/error";

export function toApiError(error: unknown): ApiError {
    if (isAxiosError(error)) {
        if (error.response) {
            const message = error.response.data?.message
            ?? 'Ocorreu um erro inesperado no servidor';
            return {status: error.response.status, message}
        }
        return {status: null, message: 'Não foi possível conectar ao servidor'}
    }
    return { status: null, message: 'Erro inesperado'}
}