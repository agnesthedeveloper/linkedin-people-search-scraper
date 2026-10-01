#!/usr/bin/env sh
# Run the actor and get the dataset back in the same request.
# Needs APIFY_TOKEN in the environment. Prints one JSON array of rows.
set -eu

: "${APIFY_TOKEN:?set APIFY_TOKEN first}"

curl -sS -X POST \
  "https://api.apify.com/v2/acts/agnes.developer.queen~linkedin-people-search-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "titles": ["VP of Sales", "Head of Sales"], "companies": ["Stripe"], "maxResults": 10 }'
