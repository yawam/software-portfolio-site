import prisma from "./prisma";

export async function testDatabaseConnection() {
  try {
    // Execute a lightweight query to test connectivity
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection test failed:", error);
    throw error;
  }
}

// Cleanup connections on process termination
process.on("SIGINT", async () => {
  console.log("SIGINT received: Disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received: Disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany();
    // console.log("Projects in getProjects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectbyId(id: number) {
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getClones() {
  try {
    const clones = await prisma.clone.findMany();
    return clones;
  } catch (error) {
    console.error("Error fetching clones:", error);
    return [];
  }
}

export async function getClonebyId(id: number) {
  try {
    const clone = await prisma.clone.findUnique({ where: { id } });
    return clone;
  } catch (error) {
    console.error("Error fetching clone:", error);
    return null;
  }
}

export async function getRecommendations() {
  try {
    const recommendations = await prisma.recommendation.findMany();
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function getAdminData() {
  try {
    const adminData = await prisma.admin.findMany();
    return adminData;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return [];
  }
}
