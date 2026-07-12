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
  FileText,
  Gift,
  PlusCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { CampaignFormData, CAMPAIGN_CATEGORIES } from "@/types";

/**
 * ZendaFund - Add New Campaign Form (Client Component)
 * Tech Stack: Next.js, React, Tailwind CSS, React Hook Form, HeroUI v3, TypeScript
 */

export default function AddCampaignForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    defaultValues: {
      category: "Technology",
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
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });
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
    console.log("Submitting Campaign:", { ...data, status: "pending" });
    console.log("Image URL:", data.campaign_image_url);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Campaign submitted successfully! It will be visible after Admin approval.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
          Ready to change the world?
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Provide the details below to start your funding journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-white/10 bg-[#161c1a] p-6 space-y-6"
      >
        {/* Campaign Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Campaign Title</label>
          <div className="relative">
            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              {...register("campaign_title", { required: "Title is required", minLength: 10 })}
              placeholder="e.g., Help us build a solar-powered water pump"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
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
                  <Label className="text-xs font-semibold text-slate-300">Select Category</Label>
                  <Select.Trigger className="mt-1.5 w-full flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all">
                    <Tag className="w-4 h-4 text-slate-500 shrink-0" />
                    <Select.Value className="flex-1 text-left" />
                    <Select.Indicator>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="rounded-xl border border-white/10 bg-[#1c2320] p-1.5 shadow-xl">
                    <ListBox>
                      {CAMPAIGN_CATEGORIES.map((cat) => (
                        <ListBox.Item
                          key={cat}
                          id={cat}
                          textValue={cat}
                          className="rounded-lg px-3 py-2 text-sm text-slate-200 cursor-pointer data-[hovered]:bg-emerald-500/10 data-[hovered]:text-emerald-300 data-[selected]:text-emerald-400 data-[selected]:font-semibold transition-colors"
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
            <label className="text-xs font-semibold text-slate-300">Deadline</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="date"
                {...register("deadline", { required: true })}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Funding Goal + Min Contribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Funding Goal</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="number"
                {...register("funding_goal", { required: true, min: 100 })}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Minimum Contribution</label>
            <div className="relative">
              <PlusCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="number"
                {...register("minimum_contribution", { required: true, min: 1 })}
                placeholder="10.00"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Campaign Story */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Campaign Story</label>
          <textarea
            {...register("campaign_story", { required: true, minLength: 50 })}
            rows={4}
            placeholder="Describe the impact, your journey, and why supporters should get involved..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all resize-none"
          />
        </div>

        {/* Reward Info */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Reward Info</label>
          <textarea
            {...register("reward_info", { required: true })}
            rows={3}
            placeholder="What will supporters receive? (e.g., Early access, merchandise, acknowledgments)"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all resize-none"
          />
        </div>

        {/* Campaign Image Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Campaign Image Upload</label>

          <div className="relative rounded-xl border border-white/10 overflow-hidden group">
            {imagePreview ? (
              <div className="relative aspect-video">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold">Change Image</p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-[#161c1a] to-black overflow-hidden">
                {/* mountain silhouette placeholder illustration */}
                <svg
                  viewBox="0 0 400 200"
                  className="absolute inset-0 w-full h-full opacity-40"
                  preserveAspectRatio="xMidYMax slice"
                >
                  <polygon points="0,200 90,70 150,140 210,50 300,200" fill="rgba(255,255,255,0.08)" />
                  <polygon points="60,200 160,90 230,150 320,60 400,200" fill="rgba(16,185,129,0.15)" />
                </svg>
                <div className="relative z-10 text-center px-6">
                  <p className="text-white font-bold text-sm mb-1">Start Your Crowdfunding Campaign</p>
                  <p className="text-emerald-300/80 text-xs">Inspire Growth &nbsp;|&nbsp; Achieve Impact</p>
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
                <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-3" />
                <p className="text-emerald-400 text-xs font-bold">Uploading...</p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 text-center pt-1">
            Drag and drop your hero image here, or use the button below to upload via ImgBB
          </p>

          <label className="flex items-center justify-center gap-2 mx-auto w-fit px-4 py-2 mt-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Upload via ImgBB
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <input type="hidden" {...register("campaign_image_url", { required: "Please upload an image" })} />
          {errors.campaign_image_url && (
            <p className="text-xs text-red-400 font-medium text-center">
              Hero image is required to launch your campaign.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-3" />
          <p className="text-xs text-slate-400 py-3 leading-relaxed">
            Your campaign will be saved as{" "}
            <span className="text-emerald-400 font-semibold">"Pending"</span> and visible to
            supporters after Admin approval. Verification usually takes 24-48 hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 text-sm text-slate-400 font-semibold hover:text-white transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400 text-[#0d1210] text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Launching..." : "Add Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}