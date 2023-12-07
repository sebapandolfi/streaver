import { postsData } from './data/posts.mjs';
import { usersData } from './data/users.mjs';
import { PrismaClient, Address, Company, GeoLocation, User} from '@prisma/client';

// Extracting and adding id to address, geolocation, and company data from user data
const geoLocationData: GeoLocation[] = usersData.map((user, index) => {
  const { ...geo } = user.address.geo;
  return { id: index + 1, ...geo };
});

const addressData: Address[] = usersData.map((user, index) => {
  const { geo, ...address } = user.address;
  return { id: index + 1, geoLocationId: index + 1, ...address };
});

const companyData: Company[] = usersData.map((user, index) => {
  const { ...company } = user.company;
  return { id: index + 1, ...company };
});

const usersTrimData: User[] = usersData.map((user, index) => {
  const { company, address, ...userData } = user;
  return { ...userData, companyId: index + 1, addressId: index + 1 };
});

// Create Prisma client instance
const prisma = new PrismaClient();

// Seed function to populate the database
async function seed() {
  // Seed GeoLocations, Companies, Addresses, and Users
  for (let i = 0; i < usersData.length; ++i) {
    await prisma.geoLocation.upsert({
      create: {
        ...geoLocationData[i],
      },
      update: {},
      where: {
        id: geoLocationData[i].id,
      },
    });

    await prisma.company.upsert({
      create: {
        ...companyData[i],
      },
      update: {},
      where: {
        id: companyData[i].id,
      },
    });

    await prisma.address.upsert({
      create: {
        ...addressData[i],
      },
      update: {},
      where: {
        id: addressData[i].id,
      },
    });

    await prisma.user.upsert({
      create: {
        ...usersTrimData[i],
      },
      update: {},
      where: {
        id: usersTrimData[i].id,
      },
    });
  }

  // Seed Posts
  for (let i = 0; i < postsData.length; ++i) {
    await prisma.post.upsert({
      create: {
        ...postsData[i],
      },
      update: {},
      where: {
        id: postsData[i].id,
      },
    });
  }

  // Search for results
  const resultPosts = await prisma.post.findMany({});
  const resultGeo = await prisma.geoLocation.findMany({});
  const resultCompanies = await prisma.company.findMany({});
  const resultAdresses = await prisma.address.findMany({});
  const resultUsers = await prisma.user.findMany({});

  // Print results
  console.log(resultPosts);
  console.log(resultGeo);
  console.log(resultCompanies);
  console.log(resultAdresses);
  console.log(resultUsers);
  console.log('Database seeded successfully.');

  // Close Prisma client
  await prisma.$disconnect();
}

// Run the seed function
seed().catch((e) => {
  throw e;
});
