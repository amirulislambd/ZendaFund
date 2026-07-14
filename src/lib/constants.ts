export const CREDITS_PER_DOLLAR = 10;

export function creditsToUsd(credits: number): number {
  return Number((credits / CREDITS_PER_DOLLAR).toFixed(2));
}