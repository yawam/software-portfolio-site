import Image from "next/image";
import Link from "next/link";

interface ExperienceCardProps {
  href: string;
  image_url: string;
  title: string;
  start_date: string;
  end_date: string;
  bgColor: string | null;
}
export default function ExperienceCard({
  href,
  image_url,
  title,
  start_date,
  end_date,
  bgColor,
}: ExperienceCardProps) {
  return (
    <div className="group flex h-[280px] w-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-900/50 shadow-2xl transition-all hover:-translate-y-2">
      <Link href={href} className="relative h-[80%] w-full overflow-hidden">
        <Image
          src={image_url}
          alt="Work Experience Page"
          fill
          style={{ objectFit: "contain" }}
          className={`h-full rounded-t-xl bg-white transition-all group-hover:scale-110`}
        />
      </Link>

      <div className="h-[20%] w-full p-2">
        <p>{title}</p>
        <p>
          {start_date} - {end_date}
        </p>
      </div>
    </div>
  );
}
