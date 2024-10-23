"use server";

import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const pharmacies = [
  {
    id: "15f10f99-904f-4c07-a458-5a1d149dc72f",

    pharmacyName: "Hasan Pharma",
    pharmacyAddress: "Mirpur 12, Pallabi, Balurmath, Mirpur, Dhaka",
    ownerPhoneNumber: "+8801787755650",
  },
  {
    id: "f387148e-b39d-4cca-b0ae-a268aa3488af",

    pharmacyName: "Shathi Medical hall",
    pharmacyAddress: "Pallabi, Block c, House 10, Road -02, Mirpur-12, Dhaka",
    ownerPhoneNumber: "+8801716985470",
  },
  {
    id: "f387148e-b39d-4cca-b0ae-a268aa3488af",

    pharmacyName: "Sarker pharmacy",
    pharmacyAddress: "House 24, Road -13, block-C, Pallabi, Mirpur, Dhaka",
    ownerPhoneNumber: "+8801732898184",
  },
  {
    id: "328fac9d-f28b-41ab-a4de-3abcef0a566a",

    pharmacyName: "Towhid drug house",
    pharmacyAddress: "Road 25, Balur math Pollobi, Mirpur 12, Dhaka",
    ownerPhoneNumber: "+8801704541373",
  },
  {
    id: "06f29531-4df4-41bb-900c-67a2c09b193c",

    pharmacyName: "Rubel Drug house",
    pharmacyAddress: "Pallobi, Jhilpar Mosjid Mirpur 12, Dhaka",
    ownerPhoneNumber: "+8801988846511",
  },
  {
    id: "af280086-e2f0-44d5-9ddf-d492b2a0732c",

    pharmacyName: "Joy pharmacy",
    pharmacyAddress: "West kazipara, 686, Monipur Mirpur 10-(1216)",
    ownerPhoneNumber: "+8801713703800",
  },
  {
    id: "40a7ce26-432a-4eec-849a-f19366dff088",

    pharmacyName: "A B pharma",
    pharmacyAddress: "787 West Kazipara, Mirpur 10, Mosque goli",
    ownerPhoneNumber: "+8801732299189",
  },
  {
    id: "15f10f99-904f-4c07-a458-5a1d149dc72f",

    pharmacyName: "J R Pharma",
    pharmacyAddress: "791/1, West Kazipara, Mirpur 10, Mosque goli",
    ownerPhoneNumber: "+8801819311198",
  },
  {
    id: "564e2198-a671-4b06-a479-652f860a405b",

    pharmacyName: "Novera pharmacy",
    pharmacyAddress: "675, West Kazipara, Mirpur 10, Mosque goli",
    ownerPhoneNumber: "+8801757048186",
  },
  {
    id: "7dcb33b3-5f2b-4d53-b53e-5918bd305cd6",

    pharmacyName: "Popular drug house",
    pharmacyAddress: "91/1 Senpara, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801731511389",
  },
  {
    id: "a8e52bd1-bbcb-4a8c-8364-554193e8a5a4",

    pharmacyName: "Akbor pharmacy",
    pharmacyAddress:
      "91/1 Senpara Parbata, close to Sundarban Courier Service, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801642445545",
  },
  {
    id: "1545dfd0-498c-4c81-8daa-195cb0c73dae",

    pharmacyName: "Mouri medical",
    pharmacyAddress:
      "92/2, Senpara Parbata, close to Sundarban Courier Service, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801714221131",
  },
  {
    id: "13cf5599-a4e6-45df-98f5-e1839eb8e403",

    pharmacyName: "Hoq pharmacy",
    pharmacyAddress:
      "23, Borobagh, Mirpur 2, beside Children's Hospital, Dhaka 1216",
    ownerPhoneNumber: "+8801711210151",
  },
  {
    id: "3f58a7dc-e08e-41de-b808-edd1a25843d7",

    pharmacyName: "Des medicine",
    pharmacyAddress:
      "25, Borobagh, Mirpur 2, beside Children's Hospital, Dhaka 1216",
    ownerPhoneNumber: "+8801816814352",
  },
  {
    id: "7b5acc0e-0b6a-4970-88f4-d34efe446164",

    pharmacyName: "Maisa phar",
    pharmacyAddress:
      "23, Borobagh, Mirpur 2, beside Children's Hospital, Dhaka 1216",
    ownerPhoneNumber: "+8801726296713",
  },
  {
    id: "7c9ef7d8-b4b9-411e-b3ed-a11d092a1d19",
    pharmacyName: "Bhai bhai pharmacy",
    pharmacyAddress: "781/3, Seurapara, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801832946415",
  },
  {
    id: "5f0197d6-a358-4bdc-bff7-8d719949f2a3",

    pharmacyName: "Unic Pharma",
    pharmacyAddress:
      "Osmani Tower, West Kazipara Bus-stand, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801716251042",
  },
  {
    id: "98fccce7-4517-4e62-b6f0-d935977e9e5c",

    pharmacyName: "Cure & health centre",
    pharmacyAddress: "143, Senpara Parbata, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801711473632",
  },
  {
    id: "81d2bf6b-c43e-46f2-ba88-3fbf59e3896b",

    pharmacyName: "Iqbal pharmacy",
    pharmacyAddress:
      "766, West Shewrapara, Begum Rokeya Sharoni Road, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801913464522",
  },
  {
    id: "acb5996f-fe3f-4c23-b4d0-a35e146d922e",

    pharmacyName: "Child health pharmacy",
    pharmacyAddress: "House-24, Road 3/1, Borogh, Mirpur 2, Dhaka 1216",
    ownerPhoneNumber: "+8801798392667",
  },
  {
    id: "900df8b0-bc74-440c-8160-0e3f1f0c7b40",

    pharmacyName: "Well care Pharma",
    pharmacyAddress: "741, West Shewrapara, Wasa Road, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801625586993",
  },
  {
    id: "d63c9430-84cb-4496-bfbe-aa51be6055cb",

    pharmacyName: "Obonti medicine",
    pharmacyAddress:
      "Bari-no10, Section6/ক, Baundari Road, Mirpur 2, Borobag, Dhaka 1216",
    ownerPhoneNumber: "+8801648459494",
  },
  {
    id: "a59d33b8-f990-42d9-93b4-d3558dc7dc55",

    pharmacyName: "Mouri Pharma 2",
    pharmacyAddress: "6/ খ, 2/32, Senpara Parbata, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+880180771919",
  },
  {
    id: "b59a15be-8bd6-4bf4-b80a-bd937b842d95",

    pharmacyName: "Farida pharmacy",
    pharmacyAddress: "676, West Kazipara Kendro Mosjid, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801712024976",
  },
  {
    id: "d3a1cebf-f334-44df-93ac-3a4a5437baee",
    pharmacyName: "Bluetooth Pharma",
    pharmacyAddress: "GP-GA 94/3, Mohakhali, School Road, Banani, Dhaka",
    ownerPhoneNumber: "+8801911008060",
  },
  {
    id: "e3c0a28f-5307-47a8-9658-0e7e58a8d31c",
    pharmacyName: "Best Care Phrama",
    pharmacyAddress: "Ga 34, Mohakhali School Road, Banani, Dhaka",
    ownerPhoneNumber: "+8801779227349",
  },
  {
    id: "25f1623e-eabe-4451-92f7-203cb7631228",

    pharmacyName: "Ahmmed Pharma",
    pharmacyAddress:
      "Shop No 04, Mohakhali Puraton Bazar, in front of Hotel Rojonigondha, Banani, Dhaka",
    ownerPhoneNumber: "+8801770677631",
  },
  {
    id: "70870a47-1644-429a-adb5-32d907958516",

    pharmacyName: "New Popular Pharmacy",
    pharmacyAddress: "Ga-118/1, School Road, Mohakhali, Banani, Dhaka",
    ownerPhoneNumber: "+8801777462844",
  },
  {
    id: "d5c5e477-0125-4b1d-831f-c43705763db6",

    pharmacyName: "Infinity care Pharma",
    pharmacyAddress:
      "School Road, Mohakhali, next to Model High School, Banani, Dhaka",
    ownerPhoneNumber: "+8801876761232",
  },
  {
    id: "9339df58-2d09-4b51-a585-7f211b8971f2",

    pharmacyName: "Medicine Point 01",
    pharmacyAddress: "F-196, Mohakhali, TB Gate, near Mosque, Banani, Dhaka",
    ownerPhoneNumber: "+8801916701623",
  },
  {
    id: "d681663f-b04d-4ec2-8073-80b24ee86cdb",

    pharmacyName: "Eastern Medicine",
    pharmacyAddress:
      "G-8, Uttara Tower, Josimuddin Avenue-1, Sector #3, Uttara Model Town, Dhaka",
    ownerPhoneNumber: "+8801819294054",
  },
  {
    id: "3f246192-87a0-46a9-849f-6b86907890c9",

    pharmacyName: "Nissam priyo angon pharma",
    pharmacyAddress: "Railaximi Complex Ground, Sector #3, Uttara, Dhaka",
    ownerPhoneNumber: "+8801962496765",
  },
  {
    id: "adc813a1-ce3e-4f83-901a-05ac66835104",

    pharmacyName: "A To Z Pharma",
    pharmacyAddress:
      "36/1, Mohakhali Banijjik Area, TB Gate, Panirtenki, Banani, Dhaka",
    ownerPhoneNumber: "+8801730270825",
  },
  {
    id: "aa8e7257-a74b-4ba1-a9c7-33610c11447b",
    pharmacyName: "বি- বাড়িয়া মেডিসিন",
    pharmacyAddress: "GFE-16, Rajlokki Complex, Sector #3, Uttara, Dhaka",
    ownerPhoneNumber: "+8801623505857",
  },
  {
    id: "4cf368c6-1011-4fa8-8515-506d88a9262c",

    pharmacyName: "Al Baraqah Pharmacy",
    pharmacyAddress:
      "Cha-180/2, TB Gate, behind Masjid, Mohakhali, Banani, Dhaka",
    ownerPhoneNumber: "+8801974561577",
  },
  {
    id: "7286fbbf-2354-4298-8892-caceaddb36a1",
    pharmacyName: "Jaber Pharmacy",
    pharmacyAddress:
      "Ga-35, School Road, Pathan Villa, Mohakhali, Banani, Dhaka",
    ownerPhoneNumber: "+8801719715683",
  },
  {
    id: "d3ffbb90-ed24-4e55-bc09-3895adcd3ab7",
    pharmacyName: "Jillu pharmacy",
    pharmacyAddress: "697, West Kazipara, Mirpur 10, Dhaka 1216",
    ownerPhoneNumber: "+8801712720165",
  },
  {
    id: "33d5558d-6db1-4936-a6d6-9bb2cc996bbe",

    pharmacyName: "Ash Shifa Pharmacy",
    pharmacyAddress:
      "7 No Shompa Super Market, Adarsha Chayaneer, Ring Road, Adabor, Dhaka 1207",
    ownerPhoneNumber: "+8801876903388",
  },
  {
    id: "bd8f9b78-6bd2-419e-808c-0541fb74fb8b",

    pharmacyName: "A M Pharma",
    pharmacyAddress: "House #21, Road #11, Sheikh er Tek, Adabor, Dhaka 1207",
    ownerPhoneNumber: "+8801711901414",
  },
  {
    id: "726adb58-1e4a-4191-b8b8-d92e335ec52d",

    pharmacyName: "Labmad pharmacy",
    pharmacyAddress: "23/1, Jikatala, Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "+8801553484846",
  },
  {
    id: "91ee7b53-3b73-45f1-896b-9d88de9131f5",

    pharmacyName: "Laz pharmacy",
    pharmacyAddress: "Moulobi Shalak Road, Jikatala, Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "+8801714203089",
  },
  {
    id: "9a748155-ff99-4773-afdc-8a500acd71c9",

    pharmacyName: "Kazi Medical hall",
    pharmacyAddress:
      "44/p kazi bhabon,jikatala,notun rasta,Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01913077796",
  },
  {
    id: "f75b74f7-baf6-4642-a138-23279898870c",
    pharmacyName: "Nupur pharmacy",
    pharmacyAddress: "44/q/8 ,jikatala,notun rasta,Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01674178147",
  },
  {
    id: "b1e47ec8-3e98-4362-b4d8-e8687a3e9606",
    pharmacyName: "Suchona pharmacy",
    pharmacyAddress:
      "44/p moulobi sjalek road,jikatala,notun rasta,Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01913270529",
  },
  {
    id: "bab1bfcc-3da6-428b-abbc-b9b8d5601ced",

    pharmacyName: "Raz Pharma",
    pharmacyAddress:
      "26/f/1moulobi sjalek road,jikatala,notun rasta,Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01731655406",
  },
  {
    id: "182f0c08-4cbb-4636-b242-8cd88b84fc73",

    pharmacyName: "Al safa pharmacy",
    pharmacyAddress: "25/3 ,jikatala,Hazaribagh ,Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01402699898",
  },
  {
    id: "36fac1f7-2a9a-468c-bdf2-ae4206024113",

    pharmacyName: "Prokash phat",
    pharmacyAddress: "41,zigatola, rajpat, Dhaka 1209",
    ownerPhoneNumber: "01725593868",
  },
  {
    id: "06ae147a-4057-4fdc-b681-2640ffcea734",

    pharmacyName: "Best care pharmacy",
    pharmacyAddress: "41/3A,jigatola, Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01911338367",
  },
  {
    id: "2c6c1d9d-3f5f-4cf9-a977-b4e162c05774",

    pharmacyName: "Shohag pharmacy",
    pharmacyAddress: "36,jigatola, Dhanmondi, Dhaka 1209",
    ownerPhoneNumber: "01684252227",
  },
  {
    id: "935b734e-83cc-4d11-9b5e-8afc47dfcb74",

    pharmacyName: "Supabi pharmacy",
    pharmacyAddress: "46/8 jigatola, Dhaka 1209",
    ownerPhoneNumber: "01711176727",
  },
  {
    id: "ae959f12-4ef2-4c2b-9d0a-f2ff78316c49",

    pharmacyName: "Z pharmacy",
    pharmacyAddress: "67/2 jigatola,near post office  Dhaka 1209",
    ownerPhoneNumber: "01979752762",
  },
  {
    id: "98e2518c-e00e-4423-9d3c-a69cffa571fa",

    pharmacyName: "Kaya pharmacy",
    pharmacyAddress: "25/5, jigatola,Dhaka 1209",
    ownerPhoneNumber: "01718341195",
  },
  {
    id: "1bbaad7d-6e9b-4416-94d9-32369c539444",

    pharmacyName: "Humland labretori Bangladesh",
    pharmacyAddress: "42 moulobi shalek garden,new road,jigatola,Dhaka 1209",
    ownerPhoneNumber: "01787687561",
  },
  {
    id: "57b43797-d5bf-4512-b4a2-a12cd9d1ea7d",

    pharmacyName: "Shaikat pharma",
    pharmacyAddress: "42,jigatola,moulobi shalek road, Hazaribagh Dhaka 1209",
    ownerPhoneNumber: "01924521792",
  },
  {
    id: "b4c62bff-344f-4bde-aeab-31098f2e5c21",

    pharmacyName: "Khan pharmacy",
    pharmacyAddress: "H-no-6,main road,Mohammadpur, Dhaka 1207",
    ownerPhoneNumber: "01775897373",
  },
  {
    id: "8bfde912-7b02-4f9b-8351-ada7f8706cba",

    pharmacyName: "Masas rouson medical Hall",
    pharmacyAddress:
      "H-no-9,main road, Mohammad dia housing,Mohammadpur, Dhaka 1207",
    ownerPhoneNumber: "01920029475",
  },
  {
    id: "9039935a-df04-4de4-9b8d-88c8739f373b",

    pharmacyName: "New al sefa pharmacy ltd",
    pharmacyAddress:
      "8/1,main road, Mohammad dia housing,Mohammadpur, Dhaka 1207",
    ownerPhoneNumber: "01886454401",
  },
  {
    id: "9a9575bf-a680-450e-aa49-82affe302e2f",

    pharmacyName: "Roja medicine carner",
    pharmacyAddress:
      "20/12, block c, tajmahol road, housing,Mohammadpur, Dhaka 1207",
    ownerPhoneNumber: "01716604726",
  },
  {
    id: "7988e229-4a4a-4c43-ad14-cfe732c5837d",

    pharmacyName: "Raisa pharmacy",
    pharmacyAddress: "6H/1,block c, aziz maholla,Mohammadpur, Dhaka 1207",
    ownerPhoneNumber: "01887525421",
  },
  {
    id: "9e159bd5-81a8-40ef-9364-5bd2d00c76b6",

    pharmacyName: "Mirpur Pharma",
    pharmacyAddress:
      "Amena hakim super tower, 20/15, tajmohol road,block c, Krishi Market new kacha bazer,Muhammad pur, Dhaka 1207",
    ownerPhoneNumber: "01302322583",
  },
  {
    id: "43a2a03b-32ea-47df-9d87-b1b79d73c688",

    pharmacyName: "Moon pharmacy",
    pharmacyAddress:
      "Amena hakim super tower, 20/15, sanali bank, Krishi Market new kacha bazer,Muhammad pur, Dhaka 1207",
    ownerPhoneNumber: "01917597208",
  },
  {
    id: "d963b1a0-a78c-4435-96a5-740fdbc283da",

    pharmacyName: "Leed Pharma",
    pharmacyAddress: "25/8,tajmohol road,,Muhammad pur, Dhaka 1207",
    ownerPhoneNumber: "01712019791",
  },
  {
    id: "03984a89-9788-4e18-8595-5629a6bbe954",

    pharmacyName: "Abdullah medicine",
    pharmacyAddress:
      "7/A,main road tajmohol road,Muhammaddia housing,Muhammad  pur, Dhaka 1207",
    ownerPhoneNumber: "01716023895",
  },
  {
    id: "4fbd01a3-50c0-432d-b41d-c1c6b5c74baf",

    pharmacyName: "Eimel Pharma",
    pharmacyAddress: "Back Side Of BNS Center",
    ownerPhoneNumber: "01712585594",
  },
  {
    id: "78475fcc-ba81-475d-af24-541590385f24",

    pharmacyName: "DHAKA Medicine Corner",
    pharmacyAddress: "Infront Of Rajuk Commercial Complex",
    ownerPhoneNumber: "01726953443",
  },
  {
    id: "321c2074-9408-4401-a0da-b4fb01934734",

    pharmacyName: "RX Medicine",
    pharmacyAddress: "Back side Of BNS Center",
    ownerPhoneNumber: "01970073800",
  },
  {
    id: "8816cd48-fc54-453e-aef1-e3b10b8272cf",

    pharmacyName: "Moyna Pharma",
    pharmacyAddress: "Under Of BNS Center",
    ownerPhoneNumber: "01715992708",
  },
  {
    id: "63858568-603e-4d3b-8c99-62c123080855",

    pharmacyName: "Apollo Pharmacy",
    pharmacyAddress: "Under Of BNS Center",
    ownerPhoneNumber: "01511995511",
  },
  {
    id: "db3adfee-12d2-4ad7-ab5f-e3ee2b7157e3",

    pharmacyName: "Suchana Pharmacy",
    pharmacyAddress:
      "74/3, Musa Mension, Mohakhali C/A, Wireless Get, banani,Dhaka",
    ownerPhoneNumber: "01712276853",
  },
  {
    id: "81a39453-2a95-4fb3-ab2a-a648347e9740",

    pharmacyName: "Tajrin Medical hall",
    pharmacyAddress: "Cha 32,Uttar Badda, Gulshan, Dhaka",
    ownerPhoneNumber: "01719721720",
  },
  {
    id: "c2e7be05-458b-411a-aa0e-27f22118a061",

    pharmacyName: "Everyday Pharmacy",
    pharmacyAddress:
      "Cha 100/B, Hazi Sonamiya Matobbor Road,  Uttar Badda, Dhaka",
    ownerPhoneNumber: "01770484840",
  },
  {
    id: "97283052-c25c-420e-abf4-2d2dd512496d",

    pharmacyName: "Aram Pharmacy",
    pharmacyAddress: "Cha 96/4, Girls School Road, North Badda, Gulshan, Badda",
    ownerPhoneNumber: "01813124265",
  },
  {
    id: "a42ec71a-e024-4101-b500-86c04552a500",

    pharmacyName: "Muskan Medicine Corner",
    pharmacyAddress:
      "Cha 120/1, Girl's School Road,  Uttar badda, Gulshan, Dhaka",
    ownerPhoneNumber: "01708307230",
  },
  {
    id: "6fa5c405-1b0f-4947-88aa-72238503b555",

    pharmacyName: "M/S Ideal pharmacy",
    pharmacyAddress:
      "Cha 93/A, Hazi momtaz Uddin Market,  Gupipara, Uttar badda, Gulshan,  Dhaka",
    ownerPhoneNumber: "01812146750",
  },
  {
    id: "4e9e516d-3c6e-40f5-874a-cd1e41affd90",

    pharmacyName: "Well Care Pharma",
    pharmacyAddress:
      "Ka 32/5-A, Polash Tower, Opposition Subastu Nazar valli Shopping Market,  Shajadpur, Gulshan, Dhaka",
    ownerPhoneNumber: "01728210030",
  },
  {
    id: "7a5111c7-e0c0-4bca-bcb0-193a1ae21604",

    pharmacyName: "Bismillah Pharma",
    pharmacyAddress: "Ka 72/3,  Shajadpur,  Gulshan,  Dhaka",
    ownerPhoneNumber: "01407364763",
  },
  {
    id: "415fdd62-cb5d-42a2-84cf-2d76c13bb638",

    pharmacyName: "Nasrin Medical Hall",
    pharmacyAddress: "Ka 72, Shajadpur, Gulshan,  Dhaka 1212",
    ownerPhoneNumber: "01684110537",
  },
  {
    id: "76483b07-9535-40e4-ba2e-a3e01107f248",

    pharmacyName: "RTS Pharma",
    pharmacyAddress: "Baitur Nur Jame Mosjid,  Shajadpur,  Gulshan Dhaka",
    ownerPhoneNumber: "01320580615",
  },
  {
    id: "eae90351-39fa-42ce-b645-ab17d24e0455",

    pharmacyName: "Anoara Medicine Corner",
    pharmacyAddress: "Go 27/2, Shajadpur, Gulshan,  Dhaka",
    ownerPhoneNumber: "01911759093",
  },
  {
    id: "985d273a-1c9a-4ec9-8706-0977decd073b",

    pharmacyName: "M.M Pharmacy",
    pharmacyAddress: "Sho 23, Adarshanagar Road,  Middle Badda, Dhaka.",
    ownerPhoneNumber: "01734515478",
  },
  {
    id: "0c6843ce-e477-451d-b46f-b78da00281dd",

    pharmacyName: "M/S Nahar Pharmacy",
    pharmacyAddress:
      "357, Adarshanagar road, Abul hotel Songlogno,  Middle  Badda, Dhaka",
    ownerPhoneNumber: "01716587359",
  },
  {
    id: "b97f3af3-500f-4db6-935a-45986ccc6bd6",

    pharmacyName: "Mokka Pharmacy",
    pharmacyAddress: "660 Modho badda Bazar Goli, modhobadda,Dhaka 1212",
    ownerPhoneNumber: "01722128780",
  },
  {
    id: "01c75471-8dcc-4fc8-824e-7184110c162c",

    pharmacyName: "Aponaloy pharmacy",
    pharmacyAddress:
      "House #18, Road #04, Adarshanagar,  Middle Badda, Dhaka-1212",
    ownerPhoneNumber: "01821102931",
  },
  {
    id: "01c75471-8dcc-4fc8-824e-7184110c162c",

    pharmacyName: "Modina Pharmacy",
    pharmacyAddress: "Lo 82, Modho badda, Bazar Road, Baddaa,Dhaka",
    ownerPhoneNumber: "01798009556",
  },
  {
    id: "e2bbc0c5-d9c2-4b44-95eb-d39016a382b4",

    pharmacyName: "Bhola pharmacy",
    pharmacyAddress: "Mohammadpur novi nogor,road no-4",
    ownerPhoneNumber: "01796192911",
  },
  {
    id: "399b8428-48eb-480b-8fef-7f460770d501",

    pharmacyName: "Prime pharmacy",
    pharmacyAddress: "Dhaka uddan road no-3,dhaka",
    ownerPhoneNumber: "01940417332",
  },
  {
    id: "4372dd7e-31eb-4668-9d6d-cbd32765ce57",

    pharmacyName: "Bangladesh model pharmacy",
    pharmacyAddress: "Dhaka uddan, road no-5 B blok Mohammadpur dhaka",
    ownerPhoneNumber: "01715132130",
  },
  {
    id: "3e69cbfa-f984-421b-ba49-817985f6592a",

    pharmacyName: "Mayaer doea pharmacy",
    pharmacyAddress: "Nobi nogor housing road no-3 Mohammadpur dhaka",
    ownerPhoneNumber: "01938971031",
  },
  {
    id: "02e4bbb2-7c82-4ccb-bf19-79e901b88faa",

    pharmacyName: "M/S Sadik Pharma",
    pharmacyAddress: "House 16, Road 01, Nikunjo, Dhaka",
    ownerPhoneNumber: "01889652683",
  },
  {
    id: "b9a4429d-a287-4a04-bec0-b6035aee4c0f",

    pharmacyName: "S R Medicine Corner",
    pharmacyAddress: "House 1, Road  1, Nikunjo, Dhaka",
    ownerPhoneNumber: "01816524473",
  },
  {
    id: "81adafb3-191b-4bd3-a2a6-db45705627de",

    pharmacyName: "Anas pharma",
    pharmacyAddress: "House #15 Road #5 nikunja-2,khilket Dhaka",
    ownerPhoneNumber: "01911929299",
  },
  {
    id: "08744563-be27-404f-9188-75a0d95a685d",

    pharmacyName: "G-pharma",
    pharmacyAddress: "House-178/3,road-01,nikunja-02,khilket, Dhaka.",
    ownerPhoneNumber: "01871346711",
  },
  {
    id: "47707c37-030a-44cd-afe4-eac3238f6bac",

    pharmacyName: "Ma medicine corner",
    pharmacyAddress: "road-01,nikunja-02,khilket, Dhaka.",
    ownerPhoneNumber: "01712646788",
  },
  {
    id: "f3473a91-7f11-4e37-a845-ee9b00069f0d",

    pharmacyName: "Mehedi pharmacy",
    pharmacyAddress: "Kha-71/3,Road-1,tanpara nikunja-02",
    ownerPhoneNumber: "01724458622",
  },
  {
    id: "b9166aeb-084d-4d85-b39d-7a2ac635f431",

    pharmacyName: "Bismillah pharmacy",
    pharmacyAddress: "Road#1,jamtala road,nikunja-02, dhaka",
    ownerPhoneNumber: "01712934222",
  },
  {
    id: "c2d8e292-9fb4-4719-a612-564a3df4557b",

    pharmacyName: "Shorif pharmacy",
    pharmacyAddress: "Jamtola,road-01,nikunja-02,khilket Dhaka",
    ownerPhoneNumber: "01715580854",
  },
  {
    id: "56281379-9539-491e-8ecf-42d44569a5c7",

    pharmacyName: "Nikunja pharmacy",
    pharmacyAddress: "Road #1,polt #32,nikinja-02,khilket Dhaka",
    ownerPhoneNumber: "01303351646",
  },
  {
    id: "19a5e5d8-f62a-4958-8f8c-f5cb17381465",

    pharmacyName: "Shima pharmacy",
    pharmacyAddress: "Road#6,Nikunja-2,khilket, Dhaka.",
    ownerPhoneNumber: "01985778960",
  },
  {
    id: "be07aa8e-7147-432d-baa3-56de495bcfc7",

    pharmacyName: "Cure zone pharmacy",
    pharmacyAddress: "Road#12,nikunja-02, khilket,Dhaka.",
    ownerPhoneNumber: "01974064706",
  },
  {
    id: "7e4877b0-129a-434a-a820-d885182dceb0",

    pharmacyName: "Feni medicine point",
    pharmacyAddress: "Road#13,nikunja-02, Khilket, Dhaka.",
    ownerPhoneNumber: "01614639695",
  },
  {
    id: "35639a8c-2f3d-4aea-86e1-583a3bd259a3",
    pharmacyName: "Royal Pharmacy",
    pharmacyAddress: "Adarshanagar,  Middle Badda, Badda, Dhaka-1212",
    ownerPhoneNumber: "01753740438",
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
  await prisma.agent.deleteMany();
  console.log("Seeding...");
  pharmacies.forEach(async (pharmacy) => {
    // if (!pharmacy.) {
    //   console.log(pharmacy.name);
    // }
    const newPharmacy = await prisma.agent.create({
      data: {
        agentId: pharmacy.id,
        name: pharmacy.pharmacyName,
        number: pharmacy.ownerPhoneNumber,
        address: pharmacy.pharmacyAddress,
      },
    });
    console.log(newPharmacy);
  });
};
