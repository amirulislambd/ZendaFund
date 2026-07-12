import { GetCampaigns } from "@/lib/actions/campaign";
import CampaignExplorer from "@/components/campaigns/CampaignExplorer";

type SearchParams = {
  q?: string;
  category?: string;
  sort?: string;
  page?: string;
};

const AVAILABLE_SORTS = ["newest", "oldest", "deadline", "raised"] as const;
type CampaignSort = (typeof AVAILABLE_SORTS)[number];

type ExplorePageProps = {
  // Next.js 15: searchParams is a Promise and must be awaited before use
  searchParams?: Promise<SearchParams>;
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const currentPage = Math.max(Number(resolvedSearchParams.page ?? "1"), 1);
  const currentSort: CampaignSort = AVAILABLE_SORTS.includes(
    resolvedSearchParams.sort as CampaignSort,
  )
    ? (resolvedSearchParams.sort as CampaignSort)
    : "newest";
  const currentSearch = resolvedSearchParams.q ?? "";
  const currentCategory = resolvedSearchParams.category ?? "All Categories";

  // All data fetching + filtering happens here, server-side, on every
  // navigation (router.replace in the client component triggers this
  // Server Component to re-run with the new searchParams).
  const [categoryResponse, response] = await Promise.all([
    GetCampaigns({ page: 1, limit: 1000 }),
    GetCampaigns({
      q: currentSearch.trim() || undefined,
      category:
        currentCategory !== "All Categories" ? currentCategory : undefined,
      sort: currentSort,
      page: currentPage,
      limit: 12,
    }),
  ]);

  const allCategories = [
    "All Categories",
    ...Array.from(
      new Set(
        categoryResponse.campaigns.map(
          (campaign: { category: string }) => campaign.category,
        ),
      ),
    ),
  ];

  const pagination = response.pagination ?? {
    page: currentPage,
    limit: 12,
    total: response.campaigns?.length ?? 0,
    pages: 1,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_32%),var(--background)] text-(--foreground)">
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <CampaignExplorer
            campaigns={response.campaigns ?? []}
            categories={allCategories}
            search={currentSearch}
            category={currentCategory}
            sort={currentSort}
            page={currentPage}
            pagination={pagination}
          />
        </section>
      </main>
    </div>
  );
}
