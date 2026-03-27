import { trainingModules } from "@/lib/training-data";
import ModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return trainingModules.map((m) => ({ moduleId: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ModuleClient moduleId={moduleId} />;
}
