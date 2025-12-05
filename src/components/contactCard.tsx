import Image from "next/image";

// Quick reference card with my preferred contact details
export default function ContactCard() {
  return (
    <div className="space-y-4 rounded-xl border-2 border-sky-300 p-2 shadow-xl shadow-sky-300/20">
      <div className="flex items-center justify-between">
        <div className="relative h-[75px] w-[75px]">
          <Image
            src="https://utfs.io/f/b35332ed-4c66-4ced-9121-6a4d65fa729a-o9sf04...jpg"
            alt="recommender image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full shadow-2xl shadow-sky-300/20"
          />
        </div>
        <div>Papa Yaw&apos;s Contact Card</div>
      </div>
      <div>
        <div>
          Email:&nbsp;
          <a
            href="mailto:yawam0902@gmail.com"
            className="border-b-2 border-sky-300"
          >
            yawam0902@gmail.com
          </a>
          <br />
          Phone:&nbsp;
          <a href="tel:+12089483868" className="border-b-2 border-sky-300">
            208-948-3868
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}
