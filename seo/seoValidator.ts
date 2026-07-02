import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../utils/logger';

export interface SeoReport {
  url: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogTags: Record<string, string>;
  twitterCard: string | null;
  schemaFound: boolean;
  robotsTxtOk: boolean;
  sitemapOk: boolean;
  imagesMissingAlt: number;
  headingHierarchyOk: boolean;
  score: number; // 0-100
  recommendations: string[];
}

/**
 * Module 8: SEO Validation.
 * Pure DOM/HTTP checks (no AI needed) — deterministic and fast.
 */
export async function validateSeo(baseUrl: string): Promise<SeoReport> {
  const { data: html } = await axios.get(baseUrl);
  const $ = cheerio.load(html);
  const recommendations: string[] = [];

  const title = $('title').text() || null;
  if (!title) recommendations.push('Add a <title> tag.');

  const description = $('meta[name="description"]').attr('content') || null;
  if (!description) recommendations.push('Add a meta description.');

  const canonical = $('link[rel="canonical"]').attr('href') || null;
  if (!canonical) recommendations.push('Add a canonical link tag.');

  const ogTags: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr('property');
    const content = $(el).attr('content');
    if (prop && content) ogTags[prop] = content;
  });
  if (Object.keys(ogTags).length === 0) recommendations.push('Add OpenGraph tags for social sharing.');

  const twitterCard = $('meta[name="twitter:card"]').attr('content') || null;
  if (!twitterCard) recommendations.push('Add a Twitter Card meta tag.');

  const schemaFound = $('script[type="application/ld+json"]').length > 0;
  if (!schemaFound) recommendations.push('Add JSON-LD LocalBusiness schema markup — important for a local plumbing service.');

  let imagesMissingAlt = 0;
  $('img').each((_, el) => {
    if (!$(el).attr('alt')) imagesMissingAlt++;
  });
  if (imagesMissingAlt > 0) recommendations.push(`${imagesMissingAlt} image(s) missing alt text.`);

  const h1Count = $('h1').length;
  const headingHierarchyOk = h1Count === 1;
  if (!headingHierarchyOk) recommendations.push(`Page has ${h1Count} <h1> tags — should have exactly 1.`);

  const robotsTxtOk = await checkUrlExists(`${baseUrl.replace(/\/$/, '')}/robots.txt`);
  if (!robotsTxtOk) recommendations.push('robots.txt not found or unreachable.');

  const sitemapOk = await checkUrlExists(`${baseUrl.replace(/\/$/, '')}/sitemap.xml`);
  if (!sitemapOk) recommendations.push('sitemap.xml not found or unreachable.');

  const checks = [
    !!title, !!description, !!canonical, Object.keys(ogTags).length > 0,
    !!twitterCard, schemaFound, robotsTxtOk, sitemapOk,
    imagesMissingAlt === 0, headingHierarchyOk,
  ];
  const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  const report: SeoReport = {
    url: baseUrl, title, description, canonical, ogTags, twitterCard,
    schemaFound, robotsTxtOk, sitemapOk, imagesMissingAlt, headingHierarchyOk,
    score, recommendations,
  };

  logger.info(`SEO score for ${baseUrl}: ${score}/100`);
  return report;
}

async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const res = await axios.get(url, { timeout: 5000, validateStatus: () => true });
    return res.status === 200;
  } catch {
    return false;
  }
}
