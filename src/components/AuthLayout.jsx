import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/assets/images';

export default function AuthLayout({ children, title }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="z-10 rounded-[20px] shadow-lg bg-white w-[640px] p-10 m-8">
                <div className="flex justify-between items-center p-4 pb-8">
                    <h1 className="text-3xl font-bold text-center text-[#00b4b9]">{title}</h1>
                    <Link href="/">
                        <Image src={Logo} alt="" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}