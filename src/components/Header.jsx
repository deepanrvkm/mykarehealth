'use client';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/assets/images';
import Button from './Button';

export default function Header() {
  const { user, logout } = useUser();
  const router = useRouter();

  const signin = () => {
    router.push('/auth/signin')
  }

  return (
    <header className="text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="w-[100px] md:w-[120px] lg:w-[148px]">
          <Image src={Logo} alt="" />
        </Link>
        <div>
          {user ? (
            <>
              <strong className="mr-4 text-gray-700">Hi, <span className="capitalize">{user.username}</span></strong>
              <Button onClick={logout} text={"Sign Out"} />
            </>
          ) : (
            <Button onClick={signin} text={"Sign In"} />
          )}
        </div>
      </div>
    </header>
  );
}
