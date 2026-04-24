import { getDb } from "../../../../api/queries/connection";
import { projects } from "@db/schema";
import ProjectsAdminClient from "./ProjectsAdminClient";

export default async function AdminProjectsPage() {
  const allProjects = await getDb().select().from(projects).orderBy(projects.sortOrder);
  return <ProjectsAdminClient projects={allProjects} />;
}
