# pip install apify-client
# APIFY_TOKEN=... python examples/python.py
import os

from apify_client import ApifyClient

token = os.environ.get("APIFY_TOKEN")
if not token:
    raise SystemExit("set APIFY_TOKEN first")

client = ApifyClient(token)

run = client.actor("agnes.developer.queen/linkedin-people-search-scraper").call(
    run_input={
        "titles": ["VP of Sales", "Head of Sales"],
        "companies": ["Stripe"],
        "maxResults": 10,
    }
)

for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    tag = "CHARGED" if row["charged"] else "free   "
    print(tag, row["fullName"], "|", row["headline"], "|", row.get("profileUrl") or "-", "|", row["reason"])
