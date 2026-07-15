"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Label, ListBox, Select } from "@heroui/react";
import {
  Upload,
  Calendar,
  DollarSign,
  Target,
  Tag,
  PlusCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { CampaignFormData, CAMPAIGN_CATEGORIES, User, Campaign } from "@/types";
import { AddNewCampaign, UpdateCampaign } from "@/lib/actions/campaign";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

type AddCampaignFormProps = {
  user: User | null;
  campaign?: Campaign;
};

function formatDateForInput(date: string | Date) {
  return new Date(date).toISOString().split("T")[0];
}

export default function AddCampaignForm({
  user,
  campaign,
}: AddCampaignFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    campaign?.imageUrl ?? null,
  );

  const router = useRouter();
  const pathname = usePathname();

  // path  dynamic mode
  const isEditMode = !pathname.includes("/campaigns/new");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    defaultValues: {
      category: (campaign?.category ??
        "Technology") as CampaignFormData["category"],
      campaign_title: campaign?.title ?? "",
      campaign_story: campaign?.description ?? "",
      reward_info: campaign?.rewardInfo ?? "",
      campaign_image_url: campaign?.imageUrl ?? "",
      funding_goal: campaign?.goal,
      minimum_contribution: campaign?.minimumContribution,
      deadline: campaign ? formatDateForInput(campaign.deadline) : undefined,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        { method: "POST", body: formData },
      );
      const result = await response.json();

      if (result.success) {
        setValue("campaign_image_url", result.data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<CampaignFormData> = async (data) => {
    if (isEditMode && campaign) {
      const res = await UpdateCampaign(campaign._id, data);

      if (!res) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      if (res.status === 400 || res.status === 500 || res.status === 403) {
        toast.error(res.message);
        return;
      }

      toast.success("Campaign updated successfully!");
      router.push("/dashboard/creator/campaigns/myCampaigns");
      return;
    }

    const AllData = {
      ...data,
      status: "pending",
      creatorEmail: user?.email,
      creatorName: user?.name,
      creatorImage: user?.image,
    };

    const res = await AddNewCampaign({ ...AllData });

    if (!res) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    if (res.status === 400 || res.status === 500) {
      toast.error(res.message);
      return;
    }

    toast.success(
      "Campaign submitted successfully! It will be visible after Admin approval.",
    );
    router.push("/dashboard/creator/campaigns/myCampaigns");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-8">
        {/* Glow */}
        <div className="absolute right-0 top-0 h-full w-72 bg-cyan-500/5 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
            ✦ {isEditMode ? "Campaign Editor" : "Create Campaign"}
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {isEditMode ? "Update Your Campaign" : "Ready to Change the World?"}
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 leading-7">
            {isEditMode
              ? "Update campaign information, improve your story, and keep supporters informed with the latest details."
              : "Create a meaningful campaign, share your vision, and start receiving support from your community."}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-(--border) bg-(--surface) p-6 space-y-6"
      >
        {/* Campaign Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-(--muted)">
            Campaign Title
          </label>
          <div className="relative">
            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted)" />
            <input
              {...register("campaign_title", {
                required: "Title is required",
                minLength: 10,
              })}
              placeholder="e.g., Help us build a solar-powered water pump"
              className="w-full pl-10 pr-4 py-2.5 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all"
            />
          </div>
          {errors.campaign_title && (
            <p className="text-xs text-red-400 font-medium">
              Please provide a descriptive title (min 10 chars).
            </p>
          )}
        </div>

        {/* Category + Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(key) => field.onChange(key as string)}
                >
                  <Label className="text-xs font-semibold text-(--muted)">
                    Select Category
                  </Label>
                  <Select.Trigger className="mt-1.5 w-full flex items-center gap-2.5 rounded-xl border border-(--border) bg-(--surface-muted) px-3.5 py-2.5 text-sm text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all">
                    <Tag className="w-4 h-4 text-(--muted) shrink-0" />
                    <Select.Value className="flex-1 text-left" />
                    <Select.Indicator>
                      <ChevronDown className="w-4 h-4 text-(--muted)" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="rounded-xl border border-(--border) bg-(--surface) p-1.5 shadow-xl">
                    <ListBox>
                      {CAMPAIGN_CATEGORIES.map((cat) => (
                        <ListBox.Item
                          key={cat}
                          id={cat}
                          textValue={cat}
                          className="rounded-lg px-3 py-2 text-sm text-(--foreground) cursor-pointer data-[hovered]:bg-(--accent)/10 data-[hovered]:text-(--accent) data-[selected]:text-(--accent) data-[selected]:font-semibold transition-colors"
                        >
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--muted)">
              Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted) pointer-events-none" />
              <input
                type="date"
                {...register("deadline", { required: true })}
                className="w-full pl-10 pr-4 py-2.5 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Funding Goal + Min Contribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--muted)">
              Funding Goal
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted)" />
              <input
                type="number"
                {...register("funding_goal", { required: true, min: 100 })}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2.5 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-(--muted)">
              Minimum Contribution
            </label>
            <div className="relative">
              <PlusCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted)" />
              <input
                type="number"
                {...register("minimum_contribution", {
                  required: true,
                  min: 1,
                })}
                placeholder="10.00"
                className="w-full pl-10 pr-4 py-2.5 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Campaign Story */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-(--muted)">
            Campaign Story
          </label>
          <textarea
            {...register("campaign_story", { required: true, minLength: 50 })}
            rows={4}
            placeholder="Describe the impact, your journey, and why supporters should get involved..."
            className="w-full px-4 py-3 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all resize-none"
          />
        </div>

        {/* Reward Info */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-(--muted)">
            Reward Info
          </label>
          <textarea
            {...register("reward_info", { required: true })}
            rows={3}
            placeholder="What will supporters receive? (e.g., Early access, merchandise, acknowledgments)"
            className="w-full px-4 py-3 bg-(--surface-muted) border border-(--border) rounded-xl text-sm text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 focus:border-(--accent)/50 transition-all resize-none"
          />
        </div>

        {/* Campaign Image Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-(--muted)">
            Campaign Image Upload
          </label>

          <div className="relative rounded-xl border border-(--border) overflow-hidden group">
            {imagePreview ? (
              <div className="relative aspect-video">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold">Change Image</p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-(--accent)/20 via-(--surface) to-black overflow-hidden">
                <svg
                  viewBox="0 0 400 200"
                  className="absolute inset-0 w-full h-full opacity-40"
                  preserveAspectRatio="xMidYMax slice"
                >
                  <polygon
                    points="0,200 90,70 150,140 210,50 300,200"
                    fill="rgba(255,255,255,0.08)"
                  />
                  <polygon
                    points="60,200 160,90 230,150 320,60 400,200"
                    fill="rgba(16,185,129,0.15)"
                  />
                </svg>
                <div className="relative z-10 text-center px-6">
                  <p className="text-(--foreground) font-bold text-sm mb-1">
                    Start Your Crowdfunding Campaign
                  </p>
                  <p className="text-(--accent)/80 text-xs">
                    Inspire Growth &nbsp;|&nbsp; Achieve Impact
                  </p>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />

            {isUploading && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-(--accent)/30 border-t-(--accent) rounded-full animate-spin mb-3" />
                <p className="text-(--accent) text-xs font-bold">
                  Uploading...
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-(--muted) text-center pt-1">
            Drag and drop your hero image here, or use the button below to
            upload via ImgBB
          </p>

          <label className="flex items-center justify-center gap-2 mx-auto w-fit px-4 py-2 mt-1 rounded-lg bg-(--surface-muted) border border-(--border) text-xs font-semibold text-(--foreground) hover:border-(--accent) cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Upload via ImgBB
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <input
            type="hidden"
            {...register("campaign_image_url", {
              required: "Please upload an image",
            })}
          />
          {errors.campaign_image_url && (
            <p className="text-xs text-red-400 font-medium text-center">
              Hero image is required to launch your campaign.
            </p>
          )}
        </div>

        {/* Footer */}
        {!isEditMode && (
          <div className="flex items-start gap-2.5 pt-2 border-t border-(--border)">
            <CheckCircle2 className="w-4 h-4 text-(--accent) shrink-0 mt-3" />
            <p className="text-xs text-(--muted) py-3 leading-relaxed">
              Your campaign will be saved as{" "}
              <span className="text-(--accent) font-semibold">"Pending"</span>{" "}
              and visible to supporters after Admin approval. Verification
              usually takes 24-48 hours.
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!isEditMode && (
            <button
              type="button"
              className="px-5 py-2.5 text-sm text-(--muted) font-semibold hover:text-(--foreground) transition-colors"
            >
              Save Draft
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1 px-6 py-2.5 bg-(--accent) hover:opacity-90 disabled:bg-(--surface-muted) disabled:text-(--muted) text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Launching..."
              : isEditMode
                ? "Update Campaign"
                : "Add Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}