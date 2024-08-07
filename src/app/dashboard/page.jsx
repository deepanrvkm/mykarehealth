'use client';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';
import LoadingPage from '../loading';

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);


  if (loading) return <LoadingPage />;
  if (!user) return null;

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-100">
      <div className="container mx-auto bg-white p-8 py-16 rounded-lg shadow-md w-full text-center mx-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, <span className="capitalize">{user.username}</span>!</h1>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
}