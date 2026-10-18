import React, { useEffect, useState } from 'react';
import { UserService, type User } from '../api/user-service.js';
import axios from 'axios';

const CardsWithUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        UserService.getUsers(controller.signal)
            .then(data => setUsers(data))
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setError('Не вдалося завантажити список користувачів.');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await UserService.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Помилка видалення:', err);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-yellow-400">Завантаження списку...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-500">{error}</div>;
    }

    return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-emerald-400 text-center mb-8">
            Список користувачів
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {users.map(user => (
                <div 
                    key={user.id} 
                    className="bg-gray-800 border-2 border-emerald-500 rounded-xl p-5 shadow-lg flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-3">
                            {user.firstName} {user.lastName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-300 mb-4">
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                    >
                        Видалити
                    </button>
                </div>
            ))}
        </div>
    </div>
);
};

export default CardsWithUsers;