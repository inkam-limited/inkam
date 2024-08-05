"use server";

import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
  console.log("Seeding pharmacies...");
  for (const pharmacy of pharmacies) {
    try {
      await prisma.agent.create({
        data: {
          name: pharmacy.pharmacyName,
          number: pharmacy.ownerPhoneNumber,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

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

const labTests = [
  {
    name: "Vitamin D (25-OH)",
    price: 4000,
    commissionRate: "55%",
    commission: 2200,
  },
  {
    name: "Anti Mullerian Hormone (AMH)",
    price: 4000,
    commissionRate: "50%",
    commission: 2000,
  },
  {
    name: "HCV Ag (Quantitative)",
    price: 4000,
    commissionRate: "50%",
    commission: 2000,
  },
  {
    name: "Iron Profile",
    price: 3400,
    commissionRate: "40%",
    commission: 1360,
  },
  {
    name: "NT-ProBNP/proBNP/BNP",
    price: 3000,
    commissionRate: "40%",
    commission: 1200,
  },
  { name: "Vitamin B12", price: 2500, commissionRate: "40%", commission: 1000 },
  { name: "Anti ds DNA", price: 2100, commissionRate: "40%", commission: 840 },
  { name: "Aldolase", price: 2000, commissionRate: "40%", commission: 800 },
  {
    name: "Anti Thyroid Ab",
    price: 2000,
    commissionRate: "40%",
    commission: 800,
  },
  {
    name: "Blood C/S (FAN Method)",
    price: 2000,
    commissionRate: "40%",
    commission: 800,
  },
  {
    name: "Procalcitonin",
    price: 2000,
    commissionRate: "40%",
    commission: 800,
  },
  {
    name: "Free Testosterone",
    price: 1800,
    commissionRate: "40%",
    commission: 720,
  },
  {
    name: "Renal Function test/ Kidney function test/ Renal profile/ RFT",
    price: 1800,
    commissionRate: "40%",
    commission: 720,
  },
  {
    name: "Free Testosterone (Pooled Serum)",
    price: 1600,
    commissionRate: "40%",
    commission: 640,
  },
  { name: "D-Dimer", price: 1500, commissionRate: "40%", commission: 600 },
  {
    name: "Hb Electrophoresis",
    price: 1500,
    commissionRate: "40%",
    commission: 600,
  },
  {
    name: "ICT for salmonella",
    price: 1500,
    commissionRate: "40%",
    commission: 600,
  },
  { name: "Free PSA", price: 1400, commissionRate: "40%", commission: 560 },
  {
    name: "Alpha Feto Protein (AFP)",
    price: 1350,
    commissionRate: "40%",
    commission: 540,
  },
  { name: "ACTH", price: 1300, commissionRate: "40%", commission: 520 },
  { name: "Amylase", price: 1300, commissionRate: "40%", commission: 520 },
  { name: "CA 125", price: 1250, commissionRate: "40%", commission: 500 },
  { name: "CA 15.3", price: 1250, commissionRate: "40%", commission: 500 },
  { name: "CA 19.9", price: 1250, commissionRate: "40%", commission: 500 },
  { name: "CEA", price: 1250, commissionRate: "40%", commission: 500 },
  {
    name: "Ammonia (NH3)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Anti HAV IgM/Ab",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Anti HBc (Total)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "Anti HBc IgM", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Anti Hbe / HbeAb",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Anti HBs / HBsAb",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "Anti HCV", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Anti HCV (ICT)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Anti HEV IgM/ab",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Anti Nuclear Ab (ANA)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "B HCG", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Cardiac Prodile (Trop I, CPK, CK-MB)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Complement 3 (C3)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Cortisol (Evening)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Cortisol (Morning)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "CPK", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "eGFR/GFR", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Estrodial /Estrogen",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "FDP", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Ferirtine", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Ferritin", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "FSH", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Growth Hormone",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "HbA1c", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Iron", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "LDH", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "LH", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Lipid Profile",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "Lithium", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Micro Albumin Creatinine Ratio (ACR)",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  { name: "Progrsterone", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Prolactin", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "PSA", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Testosterone", price: 1200, commissionRate: "40%", commission: 480 },
  { name: "Troponine-I", price: 1200, commissionRate: "40%", commission: 480 },
  {
    name: "Urine Creatinine Ratio",
    price: 1200,
    commissionRate: "40%",
    commission: 480,
  },
  {
    name: "Acid Phosphatase",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "APTT", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Chikungunya IgM",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "CKMB", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Coombs Test Indirect",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Coombs Test (Direct)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "C-Peptide", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "CRP", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "CSF Routine Examination",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Dengue NS1 Antigen",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Dengue Ab", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Dengue IgG/IgM",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Electrolytes", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "FT3", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "FT4", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "GTT (2 Sample)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "GTT (3 Sample)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Hb (HemoCue)", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Hb (Lab Test)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Hb (Portable)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Helicobacter Pylori (IgG/IgA)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "IgE", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Insulin", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "LE Cell", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "LFT/ Liver Function test",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Malaria Ag", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Malaria Ab", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "MycoSerology (IgG/IgM)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Peripheral Smear",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "PTH", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Reticulocyte Count",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "RFT (Portable)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Serum Calcium",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Serum Folate", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Serum Uric Acid",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  {
    name: "Stool Routine Examination",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "T3", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "T4", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Total IgM", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Troponine-T", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "TROPONIN T(ICT)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Trop-I", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "TSH", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Typhidot IgG/IgM",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "Urine C/S", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Urine R/E", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "Urine RE (Portable)",
    price: 1000,
    commissionRate: "40%",
    commission: 400,
  },
  { name: "VDRL", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "Widal", price: 1000, commissionRate: "40%", commission: 400 },
  { name: "X-Ray", price: 1000, commissionRate: "40%", commission: 400 },
  {
    name: "APTT (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  {
    name: "Blood Grouping & Rh",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  { name: "ESR", price: 800, commissionRate: "40%", commission: 320 },
  { name: "Glucose (R)", price: 800, commissionRate: "40%", commission: 320 },
  {
    name: "Glucose (R) (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  { name: "Glucose (F)", price: 800, commissionRate: "40%", commission: 320 },
  {
    name: "Glucose (F) (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  { name: "Glucose (PP)", price: 800, commissionRate: "40%", commission: 320 },
  {
    name: "Glucose (PP) (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  {
    name: "Hba1c (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  { name: "Urea", price: 800, commissionRate: "40%", commission: 320 },
  {
    name: "Urea (Portable)",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  { name: "Urine Glucose", price: 800, commissionRate: "40%", commission: 320 },
  { name: "Urine Ketones", price: 800, commissionRate: "40%", commission: 320 },
  { name: "Urine Protein", price: 800, commissionRate: "40%", commission: 320 },
  {
    name: "Urine Pregnancy Test",
    price: 800,
    commissionRate: "40%",
    commission: 320,
  },
  {
    name: "Complete Blood Count (CBC)",
    price: 600,
    commissionRate: "40%",
    commission: 240,
  },
  { name: "ALT (SGPT)", price: 600, commissionRate: "40%", commission: 240 },
  { name: "AST (SGOT)", price: 600, commissionRate: "40%", commission: 240 },
  {
    name: "Total Cholesterol",
    price: 600,
    commissionRate: "40%",
    commission: 240,
  },
  { name: "Triglycerides", price: 600, commissionRate: "40%", commission: 240 },
  {
    name: "HDL Cholesterol",
    price: 600,
    commissionRate: "40%",
    commission: 240,
  },
  {
    name: "LDL Cholesterol",
    price: 600,
    commissionRate: "40%",
    commission: 240,
  },
  {
    name: "VLDL Cholesterol",
    price: 600,
    commissionRate: "40%",
    commission: 240,
  },
  { name: "Uric Acid", price: 600, commissionRate: "40%", commission: 240 },
  { name: "Calcium", price: 500, commissionRate: "40%", commission: 200 },
  { name: "RBS", price: 500, commissionRate: "40%", commission: 200 },
  { name: "PT/INR", price: 500, commissionRate: "40%", commission: 200 },
];

// export const seed = async () => {
//   console.log("Seeding...");
//   labTests.forEach(async (labTest) => {
//     const testExists = await prisma.labTest.findUnique({
//       where: {
//         name: labTest.name,
//       },
//     });
//     if (testExists) {
//       console.log("Test already exists");
//       return;
//     } else {
//       console.log("Creating test");
//       const newLabTest = await prisma.labTest.create({
//         data: {
//           name: labTest.name,
//           commissionRate: labTest.commissionRate,
//           commission: labTest.commission.toString(),
//           price: labTest.price.toString(),
//         },
//       });
//       console.log(newLabTest);
//     }
//   });
// };
