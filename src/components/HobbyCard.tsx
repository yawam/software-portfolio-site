import Image from "next/image";

interface HobbyCardProps {
  title: string;
  image_url: string;
}

export default function HobbyCard({ title, image_url }: HobbyCardProps) {
  return (
    <div>
      <div className="group relative flex h-[300px] w-[300px] items-center justify-center rounded-xl bg-neutral-700/20 shadow-2xl md:w-[400px]">
        <Image
          src={image_url}
          alt="Hobby Description"
          fill
          style={{ objectFit: "cover" }}
          className="z-0 rounded-xl shadow-2xl shadow-sky-300/20 transition-all group-hover:scale-95"
        />
        <div className="z-10 hidden h-[100%] w-[100%] items-center justify-center rounded-xl bg-black/50 text-center text-2xl text-white transition-opacity duration-500 ease-in-out group-hover:flex group-hover:opacity-100">
          <p className="duration-1750 opacity-0 transition-opacity ease-in-out group-hover:opacity-100">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
