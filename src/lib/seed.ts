"use server";
import prisma from "@/db";
import { getDistricts, getDivisions } from "./utils";

const pharmacies = [
  {
    pharmacyName: "HealthPlus Pharmacy",
    pharmacyAddress: "123 Main Street, Dhaka",
    ownerPhoneNumber: "+8801712345678",
  },
  {
    pharmacyName: "CityCare Pharmacy",
    pharmacyAddress: "456 Elm Street, Chittagong",
    ownerPhoneNumber: "+8801712345679",
  },
  {
    pharmacyName: "Wellness Pharmacy",
    pharmacyAddress: "789 Oak Avenue, Barishal",
    ownerPhoneNumber: "+8801712345680",
  },
  {
    pharmacyName: "GreenLife Pharmacy",
    pharmacyAddress: "101 Pine Road, Khulna",
    ownerPhoneNumber: "+8801712345681",
  },
  {
    pharmacyName: "Family Pharmacy",
    pharmacyAddress: "202 Maple Street, Rajshahi",
    ownerPhoneNumber: "+8801712345682",
  },
  {
    pharmacyName: "CarePlus Pharmacy",
    pharmacyAddress: "303 Cedar Avenue, Sylhet",
    ownerPhoneNumber: "+8801712345683",
  },
  {
    pharmacyName: "BetterHealth Pharmacy",
    pharmacyAddress: "404 Birch Lane, Rangpur",
    ownerPhoneNumber: "+8801712345684",
  },
  {
    pharmacyName: "PrimePharmacy",
    pharmacyAddress: "505 Willow Drive, Mymensingh",
    ownerPhoneNumber: "+8801712345685",
  },
  {
    pharmacyName: "MedPlus Pharmacy",
    pharmacyAddress: "606 Poplar Street, Dhaka",
    ownerPhoneNumber: "+8801712345686",
  },
  {
    pharmacyName: "GoodHealth Pharmacy",
    pharmacyAddress: "707 Ash Road, Chittagong",
    ownerPhoneNumber: "+8801712345687",
  },
];

export const seed = async () => {
  // const divisions = await getDivisions();
  // if (divisions) {
  //   try {
  //     for (const division of divisions) {
  //       console.log(division);
  //       await prisma.division.create({
  //         data: {
  //           name: division.division,
  //           nameBn: division.divisionbn,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const divisions = await prisma.division.findMany();
  // await prisma.district.deleteMany();
  // for (const division of divisions) {
  //   const districts = await getDistricts(division.name);
  //   for (const district of districts) {
  //     const newDistrict = await prisma.district.create({
  //       data: {
  //         name: district.district,
  //         nameBn: district.districtbn,
  //         coordinates: district.coordinates,
  //         divisionId: division.id,
  //       },
  //     });
  //     console.log(newDistrict);
  //   }
  // }

  for (const pharmacy of pharmacies) {
    const newPharmacy = await prisma.agent.create({
      data: {
        name: pharmacy.pharmacyName,
        number: pharmacy.ownerPhoneNumber,
        location: pharmacy.pharmacyAddress,
      },
    });
    console.log(newPharmacy);
  }
};
