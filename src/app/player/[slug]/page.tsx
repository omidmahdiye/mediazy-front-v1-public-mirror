import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/data";
import PlayerView from "./player-view";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <PlayerView slug={slug} />;
}
