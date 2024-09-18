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
    <main className="py-12 relative h-[100svh] overflow-hidden">
      <div className="w-full flex items-center justify-between  max-w-7xl mx-auto px-4">
        <h2 className="text-sm">
          Order home diagnostic <br />
          <span className="font-semibold text-lg tracking-tight py-2 text-transparent  bg-clip-text bg-gradient-to-br from-blue-500 via-yellow-500 to-fuchsia-600 rounded-full">
            {pharmacy.name}
          </span>
          <br />
          <span className="text-gray-200/60">{pharmacy.number}</span>
        </h2>
        <div className="flex items-center justify-center">
          <span className="text-xs w-[70px] font-semibold">
            Powered by Amarlab
          </span>
          <Image
            height={50}
            width={50}
            src="/amarlab-logo.png"
            alt="amarlab logo"
          />
        </div>
      </div>
      <div className="h-12 flex items-center justify-center py-8">
        <Marquee speed={20} direction="left" autoFill={true} className="">
          <p className="text-gray-950 dark:text-gray-100 text-xs px-4 py-2 mx-2 bg-gradient-to-bl from-gray-950/30 to-gray-900/30 backdrop-blur-xl rounded-2xl">
            Safe Home Sample Collection
          </p>
          <p className="text-gray-950 dark:text-gray-100 text-xs px-4 py-2 mx-2 bg-gradient-to-bl from-gray-950/30 to-gray-900/30 backdrop-blur-xl rounded-2xl">
            Get Digital Report Within A Day
          </p>
          <p className="text-gray-950 dark:text-gray-100 text-xs px-4 py-2 mx-2 bg-gradient-to-bl from-gray-950/30 to-gray-900/30 backdrop-blur-xl rounded-2xl">
            Offers And Affordable Prices{" "}
          </p>
        </Marquee>
      </div>

      <LeadFrom pharmacy={pharmacy} />
    </main>
  );
};

export default GeneratePharmacyLeadPage;
