import Image from "next/image";

export default function Home() {
  return (
    <div cname="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-lg">This is a simple Next.js application.</p>
    </div>
  );
}
