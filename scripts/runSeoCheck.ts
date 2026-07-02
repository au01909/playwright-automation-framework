import * as dotenv from 'dotenv';
import { validateSeo } from '../seo/seoValidator';

dotenv.config();

async function main() {
  const url = process.env.BASE_URL || 'https://yournearbestplumbingservices.com';
  const report = await validateSeo(url);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error('SEO check failed:', err);
  process.exit(1);
});
