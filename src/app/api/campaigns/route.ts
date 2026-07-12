import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/lib/data';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? '';
  const category = url.searchParams.get('category') ?? '';
  const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
  const limit = Math.max(Number(url.searchParams.get('limit') ?? '12'), 1);
  const sort = url.searchParams.get('sort') ?? 'newest';

  let campaigns = mockCampaigns.filter((campaign) => campaign.status === 'approved');

  if (category && category !== 'All Categories') {
    campaigns = campaigns.filter((campaign) => campaign.category === category);
  }

  if (q.trim()) {
    const search = q.trim().toLowerCase();
    campaigns = campaigns.filter((campaign) =>
      [campaign.title, campaign.story, campaign.rewardInfo]
        .join(' ')
        .toLowerCase()
        .includes(search)
    );
  }

  campaigns = campaigns.sort((a, b) => {
    if (sort === 'oldest') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }

    if (sort === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }

    if (sort === 'raised') {
      return b.raisedAmount - a.raisedAmount;
    }

    return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
  });

  const total = campaigns.length;
  const pages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;
  const pagedCampaigns = campaigns.slice(start, start + limit);

  return NextResponse.json({
    campaigns: pagedCampaigns,
    pagination: {
      page,
      limit,
      total,
      pages,
    },
  });
}
