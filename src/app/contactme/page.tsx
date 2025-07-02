import ChatInterface from "@/components/ChatInterface";
import ContactCard from "@/components/contactCard";

export default function ContactMe() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <div className="space-y-4">
        <h1>Contact Me - Let&apos;s talk about your next project</h1>
        <ContactCard />
      </div>
    </div>
  );
}
