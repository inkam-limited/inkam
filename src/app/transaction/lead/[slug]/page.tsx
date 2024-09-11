import prisma from "@/db";
import LeadFrom from "./LeadFrom";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Overlay from "./Overlay";

const GeneratePharmacyLeadPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const pharmacy = await prisma.agent.findUnique({
    where: { agentId: params.slug },
  });

  if (!pharmacy) {
    return <div>Pharmacy not found</div>;
  }

  return (
    <main className="py-12 relative h-[100svh]">
      <div className="w-full flex flex-col max-w-7xl mx-auto px-4">
        <h2 className="text-xl">
          Generate Lead for <br />
          <span className="font-bold text-3xl tracking-tight py-2 text-transparent  bg-clip-text bg-gradient-to-br from-blue-500 via-yellow-500 to-fuchsia-600 rounded-full">
            {pharmacy.name}
          </span>
        </h2>
      </div>
      <div className="h-12 flex items-center justify-center py-8">
        <Marquee speed={20} direction="left" autoFill={true} className="">
          <div className="flex items-center justify-center ml-4">
            <Image
              height={30}
              width={30}
              src="/amarlab-logo.png"
              alt="amarlab logo"
            />
            <p className="text-gray-950 dark:text-gray-100 text-xs">
              Safe Home Sample Collection
            </p>
          </div>
          <div className="flex items-center justify-center ml-4">
            <Image
              height={30}
              width={30}
              src="/amarlab-logo.png"
              alt="amarlab logo"
            />
            <p className="text-gray-950 dark:text-gray-100 text-xs">
              Get Digital Report Within A Day
            </p>
          </div>
          <div className="flex items-center justify-center ml-4">
            <Image
              height={30}
              width={30}
              src="/amarlab-logo.png"
              alt="amarlab logo"
            />
            <p className="text-gray-950 dark:text-gray-100 text-xs">
              Offers And Affordable Prices{" "}
            </p>
          </div>
        </Marquee>
      </div>

      <LeadFrom pharmacy={pharmacy} />
    </main>
  );
};

export default GeneratePharmacyLeadPage;
