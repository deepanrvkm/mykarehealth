'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';
import LoadingPage from '../loading';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/signin');
            } else if (!user.isAdmin) {
                router.push('/dashboard');
            } else {
                const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
                setUsers(allUsers);
            }
        }
    }, [user, loading, router]);

    if (loading) return <LoadingPage />;
    if (!user || !user.isAdmin) return null;

    return (
        <div className="min-h-[80vh] p-8 py-16 bg-teal-50">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                {users.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md px-8 py-16">
                        <p className="text-gray-600 text-lg text-center font-bold">No one has registered yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="bg-white">
                                <div className="flex bg-gray-200 text-gray-600 text-sm font-bold">
                                    <div className="w-1/4 py-3 px-6 text-left">No.</div>
                                    <div className="w-1/4 py-3 px-6 text-left">Username</div>
                                    <div className="w-2/4 py-3 px-6 text-left">Email</div>
                                </div>
                                {users.map((user, index) => (
                                    <div key={index} className={`flex text-gray-600 text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <div className="w-1/4 py-3 px-6 text-left whitespace-nowrap">{index + 1}</div>
                                        <div className="w-1/4 py-3 px-6 text-left">{user.username}</div>
                                        <div className="w-2/4 py-3 px-6 text-left">{user.email}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}