import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../utils/logger';

export interface LinkCheckResult {
  url: string;
  status: number | 'ERROR';
  type: 'page' | 'image' | 'css' | 'js';
  redirectChain?: string[];
}

export interface BrokenLinkReport {
  baseUrl: string;
  totalChecked: number;
  broken: LinkCheckResult[];
}

/**
 * Module 10: Broken Link Detection.
 * Crawls a single page (depth-1) and verifies every link/image/css/js
 * resource returns a healthy HTTP status. Extend crawlSite() for
 * multi-page crawling by following same-origin <a href> links.
 */
export async function checkPageLinks(pageUrl: string): Promise<BrokenLinkReport> {
  const { data: html } = await axios.get(pageUrl);
  const $ = cheerio.load(html);
  const origin = new URL(pageUrl).origin;

  const resources: { url: string; type: LinkCheckResult['type'] }[] = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) resources.push({ url: resolveUrl(href, origin), type: 'page' });
  });
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) resources.push({ url: resolveUrl(src, origin), type: 'image' });
  });
  $('link[rel="stylesheet"][href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) resources.push({ url: resolveUrl(href, origin), type: 'css' });
  });
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) resources.push({ url: resolveUrl(src, origin), type: 'js' });
  });

  const results = await Promise.all(
    resources.map(async (r): Promise<LinkCheckResult> => {
      try {
        const res = await axios.get(r.url, {
          timeout: 8000,
          validateStatus: () => true,
          maxRedirects: 5,
        });
        return { url: r.url, status: res.status, type: r.type };
      } catch {
        return { url: r.url, status: 'ERROR', type: r.type };
      }
    })
  );

  const broken = results.filter((r) => r.status === 'ERROR' || (typeof r.status === 'number' && r.status >= 400));

  logger.info(`Broken link check on ${pageUrl}: ${broken.length}/${results.length} broken.`);

  return { baseUrl: pageUrl, totalChecked: results.length, broken };
}

function resolveUrl(href: string, origin: string): string {
  try {
    return new URL(href, origin).toString();
  } catch {
    return href;
  }
}
