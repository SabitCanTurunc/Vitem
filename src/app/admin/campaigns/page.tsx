export const dynamic = "force-dynamic";
import { getDb } from "../../../../api/queries/connection";
import { campaigns } from "@db/schema";
import CampaignsClient from "./CampaignsClient";

export default async function AdminCampaignsPage() {
  const allCampaigns = await getDb().select().from(campaigns).orderBy(campaigns.sortOrder);
  return <CampaignsClient campaigns={allCampaigns} />;
}
