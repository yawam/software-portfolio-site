"use client";
import { Plus, X, LogOut } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Textarea from "./Textarea";
export default function AddRecommendationButton() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    recommender_name: "",
    recommender_title: "",
    recommendation: "",
    image_url: "",
  });

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/#recommendations" });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Recommendation added successfully!");
      router.refresh();
      setOpen(false);
      setFormData({
        recommender_name: "",
        recommender_title: "",
        recommendation: "",
        image_url: "",
      });
    } else {
      toast.error("Failed to add recommendation. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {status === "authenticated" && (
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-slate-100"
          >
            <span className="block md:hidden">
              <LogOut />
            </span>
            <span className="hidden text-lg font-medium md:block">Logout</span>
          </button>
        )}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-slate-100"
        >
          <span className="block md:hidden">
            <Plus />
          </span>
          <span className="hidden text-lg font-medium md:block">
            Add Recommendation
          </span>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="duration transition-opacity-300 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-slide-in relative flex h-auto min-h-[45%] w-[90%] max-w-md translate-y-0 transform flex-col items-center justify-center rounded-xl border border-sky-300 bg-zinc-900 p-6 shadow-lg transition-all duration-300 md:w-[50%] md:translate-y-0">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              <X size={35} />
            </button>
            {status === "authenticated" ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <h2 className="text-center text-3xl">Leave a Recommendation</h2>
                <Input
                  id="recommender_name"
                  type="text"
                  label="Your name"
                  value={formData.recommender_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({
                      ...formData,
                      recommender_name: e.target.value,
                    })
                  }
                />
                <Input
                  id="recommender_title"
                  type="text"
                  label="Your Job title or professional relation to P.Y"
                  value={formData.recommender_title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({
                      ...formData,
                      recommender_title: e.target.value,
                    })
                  }
                />
                <Textarea
                  id="recommendation"
                  label="Your recommendation"
                  value={formData.recommendation}
                  onChange={(e) =>
                    setFormData({ ...formData, recommendation: e.target.value })
                  }
                />
                <ImageUpload
                  onUpload={(url) =>
                    setFormData({ ...formData, image_url: url })
                  }
                />
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
                >
                  Submit
                </button>
              </form>
            ) : (
              <>
                <h2 className="mb-4 mt-4 text-center text-3xl">
                  Sign in to give Master Papa Yaw a recommendation
                </h2>
                <button
                  onClick={handleSignIn}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-gray-200"
                >
                  <FcGoogle size={35} />
                  <p>Continue with Google</p>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
//  to do next, add admin recommendations panel, add email to user when recommendation is added so they will know their recommendation is pending and also an email to the admin saying an email is pending approval
