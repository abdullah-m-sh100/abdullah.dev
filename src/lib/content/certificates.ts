import { portfolioData } from '@/data/portfolio-data';
import type { Certificate } from '@/types/content';

/** Newest first. Certificates without a verified `issueDate` sort last rather than at a fake position. */
const byNewest = (a: Certificate, b: Certificate): number => {
  if (!a.issueDate && !b.issueDate) return 0;
  if (!a.issueDate) return 1;
  if (!b.issueDate) return -1;
  return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
};

/** Featured first, then the explicit `order` field, then newest. */
const byFeaturedThenOrder = (a: Certificate, b: Certificate): number => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if (a.order !== b.order) return a.order - b.order;
  return byNewest(a, b);
};

export function getAllCertificates(): Certificate[] {
  return [...portfolioData.certificates].sort(byFeaturedThenOrder);
}

/** Home page selection. Defaults to 3 cards. */
export function getLatestCertificates(limit = 3): Certificate[] {
  return getAllCertificates().slice(0, limit);
}

export function getCertificateBySlug(slug: string): Certificate | undefined {
  return portfolioData.certificates.find((certificate) => certificate.slug === slug);
}

/** A certificate is expired only when it has a past expiry date. */
export function isCertificateExpired(certificate: Certificate, now = new Date()): boolean {
  if (certificate.doesNotExpire || !certificate.expiryDate) return false;
  return new Date(certificate.expiryDate).getTime() < now.getTime();
}
