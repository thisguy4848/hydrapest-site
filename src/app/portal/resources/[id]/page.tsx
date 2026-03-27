import { getAllResourceIds } from "@/lib/portal-data";
import ResourceClient from "./ResourceClient";

export function generateStaticParams() {
  return getAllResourceIds().map((id) => ({ id }));
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResourceClient id={id} />;
}
