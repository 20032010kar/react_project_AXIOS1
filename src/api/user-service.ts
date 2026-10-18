import api from "./dummy-json-instance.js";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
}

export class UserService {
    static getUsers = async (signal: AbortSignal): Promise<User[]> => {
        const response = await api.get('/users', { signal });
        return response.data?.users;
    }

    static getUserById = async (id: number, signal: AbortSignal): Promise<User> => {
        const response = await api.get(`/users/${id}`, { signal });
        return response.data;
    }

    static addUser = async (userData: Omit<User, 'id'>, signal?: AbortSignal): Promise<User> => {
        const config = signal ? { signal } : undefined;
        const response = await api.post('/users/add', userData, config);
        return response.data;
    }

    static updateUser = async (id: number, userData: Partial<User>, signal?: AbortSignal): Promise<User> => {
        const config = signal ? { signal } : undefined;
        const response = await api.put(`/users/${id}`, userData, config);
        return response.data;
    }

    static deleteUser = async (id: number, signal?: AbortSignal): Promise<User> => {
        const config = signal ? { signal } : undefined;
        const response = await api.delete(`/users/${id}`, config);
        return response.data;
    }
}