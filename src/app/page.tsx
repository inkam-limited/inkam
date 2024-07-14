import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-4 ">
        <div className="col-span-2 relative h-[550px]">
          <Image
            src="/inkam-cover.png"
            alt="Inkam Logo"
            className="top-0 left-0 h-full w-full object-cover"
            fill
          />
        </div>
        <div className=" flex flex-col gap-4 p-10">
          <h1 className="text-4xl font-bold">Join Inkam</h1>
          <p>Largest distribution network in bangladesh</p>
        </div>
        <div className="flex items-start flex-col gap-4 p-10">
          <Link
            className="px-10 py-4 font-bold hover:bg-blue-700 transition-all bg-blue-600 text-neutral-50 rounded-sm"
            href="/onboard"
          >
            Join as a Agent
          </Link>
          <Link
            className="px-6 py-4 outline font-bold rounded-sm"
            href="/dashboard"
          >
            Login to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
