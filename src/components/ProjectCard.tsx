import Image from "next/image";
import Link from "next/link";

// Hoverable card used in both project and clone lists
interface ProjectCardProps {
  href: string;
  image_url: string;
  title: string;
  description: string;
}
export default function ProjectCard({
  href,
  image_url,
  title,
  description,
}: ProjectCardProps) {
  const plainDescription =
    (description ?? "").replace(/<[^>]+>/g, "").trim();
  const preview =
    plainDescription.length > 140
      ? `${plainDescription.slice(0, 140)}…`
      : plainDescription;

  return (
    <div className="group flex h-[280px] w-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-900/50 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-sky-300/20 md:w-[320px]">
      <div className="relative h-[80%] w-full overflow-hidden">
        <Image
          src={image_url}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="h-full rounded-t-xl transition-all group-hover:scale-110"
        />
      </div>
      <div className="flex w-full flex-col justify-start space-y-2 p-2">
        <p className="text-lg">{title}</p>
        <p className="text-sm text-neutral-200">{preview}</p>
      </div>
    </div>
  );
}
