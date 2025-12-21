import prisma from "@/lib/prisma";
import "dotenv/config";

async function main() {
  // await prisma.investmentCategory.createMany({
  //   data: [
  //     {
  //       name: "STARTER",
  //       minAmount: 100000,
  //       maxAmount: 499000,
  //       monthlyRoiRate: 0.04,
  //       durationMonths: 18,
  //       description: "₦100k – ₦499k",
  //       isActive: true,
  //     },
  //     {
  //       name: "GROWTH",
  //       minAmount: 500000,
  //       maxAmount: 1000000,
  //       monthlyRoiRate: 0.05,
  //       durationMonths: 18,
  //       description: "₦500k – ₦1M",
  //       isActive: true,
  //     },
  //     {
  //       name: "PREMIUM",
  //       minAmount: 1000000,
  //       maxAmount: 5000000,
  //       monthlyRoiRate: 0.06,
  //       durationMonths: 18,
  //       description: "₦1M – ₦5M",
  //       isActive: true,
  //     },
  //     {
  //       name: "ELITE",
  //       minAmount: 5000000,
  //       maxAmount: 10000000,
  //       monthlyRoiRate: 0.07,
  //       durationMonths: 18,
  //       description: "₦5M – ₦10M",
  //       isActive: true,
  //     },
  //     {
  //       name: "EXECUTIVE",
  //       minAmount: 10000000,
  //       maxAmount: 50000000,
  //       monthlyRoiRate: 0.08,
  //       durationMonths: 18,
  //       description: "₦10M+",
  //       isActive: true,
  //     },
  //   ],
  //   skipDuplicates: true,
  // });


  // await prisma.admin.create({
  //   data:{
  //     fullName: "Ultimate Faloe",
  //     email: "ultimatefaloe@gmail.com",
  //     passwordHash: "y812^@YF^V&GYGgyy662t737fgy^TT@^fdf666"
  //   }
  // })

  await prisma.platformBankAccount.create({
    data: {
      bankName: "Zenith Bank",
      accountNumber: "1012345678",
      accountHolderName: "WATER GROOVE INVESTMENT TECHNOLOGIES LTD",
      isActive: true,
      isDefault: true,
      // createdByAdminId: 'ce8144c0-19ec-497d-8445-13098e62bbc6'
    }
  })
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
