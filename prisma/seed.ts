import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "Alice@example.com",
    nationalID: "81115419201224",
    phone: "2115162781",
    passwordHash: "password123",
    role: "nurse",
    gender: "MALE",
  },
  {
    name: "John",
    email: "John@example.com",
    nationalID: "81115419501224",
    phone: "2115165781",
    passwordHash: "password123",
    role: "headdept",
    gender: "MALE",
  },
  {
    name: "Jack",
    email: "Jack@example.com",
    nationalID: "89115419501224",
    phone: "2915165781",
    passwordHash: "password123",
    role: "patient",
    gender: "MALE",
  },
];

const depData: Prisma.DepartmentCreateInput[] = [
  { name: "Brain" },
  { name: "Bone" },
];

const programData: Prisma.ProgramCreateInput[] = [
  {
    name: "Diabetes",
    potentialProblems: {
      ASTHMA: true,
      Cancer: true,
      Tumor: true,
    },
    preventionAndTherapies: {
      "Diet Control": true,
      "Regular Exercise": true,
    },
    diagnosticTestsAndMonitoring: {
      SPIROMETRY: "normal",
      X_Ray: "normal",
    },
    duration: new Date("2024-12-05").toISOString(),
    medications: {
      Insulin: "10 units before meals",
      Metformin: "1000mg daily",
      Glipizide: "5mg daily",
    },
  },
  {
    name: "Hypertension",
    potentialProblems: {
      Stroke: true,
      Heart_Attack: true,
      Kidney_Disease: true,
    },
    preventionAndTherapies: {
      "Low Sodium Diet": true,
      "Regular Exercise": true,
    },
    diagnosticTestsAndMonitoring: {
      Blood_Pressure: "normal",
      EKG: "normal",
    },
    duration: new Date("2024-06-15").toISOString(),
    medications: {
      Lisinopril: "10mg daily",
      Amlodipine: "5mg daily",
      Hydrochlorothiazide: "25mg daily",
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Create a new User
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  // Create a new Department
  for (const u of depData) {
    const dep = await prisma.department.create({
      data: u,
    });
    console.log(`Created department with id: ${dep.id}`);
  }

  // Create a new Program
  for (const u of programData) {
    const program = await prisma.program.create({
      data: u,
    });
    console.log(`Created department with id: ${program.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
