"use client";

import { useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Campaign } from '@/types';
import { Label, ListBox, Select } from '@heroui/react';

type CampaignSort = 'newest' | 'oldest' | 'deadline' | 'raised';

type CampaignExplorerProps = {
  campaigns: Campaign[];
  categories: string[];
  search: string;
  category: string;
  sort: CampaignSort;
  page: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const sortOptions: { value: CampaignSort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'deadline', label: 'Soonest Deadline' },
  { value: 'raised', label: 'Most Raised' },
];

function buildExploreUrl({
  search,
  category,
  sort,
  page,
}: {
  search: string;
  category: string;
  sort: CampaignSort;
  page: number;
}) {
  const params = new URLSearchParams();

  if (search.trim()) params.set('q', search.trim());
  if (category && category !== 'All Categories') params.set('category', category);
  if (sort) params.set('sort', sort);
  if (page > 1) params.set('page', String(page));

  return `/explore${params.toString() ? `?${params.toString()}` : ''}`;
}

export default function CampaignExplorer({
  campaigns,
  categories,
  search,
  category,
  sort,
  page,
  pagination,
}: CampaignExplorerProps) {
  const router = useRouter();
  // useTransition gives us a loading flag while the Server Component
  // re-fetches with the new URL — no client-side fetch/useEffect needed.
  const [isPending, startTransition] = useTransition();

  const categoryOptions = useMemo(
    () => ['All Categories', ...categories.filter((value) => value !== 'All Categories')],
    [categories],
  );

  const updateUrl = ({
    nextSearch = search,
    nextCategory = category,
    nextSort = sort,
    nextPage = page,
  }: {
    nextSearch?: string;
    nextCategory?: string;
    nextSort?: CampaignSort;
    nextPage?: number;
  }) => {
    const url = buildExploreUrl({
      search: nextSearch,
      category: nextCategory,
      sort: nextSort,
      page: nextPage,
    });

    startTransition(() => {
      router.replace(url);
    });
  };

  const handleSearchChange = (value: string) => {
    updateUrl({ nextSearch: value, nextPage: 1 });
  };

  const handleCategoryChange = (value: string) => {
    updateUrl({ nextCategory: value, nextPage: 1 });
  };

  const handleSortChange = (value: CampaignSort) => {
    updateUrl({ nextSort: value, nextPage: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages || newPage === page) return;
    updateUrl({ nextPage: newPage });
  };

  const progress = (campaign: Campaign) => {
    if (!campaign.fundingGoal || campaign.fundingGoal <= 0) return 0;
    return Math.min((campaign.raisedAmount / campaign.fundingGoal) * 100, 100);
  };

  const daysLeft = (deadline: string | Date) => {
    const diff = new Date(deadline).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <>
      <div className="mb-10 flex flex-col items-center gap-8 text-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-(--accent)">
            Find your next cause
          </p>
          <p className="mt-3 text-base leading-7 text-(--muted)">
            Use the search input, category dropdown, and sort menu to locate the campaigns
            you want. Every filter is reflected in the URL so the page can be shared.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <label className="sr-only" htmlFor="campaign-search">
            Search campaigns
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)">
              ⌕
            </span>
            <input
              id="campaign-search"
              defaultValue={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search campaigns"
              className="w-full rounded-3xl border border-(--border) bg-(--surface-muted) px-4 py-3 pl-11 text-(--foreground) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Select value={category} onChange={(value) => handleCategoryChange(value as string)}>
            <Select.Trigger className="flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-muted) px-5 py-2.5 text-sm text-(--foreground) shadow-sm transition hover:border-(--accent)">
              <Select.Value />
              <Select.Indicator className="text-(--muted)">▾</Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="rounded-3xl border border-(--border) bg-(--surface) p-2 shadow-xl">
              <ListBox>
                {categoryOptions.map((option) => (
                  <ListBox.Item
                    key={option}
                    id={option}
                    textValue={option}
                    className="rounded-2xl px-3 py-3 text-sm text-(--foreground) transition hover:bg-(--surface-muted) hover:text-(--foreground) data-selected:bg-(--accent)/10 data-selected:text-(--accent)"
                  >
                    {option}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select value={sort} onChange={(value) => handleSortChange(value as CampaignSort)}>
            <Select.Trigger className="flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-muted) px-5 py-2.5 text-sm text-(--foreground) shadow-sm transition hover:border-(--accent)">
              <Select.Value />
              <Select.Indicator className="text-(--muted)">▾</Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="rounded-3xl border border-(--border) bg-(--surface) p-2 shadow-xl">
              <ListBox>
                {sortOptions.map((option) => (
                  <ListBox.Item
                    key={option.value}
                    id={option.value}
                    textValue={option.label}
                    className="rounded-2xl px-3 py-3 text-sm text-(--foreground) transition hover:bg-(--surface-muted) hover:text-(--foreground) data-selected:bg-(--accent)/10 data-selected:text-(--accent)"
                  >
                    {option.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      <div className={`grid gap-6 xl:grid-cols-3 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => {
            const campaignProgress = progress(campaign);
            const remaining = daysLeft(campaign.deadline);

            return (
              <article
                key={campaign.id}
                className="overflow-hidden rounded-[28px] border border-(--border) bg-(--surface) shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
              >
                <div className="relative">
                  <img src={campaign.imageUrl} alt={campaign.title} className="h-44 w-full object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {remaining > 0 ? `${remaining} days left` : 'Ended'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-(--surface-muted) px-3 py-1 text-sm font-medium text-(--foreground)">{campaign.category}</span>
                    <span className="text-sm text-(--muted)">{campaign.status}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-(--foreground)">{campaign.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-(--muted)">{campaign.story}</p>

                  {campaign.rewardInfo && (
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-(--accent)">
                      Reward: {campaign.rewardInfo}
                    </p>
                  )}

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm text-(--muted)">
                      <span>Raised {(campaign.raisedAmount ?? 0).toLocaleString()} credits</span>
                      <span>{Math.round(campaignProgress)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-(--surface-muted)">
                      <div className="h-full rounded-full bg-(--accent)" style={{ width: `${campaignProgress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-(--muted)">
                      <span>Goal: {(campaign.fundingGoal ?? 0).toLocaleString()} credits</span>
                      <span>Min. {(campaign.minimumContribution ?? 0).toLocaleString()} credits</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link href={`/campaign/${campaign.id}`} className="text-sm font-semibold text-(--accent) transition hover:text-(--accent)/80">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full rounded-[28px] border border-(--border) bg-(--surface) p-10 text-center text-(--muted)">
            No campaigns found. Try another search or category.
          </div>
        )}
      </div>

      {pagination.pages > 1 && (
        <nav className="mt-8 flex flex-col items-center gap-3 rounded-[28px] border border-(--border) bg-(--surface) p-4 shadow-sm sm:flex-row sm:justify-between">
          <div className="text-sm text-(--muted)">
            Showing page {pagination.page} of {pagination.pages} ({pagination.total} campaigns)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="rounded-full border border-(--border) bg-(--surface-muted) px-4 py-2 text-sm text-(--foreground) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  pageNumber === page
                    ? 'bg-(--accent) text-(--surface)'
                    : 'border border-(--border) bg-(--surface-muted) text-(--foreground) hover:border-(--accent)'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.pages}
              className="rounded-full border border-(--border) bg-(--surface-muted) px-4 py-2 text-sm text-(--foreground) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </>
  );
}