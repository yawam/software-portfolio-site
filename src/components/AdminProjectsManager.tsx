"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import ProjectRichTextEditor from "./ProjectRichTextEditor";
import RichTextPreview from "./RichTextPreview";

type ItemType = "project" | "clone";

interface ProjectRecord {
  id: number;
  project_title: string | null;
  project_url: string | null;
  image_url: string | null;
  project_Description: string | null;
  video_url: string | null;
  under_construction: boolean;
}

interface CloneRecord {
  id: number;
  clone_title: string | null;
  clone_url: string | null;
  image_url: string | null;
  clone_Description: string | null;
  video_url: string | null;
  under_construction: boolean;
}

interface ProjectFormData {
  title: string;
  url: string;
  image_url: string;
  description: string;
  video_url: string;
  under_construction: boolean;
}

const defaultFormData: ProjectFormData = {
  title: "",
  url: "",
  image_url: "",
  description: "",
  video_url: "",
  under_construction: false,
};

interface AdminProjectsManagerProps {
  projects: ProjectRecord[];
  clones: CloneRecord[];
}

const recordToFormData = (
  type: ItemType,
  record: ProjectRecord | CloneRecord,
): ProjectFormData => ({
  title:
    type === "project"
      ? ((record as ProjectRecord).project_title ?? "")
      : ((record as CloneRecord).clone_title ?? ""),
  url:
    type === "project"
      ? ((record as ProjectRecord).project_url ?? "")
      : ((record as CloneRecord).clone_url ?? ""),
  image_url: record.image_url ?? "",
  description:
    type === "project"
      ? ((record as ProjectRecord).project_Description ?? "")
      : ((record as CloneRecord).clone_Description ?? ""),
  video_url: record.video_url ?? "",
  under_construction: record.under_construction,
});

const formDataToPayload = (type: ItemType, formData: ProjectFormData) =>
  type === "project"
    ? {
        project_title: formData.title,
        project_url: formData.url,
        image_url: formData.image_url,
        project_Description: formData.description,
        video_url: formData.video_url,
        under_construction: formData.under_construction,
      }
    : {
        clone_title: formData.title,
        clone_url: formData.url,
        image_url: formData.image_url,
        clone_Description: formData.description,
        video_url: formData.video_url,
        under_construction: formData.under_construction,
      };

const getTypeLabel = (type: ItemType) =>
  type === "project" ? "Project" : "Clone";

