import * as dotenv from 'dotenv';
import { checkPageLinks } from '../seo/brokenLinkDetector';

dotenv.config();

async function main() {
  const url = process.env.BASE_URL || 'https://yournearbestplumbingservices.com';
  const report = await checkPageLinks(url);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error('Broken link check failed:', err);
  process.exit(1);
});
