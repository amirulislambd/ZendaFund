export const CREDIT_PACKAGES = [
  {
    id: "pkg-50",
    title: "Quick Start",
    credits: 50,
    priceUsd: 5,
    badge: "Starter",
    featured: false,
    color: "from-sky-500 to-cyan-500",
    features: [
      "Perfect for first contribution",
      "Instant credit delivery",
      "Secure payment",
    ],
  },
  {
    id: "pkg-100",
    title: "Starter",
    credits: 100,
    priceUsd: 10,
    badge: "Popular",
    featured: false,
    color: "from-blue-500 to-indigo-500",
    features: [
      "Great for regular supporters",
      "Instant credit delivery",
      "Secure payment",
    ],
  },
  {
    id: "pkg-300",
    title: "Supporter",
    credits: 300,
    priceUsd: 25,
    badge: "Save 17%",
    featured: true,
    color: "from-violet-500 to-fuchsia-500",
    features: [
      "Best for active supporters",
      "Priority processing",
      "Most purchased package",
    ],
  },
  {
    id: "pkg-800",
    title: "Champion",
    credits: 800,
    priceUsd: 60,
    badge: "Best Value",
    featured: true,
    color: "from-emerald-500 to-teal-500",
    features: ["Maximum savings", "Large campaign support", "Recommended"],
  },
  {
    id: "pkg-1500",
    title: "Elite",
    credits: 1500,
    priceUsd: 110,
    badge: "Pro",
    featured: false,
    color: "from-amber-500 to-orange-500",
    features: [
      "For power supporters",
      "Lowest price per credit",
      "Premium experience",
    ],
  },
  {
    id: "pkg-2500",
    title: "Ultimate",
    credits: 2500,
    priceUsd: 175,
    badge: "Enterprise",
    featured: false,
    color: "from-rose-500 to-red-500",
    features: [
      "Huge contribution budget",
      "Exclusive supporter tier",
      "Maximum flexibility",
    ],
  },

  // New Package 7
  {
    id: "pkg-5000",
    title: "Legend",
    credits: 5000,
    priceUsd: 325,
    badge: "Hot 🔥",
    featured: false,
    color: "from-purple-600 to-pink-600",
    features: [
      "Ideal for organizations",
      "Priority support",
      "Maximum credit savings",
    ],
  },

  // New Package 8
  {
    id: "pkg-10000",
    title: "Infinity",
    credits: 10000,
    priceUsd: 599,
    badge: "VIP 👑",
    featured: true,
    color: "from-yellow-400 via-orange-500 to-red-500",
    features: [
      "Ultimate supporter package",
      "Best price per credit",
      "Exclusive VIP benefits",
    ],
  },
] as const;

export type Package = (typeof CREDIT_PACKAGES)[number];
