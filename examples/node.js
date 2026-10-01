// npm install apify-client
// APIFY_TOKEN=... node examples/node.js
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) throw new Error('set APIFY_TOKEN first');

const client = new ApifyClient({ token });

const run = await client.actor('agnes.developer.queen/linkedin-people-search-scraper').call({
    titles: ['VP of Sales', 'Head of Sales'],
    companies: ['Stripe'],
    maxResults: 10,
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();

for (const row of items) {
    const tag = row.charged ? 'CHARGED' : 'free   ';
    console.log(`${tag}  ${row.fullName}  |  ${row.headline}  |  ${row.profileUrl ?? '-'}  |  ${row.reason}`);
}
