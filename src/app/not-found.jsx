import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section >
      <div className="container mx-auto p-16 flex flex-col justify-center items-center min-h-60 my-20 bg-slate-100 text-gray-700 rounded-xl">
        <h1 className="text-4xl font-black pb-2">We&apos;re Sorry.</h1>
        <p className="pb-8">It seems like the page you&apos;re searching for has taken a vacation.</p>
        <p><Link href="/" className="button font-bold">Back to Home</Link></p>
      </div>
    </section>
  );
};
export default NotFoundPage;