export default function AdminProjectsManager({
  projects: initialProjects,
  clones: initialClones,
}: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [clones, setClones] = useState<CloneRecord[]>(initialClones);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [formType, setFormType] = useState<ItemType>("project");
  const [activeRecord, setActiveRecord] = useState<
    ProjectRecord | CloneRecord | null
  >(null);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: ItemType;
    record: ProjectRecord | CloneRecord;
  } | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (formMode === "edit" && activeRecord) {
      setFormData(recordToFormData(formType, activeRecord));
    }
    if (formMode === "add") {
      setFormData(defaultFormData);
      setActiveRecord(null);
    }
  }, [formMode, activeRecord, formType]);

  const handleImageUpload = useCallback((url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  }, []);

  const openEditModal = useCallback(
    (type: ItemType, record: ProjectRecord | CloneRecord) => {
      setFormType(type);
      setActiveRecord(record);
      setFormMode("edit");
    },
    [],
  );

  const openAddModal = useCallback(() => {
    setActiveRecord(null);
    setFormType("project");
    setFormMode("add");
  }, []);

  const openDeleteBanner = useCallback(
    (type: ItemType, record: ProjectRecord | CloneRecord) => {
      setDeleteTarget({ type, record });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setFormMode(null);
    setActiveRecord(null);
    setFormData(defaultFormData);
    setFormType("project");
  }, []);

  const closeDeleteBanner = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formMode) return;

    const endpointBase =
      formType === "project" ? "/api/projects" : "/api/clones";
    const payload = formDataToPayload(formType, formData);
    const url =
      formMode === "edit" && activeRecord
        ? `${endpointBase}/${activeRecord.id}`
        : endpointBase;

    startTransition(async () => {
      try {
        const response = await fetch(url, {
          method: formMode === "edit" ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to save record.");
        }

        const result = await response.json();

        if (formType === "project") {
          setProjects((prev) =>
            formMode === "add"
              ? [result as ProjectRecord, ...prev]
              : prev.map((project) =>
                  project.id === (result as ProjectRecord).id
                    ? (result as ProjectRecord)
                    : project,
                ),
          );
        } else {
          setClones((prev) =>
            formMode === "add"
              ? [result as CloneRecord, ...prev]
              : prev.map((clone) =>
                  clone.id === (result as CloneRecord).id
                    ? (result as CloneRecord)
                    : clone,
                ),
          );
        }

        router.refresh();
        toast.success(
          formMode === "add"
            ? `${getTypeLabel(formType)} added successfully.`
            : `${getTypeLabel(formType)} updated successfully.`,
        );
        closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Unable to save. Please try again.");
      }
    });
  }, [formMode, formType, formData, activeRecord, closeModal, router]);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;

    const endpoint =
      deleteTarget.type === "project" ? "/api/projects" : "/api/clones";

    startTransition(async () => {
      try {
        const response = await fetch(`${endpoint}/${deleteTarget.record.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete record.");
        }

        if (deleteTarget.type === "project") {
          setProjects((prev) =>
            prev.filter((project) => project.id !== deleteTarget.record.id),
          );
        } else {
          setClones((prev) =>
            prev.filter((clone) => clone.id !== deleteTarget.record.id),
          );
        }

        router.refresh();
        toast.success(`${getTypeLabel(deleteTarget.type)} deleted.`);
        closeDeleteBanner();
      } catch (error) {
        console.error(error);
        toast.error("Unable to delete. Please try again.");
      }
    });
  }, [deleteTarget, closeDeleteBanner, router]);

  const handleToggleStatus = useCallback(
    (type: ItemType, record: ProjectRecord | CloneRecord) => {
      const endpoint = type === "project" ? "/api/projects" : "/api/clones";
      const updatedForm = {
        ...recordToFormData(type, record),
        under_construction: !record.under_construction,
      };
      const payload = formDataToPayload(type, updatedForm);

      startTransition(async () => {
        try {
          const response = await fetch(`${endpoint}/${record.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Failed to update status.");
          }

          const updated = await response.json();
          if (type === "project") {
            setProjects((prev) =>
              prev.map((proj) =>
                proj.id === updated.id ? (updated as ProjectRecord) : proj,
              ),
            );
          } else {
            setClones((prev) =>
              prev.map((clone) =>
                clone.id === updated.id ? (updated as CloneRecord) : clone,
              ),
            );
          }
          router.refresh();
        } catch (error) {
          console.error(error);
          toast.error("Unable to update status.");
        }
      });
    },
    [router],
  );

  const modalTitle = useMemo(() => {
    if (formMode === "edit") {
      return `Edit ${getTypeLabel(formType)}`;
    }
    if (formMode === "add") {
      return "Add Portfolio Item";
    }
    return "";
  }, [formMode, formType]);

  const renderCard = useCallback(
    (type: ItemType, record: ProjectRecord | CloneRecord) => {
      const title =
        type === "project"
          ? (record as ProjectRecord).project_title
          : (record as CloneRecord).clone_title;
      const description =
        type === "project"
          ? (record as ProjectRecord).project_Description
          : (record as CloneRecord).clone_Description;
      const detailHref =
        type === "project" ? `/projects/${record.id}` : `/clones/${record.id}`;

      return (
        <div
          key={`${type}-${record.id}`}
          className="relative flex h-[340px] w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-neutral-900/50 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-sky-300/20 md:w-[320px]"
        >
          <Link href={detailHref} className="flex h-full flex-col">
            <div className="relative h-[60%] w-full overflow-hidden">
              {record.image_url ? (
                <Image
                  src={record.image_url}
                  alt={title ?? "Card cover"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="h-full rounded-t-xl"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-neutral-700 text-sm text-neutral-300">
                  No image
                </div>
              )}
            </div>
            <div className="flex w-full flex-1 flex-col space-y-2 p-3">
              <p className="text-lg">{title}</p>
              <div className="max-h-24 overflow-y-auto rounded-lg bg-neutral-900/40 p-2 text-sm">
                <RichTextPreview content={description ?? ""} />
              </div>
            </div>
          </Link>
          <div className="mt-auto flex items-center justify-between gap-2 px-3 pb-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-200">
              <input
                type="checkbox"
                checked={!record.under_construction}
                onChange={(e) => {
                  e.stopPropagation();
                  handleToggleStatus(type, record);
                }}
                className="h-4 w-8 cursor-pointer appearance-none rounded-full bg-neutral-700 transition checked:bg-emerald-500"
              />
              <span className="rounded-full bg-neutral-800 px-2 py-1 text-[11px]">
                {record.under_construction ? "Under construction" : "Live"}
              </span>
            </label>
            <div className="flex items-center gap-1">
              <button
                title="Edit card"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(type, record);
                }}
                className="rounded p-2 text-green-500 transition-all hover:bg-green-500/20 hover:shadow-md"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                title="Delete card"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteBanner(type, record);
                }}
                className="rounded p-2 text-red-500 transition-all hover:bg-red-500/20 hover:shadow-md"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      );
    },
    [handleToggleStatus, openDeleteBanner, openEditModal],
  );

  return (
    <section>
      <div className="my-2 flex w-full items-center justify-between border-b-2 border-b-sky-300 pb-2">
        <h2 className="text-xl font-semibold drop-shadow-2xl md:text-3xl md:font-normal">
          Projects
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-sm text-black shadow-md transition hover:bg-slate-100 md:p-4 md:text-base"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden md:inline">Add Item</span>
        </button>
      </div>
      <p className="p-2 text-neutral-300">Built from scratch</p>
      <div className="my-4 flex items-center justify-start space-x-4 overflow-x-auto pb-4">
        {projects.map((project) => renderCard("project", project))}
        {!projects.length && (
          <div className="flex h-[320px] w-[320px] flex-shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 text-center text-sm text-neutral-400">
            No projects found. Click &ldquo;Add Item&rdquo; to create one.
          </div>
        )}
      </div>
      <p className="p-2 text-neutral-300">Clones (Proof-of-concept)</p>
      <div className="my-4 flex items-center justify-start space-x-4 overflow-x-auto pb-4">
        {clones.map((clone) => renderCard("clone", clone))}
        {!clones.length && (
          <div className="flex h-[320px] w-[320px] flex-shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 text-center text-sm text-neutral-400">
            No clones found. Click &ldquo;Add Item&rdquo; to create one.
          </div>
        )}
      </div>

      {formMode && (
        <div className="transition-opacity-300 fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="animate-slide-in relative flex h-auto max-h-[90vh] w-[95%] max-w-2xl translate-y-0 flex-col overflow-y-auto rounded-xl border border-sky-300 bg-zinc-900 p-6 shadow-lg transition-all duration-300">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-gray-400 transition hover:bg-white/20 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="mb-4 text-center text-3xl">{modalTitle}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="item_type" className="text-sm text-neutral-300">
                  Item type
                </label>
                <select
                  id="item_type"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as ItemType)}
                  disabled={formMode === "edit"}
                  className="rounded-lg bg-neutral-800/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed"
                >
                  <option value="project">Project</option>
                  <option value="clone">Clone</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="item_title"
                  className="text-sm text-neutral-300"
                >
                  {getTypeLabel(formType)} title
                </label>
                <input
                  id="item_title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="rounded-lg bg-neutral-800/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="item_url" className="text-sm text-neutral-300">
                  {getTypeLabel(formType)} URL
                </label>
                <input
                  id="item_url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }))
                  }
                  className="rounded-lg bg-neutral-800/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="video_url" className="text-sm text-neutral-300">
                  Video URL
                </label>
                <input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      video_url: e.target.value,
                    }))
                  }
                  className="rounded-lg bg-neutral-800/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-neutral-300">Cover image</span>
                <ImageUpload
                  onUpload={handleImageUpload}
                  onUploadStart={() =>
                    toast.loading("Uploading image...", {
                      id: "project-image-upload",
                    })
                  }
                  onUploadComplete={(status) => {
                    if (status === "success") {
                      toast.success("Image uploaded", {
                        id: "project-image-upload",
                      });
                    } else {
                      toast.error("Image upload failed", {
                        id: "project-image-upload",
                      });
                    }
                  }}
                  initialImage={
                    formMode === "edit"
                      ? (activeRecord?.image_url ?? null)
                      : undefined
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-neutral-300">Description</span>
                <ProjectRichTextEditor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={formData.under_construction}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      under_construction: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-sky-500 bg-neutral-800 text-sky-500 focus:ring-sky-500"
                />
                Under construction
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? formMode === "edit"
                    ? "Saving..."
                    : "Creating..."
                  : formMode === "edit"
                    ? "Save changes"
                    : "Create item"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed bottom-6 left-1/2 z-40 w-[95%] max-w-xl -translate-x-1/2 rounded-xl border border-red-400 bg-red-950/80 p-4 text-white shadow-xl backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                Delete &ldquo;
                {deleteTarget.type === "project"
                  ? (deleteTarget.record.project_title ?? "Untitled project")
                  : (deleteTarget.record.clone_title ?? "Untitled clone")}
                &rdquo;?
              </h3>
              <p className="text-sm text-red-200">
                This action cannot be undone. The{" "}
                {getTypeLabel(deleteTarget.type).toLowerCase()} card will be
                removed from your portfolio.
              </p>
            </div>
            <button
              onClick={closeDeleteBanner}
              className="rounded-full bg-white/10 p-1 text-red-200 transition hover:bg-white/20 hover:text-white"
              aria-label="Close delete banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              onClick={closeDeleteBanner}
              className="rounded-lg bg-neutral-800 px-4 py-2 text-sm transition hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
