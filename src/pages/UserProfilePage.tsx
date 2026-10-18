import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { UserService, type User } from '../api/user-service.js';
const UserProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        
        const userId = id ? Number(id) : 1;

        UserService.getUserById(userId, controller.signal)
            .then(data => setUser(data))
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setErr('Не вдалося завантажити дані користувача.');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return <div className="p-10 text-center text-yellow-400">Завантаження профілю...</div>;
    }

    if (err) {
        return <div className="p-10 text-center text-red-500">{err}</div>;
    }

    if (!user) {
        return <div className="p-10 text-center text-red-400">Користувача не знайдено</div>;
    }

    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="bg-gray-800 border-2 border-yellow-400 rounded-xl p-6 w-full max-w-sm text-white text-center shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    {user.firstName} {user.lastName}
                </h2>
                <div className="space-y-2 text-left bg-gray-900 p-4 rounded-lg mb-6">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Вік:</strong> {user.age}</p>
                </div>
                <Link 
                    to="/" 
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Головна сторінка
                </Link>
            </div>
        </div>
    );
};
  
export default UserProfilePage;