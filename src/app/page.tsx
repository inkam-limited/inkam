import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="md:col-span-2 relative h-[280px] md:h-[550px]">
          <Image
            src="/inkam-cover.png"
            alt="Inkam Logo"
            className="top-0 left-0 h-full w-full object-cover"
            fill
          />
        </div>
        <div className=" flex flex-col items-center md:items-start gap-4 p-10">
          <h1 className="text-4xl font-bold">Join Inkam</h1>
          <p className="text-center md:text-left">
            Largest distribution network in bangladesh
          </p>
        </div>
        <div className="flex items-center md:items-start flex-col gap-4 p-10">
          <Link
            className="px-6 py-4 border w-56 text-center text-neutral-50 bg-blue-700 border-gray-700 font-bold rounded-sm"
            href="/onboard"
          >
            Join as a Agent
          </Link>
          <LoginLink className="px-6 py-4 border w-56 text-center border-gray-700 font-bold rounded-sm">
            Login to Dashboard
          </LoginLink>
          <Link
            href="/find"
            className="px-6 py-4 border w-56 text-center text-neutral-50 bg-blue-700 border-gray-700 font-bold rounded-sm"
          >
            See agent Transactions
          </Link>
        </div>
      </div>
    </div>
  );
}
