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

// export const seed = async () => {
//   console.log("Seeding pharmacies...");
//   for (const pharmacy of pharmacies) {
//     try {
//       await prisma.agent.create({
//         data: {
//           name: pharmacy.pharmacyName,
//           number: pharmacy.ownerPhoneNumber,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

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
  { test: "Vitamin D (25-OH)", amarlabMRP: 4000, comRate: "55%", inkam: 2200 },
  {
    test: "Anti Mullerian Hormone (AMH)",
    amarlabMRP: 4000,
    comRate: "50%",
    inkam: 2000,
  },
  {
    test: "HCV Ag (Quantitative)",
    amarlabMRP: 4000,
    comRate: "50%",
    inkam: 2000,
  },
  { test: "Iron Profile", amarlabMRP: 3400, comRate: "40%", inkam: 1360 },
  {
    test: "NT-ProBNP/proBNP/BNP",
    amarlabMRP: 3000,
    comRate: "40%",
    inkam: 1200,
  },
  { test: "Vitamin B12", amarlabMRP: 2500, comRate: "40%", inkam: 1000 },
  { test: "Anti ds DNA", amarlabMRP: 2100, comRate: "40%", inkam: 840 },
  { test: "Aldolase", amarlabMRP: 2000, comRate: "40%", inkam: 800 },
  { test: "Anti Thyroid Ab", amarlabMRP: 2000, comRate: "40%", inkam: 800 },
  {
    test: "Blood C/S (FAN Method)",
    amarlabMRP: 2000,
    comRate: "40%",
    inkam: 800,
  },
  { test: "Procalcitonin", amarlabMRP: 2000, comRate: "40%", inkam: 800 },
  { test: "Free Testosterone", amarlabMRP: 1800, comRate: "40%", inkam: 720 },
  {
    test: "Renal Function test/ Kidney function test/ Renal profile/ RFT",
    amarlabMRP: 1800,
    comRate: "40%",
    inkam: 720,
  },
  {
    test: "Free Testosterone (Pooled Serum)",
    amarlabMRP: 1600,
    comRate: "40%",
    inkam: 640,
  },
  { test: "D-Dimer", amarlabMRP: 1500, comRate: "40%", inkam: 600 },
  { test: "Hb Electrophoresis", amarlabMRP: 1500, comRate: "40%", inkam: 600 },
  { test: "ICT for salmonella", amarlabMRP: 1500, comRate: "40%", inkam: 600 },
  { test: "Free PSA", amarlabMRP: 1400, comRate: "40%", inkam: 560 },
  {
    test: "Alpha Feto Protein (AFP)",
    amarlabMRP: 1350,
    comRate: "40%",
    inkam: 540,
  },
  { test: "ACTH", amarlabMRP: 1300, comRate: "40%", inkam: 520 },
  { test: "Amylase", amarlabMRP: 1300, comRate: "40%", inkam: 520 },
  { test: "CA 125", amarlabMRP: 1250, comRate: "40%", inkam: 500 },
  { test: "CA 15.3", amarlabMRP: 1250, comRate: "40%", inkam: 500 },
  { test: "CA 19.9", amarlabMRP: 1250, comRate: "40%", inkam: 500 },
  { test: "CEA", amarlabMRP: 1250, comRate: "40%", inkam: 500 },
  { test: "Ammonia (NH3)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HAV IgM/Ab", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HBc (Total)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HBc IgM", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti Hbe / HbeAb", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HBs / HBsAb", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HCV", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HCV (ICT)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Anti HEV IgM/ab", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  {
    test: "Anti Nuclear Ab (ANA)",
    amarlabMRP: 1200,
    comRate: "40%",
    inkam: 480,
  },
  { test: "B HCG", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  {
    test: "Cardiac Profile (Trop I, CPK, CK-MB)",
    amarlabMRP: 1200,
    comRate: "40%",
    inkam: 480,
  },
  { test: "Complement 3 (C3)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Cortisol (Evening)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Cortisol (Morning)", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "CPK", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "eGFR/GFR", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Estrodial /Estrogen", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "FDP", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Ferirtine", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Ferritin", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "FSH", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Growth Hormone", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "HbA1c", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Iron", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "LDH", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "LH", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Lipid Profile", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Lithium", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  {
    test: "Micro Albumin Creatinine Ratio (ACR)",
    amarlabMRP: 1200,
    comRate: "40%",
    inkam: 480,
  },
  { test: "Progrsterone", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Prolactin", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "PSA", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Testosterone", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  { test: "Troponine-I", amarlabMRP: 1200, comRate: "40%", inkam: 480 },
  {
    test: "Urine Creatinine Ratio",
    amarlabMRP: 1200,
    comRate: "40%",
    inkam: 480,
  },
  { test: "Acid Phosphatase", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "APTT", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Chikungunya IgM", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "CKMB", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "Coombs Test Indirect",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  {
    test: "Creatinine Clearance Rate (CCR)",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "Electrolytes", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Febrile Antigens", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "Febrile Antigens / Triple Antigens",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "Fibrinogen", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Free T3 / FT3", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Free T4 / FT4", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "H Pylori Antibody (IgG)",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "HBeAg", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "HIV 1&2 / Anti HIV 1&2",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  {
    test: "ICT for Chikungunya (IgG & IgM)",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "ICT For Filaria", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "ICT For Kalazar", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "ICT for Malaria (p.f/p.v)",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  {
    test: "ICT For Tuberculosis",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  {
    test: "LFT/Liver Function Test",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "Lipase", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Magnesium", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Pancreatic Amylase", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "Pregnancy Test (HCG Level)",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "Sputum for C/S", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  {
    test: "Sputum for Malignant Cells",
    amarlabMRP: 1000,
    comRate: "40%",
    inkam: 400,
  },
  { test: "Stool for C/S", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Syphilis/ TPHA", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "T3", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "T4", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "TIBC", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Total IgE", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Triple Antigen", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "TSH", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Urinary Amylase", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "VDRL (Qty)", amarlabMRP: 1000, comRate: "40%", inkam: 400 },
  { test: "Urine PCR", amarlabMRP: 900, comRate: "40%", inkam: 360 },
  { test: "HBsAg (Device)", amarlabMRP: 850, comRate: "40%", inkam: 340 },
  { test: "Coombs Test (D/I)", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "Coombs Test Direct", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "Gamma GT", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "Rh Antibody", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "STP AG Ratio", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  {
    test: "Total Acid Phosphatase",
    amarlabMRP: 800,
    comRate: "40%",
    inkam: 320,
  },
  { test: "TPHA (Qty)", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "Urine for C/S", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "VI Antigen - S Typhi", amarlabMRP: 800, comRate: "40%", inkam: 320 },
  { test: "ASO Titre", amarlabMRP: 700, comRate: "40%", inkam: 280 },
  { test: "Globulin", amarlabMRP: 700, comRate: "40%", inkam: 280 },
  {
    test: "C Reactive Protein / CRP",
    amarlabMRP: 600,
    comRate: "40%",
    inkam: 240,
  },
  {
    test: "CRP / C Reactive Protein",
    amarlabMRP: 600,
    comRate: "40%",
    inkam: 240,
  },
  {
    test: "Inorganic Phosphate (po4)",
    amarlabMRP: 600,
    comRate: "40%",
    inkam: 240,
  },
  {
    test: "Prothrombin Time INR (PT)",
    amarlabMRP: 600,
    comRate: "40%",
    inkam: 240,
  },
  { test: "Toatal Protine", amarlabMRP: 600, comRate: "40%", inkam: 240 },
  {
    test: "Urinary Inorganic Phosphate",
    amarlabMRP: 600,
    comRate: "40%",
    inkam: 240,
  },
  { test: "VDRL (ICT)", amarlabMRP: 600, comRate: "40%", inkam: 240 },
  { test: "Widal Test", amarlabMRP: 600, comRate: "40%", inkam: 240 },
  { test: "Bilirubin  Indirect", amarlabMRP: 550, comRate: "40%", inkam: 220 },
  { test: "Bilirubin Direct", amarlabMRP: 550, comRate: "40%", inkam: 220 },
  {
    test: "Glucose Tolerance Test (GTT) / OGTT (FBS+2 hour After glucose)",
    amarlabMRP: 550,
    comRate: "40%",
    inkam: 220,
  },
  { test: "Albumin", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "Bilirubin (D/I)", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "BUN", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "Calcium", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "RA Test (Titer)", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "SGOT (AST)", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "SGPT (ALT)", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  {
    test: "Sputum for  Gram Stain",
    amarlabMRP: 500,
    comRate: "40%",
    inkam: 200,
  },
  { test: "Sputum for AFB", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  {
    test: "Sputum For Eosinophils",
    amarlabMRP: 500,
    comRate: "40%",
    inkam: 200,
  },
  { test: "Total Protein", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "Urea", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "Uric Acid", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  {
    test: "Urinary Creatinine 24 hours",
    amarlabMRP: 500,
    comRate: "40%",
    inkam: 200,
  },
  {
    test: "Urinary Total Protein (24 hours)",
    amarlabMRP: 500,
    comRate: "40%",
    inkam: 200,
  },
  {
    test: "Urine Albumin 24 hours",
    amarlabMRP: 500,
    comRate: "40%",
    inkam: 200,
  },
  { test: "VDRL (Device)", amarlabMRP: 500, comRate: "40%", inkam: 200 },
  { test: "Creatinine", amarlabMRP: 475, comRate: "40%", inkam: 190 },
  { test: "Cholestrol", amarlabMRP: 450, comRate: "40%", inkam: 180 },
  {
    test: "Alkaline Phosphatase (ALP)",
    amarlabMRP: 400,
    comRate: "40%",
    inkam: 160,
  },
  { test: "Bilirubin (Total)", amarlabMRP: 400, comRate: "40%", inkam: 160 },
  { test: "CBC", amarlabMRP: 400, comRate: "40%", inkam: 160 },
  {
    test: "Circulating Eosinophil Count",
    amarlabMRP: 400,
    comRate: "40%",
    inkam: 160,
  },
  {
    test: "TC, DC, Hb, ESR Combined",
    amarlabMRP: 400,
    comRate: "40%",
    inkam: 160,
  },
  { test: "Urinary Calcium", amarlabMRP: 400, comRate: "40%", inkam: 160 },
  { test: "Urinary Creatinine", amarlabMRP: 400, comRate: "40%", inkam: 160 },
  {
    test: "Urine for  Gram Stain",
    amarlabMRP: 400,
    comRate: "40%",
    inkam: 160,
  },
  { test: "Urine for AFB", amarlabMRP: 400, comRate: "40%", inkam: 160 },
  { test: "LDL / Cholesterol", amarlabMRP: 350, comRate: "40%", inkam: 140 },
  { test: "Triglycerides (TG)", amarlabMRP: 350, comRate: "40%", inkam: 140 },
  {
    test: "Blood Group & RH Factor",
    amarlabMRP: 320,
    comRate: "40%",
    inkam: 128,
  },
  {
    test: "Blood Film / Cell Morphology",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "Cholesterol (Total)", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  {
    test: "Dengue antibodies (IgM, IgG) ICT",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "Dengue NS1 Ag", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  { test: "HDL / Cholesterol", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  {
    test: "PBF / Blood Film / Cell Morphology",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "PH", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  { test: "Platelets Count", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  { test: "Reticulocyte Count", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  {
    test: "Stool for Occult Blood Test",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  {
    test: "Stool Routine Examination",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "Urine for Albumin", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  {
    test: "Urine for Occult Blood Test",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  {
    test: "Urine for Specific Gravity",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "Urine PT", amarlabMRP: 300, comRate: "40%", inkam: 120 },
  {
    test: "Urine Routine Examination / Urine RME / Urine RE",
    amarlabMRP: 300,
    comRate: "40%",
    inkam: 120,
  },
  { test: "Bilirubin", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "Haemoglobin (Hb)", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "HCT", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "Potassium", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "Sodium", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  {
    test: "Stool for Reducing Substance",
    amarlabMRP: 250,
    comRate: "40%",
    inkam: 100,
  },
  { test: "Urine for Sugar", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "Urine Pregnancy Test", amarlabMRP: 250, comRate: "40%", inkam: 100 },
  { test: "Bleeding Time (BT)", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "Clotting Time (CT)", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "DC - WBC", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "ESR", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  {
    test: "Glucose 1/1.5/2 hr after meal/postprandial",
    amarlabMRP: 200,
    comRate: "40%",
    inkam: 80,
  },
  { test: "Glucose 1/2 hrs ABF", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "Malarial Parasite", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "MCH", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "MCHC", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "MCV", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  {
    test: "Random Blood Sugar (RBS)",
    amarlabMRP: 200,
    comRate: "40%",
    inkam: 80,
  },
  {
    test: "Sugar 2 hr after meal/postprandial",
    amarlabMRP: 200,
    comRate: "40%",
    inkam: 80,
  },
  { test: "Sugar Fasting (FBS)", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "TC - RBC", amarlabMRP: 200, comRate: "40%", inkam: 80 },
  { test: "TC - WBC", amarlabMRP: 200, comRate: "40%", inkam: 80 },
];

export const seed = async () => {
  await prisma.transaction.deleteMany();
  await prisma.labTest.deleteMany();
  console.log("Seeding...");
  labTests.forEach(async (labTest) => {
    const testExists = await prisma.labTest.findUnique({
      where: {
        name: labTest.test,
      },
    });
    if (testExists) {
      console.log("Test already exists");
      return;
    } else {
      console.log("Creating test");
      const newLabTest = await prisma.labTest.create({
        data: {
          name: labTest.test,
          commissionRate: labTest.comRate,
          commission: labTest.inkam.toString(),
          price: labTest.amarlabMRP.toString(),
        },
      });
      console.log(newLabTest);
    }
  });
};
