import csv
import requests
import json
import re
from html.parser import HTMLParser


HEADERS = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://asia.pokemon-card.com",
    "referer": "https://asia.pokemon-card.com/ph/deck-build/",
    "x-requested-with": "XMLHttpRequest",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
}

URL = "https://asia.pokemon-card.com/ph/deck-build/search_card/"


def fetch_cards(form_product: str, form_product_ids: str) -> tuple[list[dict], str]:
    data = {
        "freeword": "",
        "cardType": "all",
        "regulation": "1",
        "formProduct": form_product,
        "formProductIds": form_product_ids,
        "formDeckList": "[]",
    }

    response = requests.post(URL, headers=HEADERS, data=data)
    response.raise_for_status()

    raw = response.json()
    html = raw["view"]

    cards = [
        {"card_id": m.group(2), "card_name": m.group(3), "img_src": m.group(1)}
        for m in re.finditer(r"imgFileSrc:\s*'([^']+)',\s*cardId:\s*'(\d+)',\s*cardName:\s*'([^']+)'", html)
    ]

    return cards, response.text

if __name__ == "__main__":
    product = "SV05"
    cards, raw = fetch_cards(form_product=product, form_product_ids="checkbox44")

    with open(f"{product}.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["card_id", "card_name", "img_src"])
        writer.writeheader()
        writer.writerows(cards)

    print(f"Saved {len(cards)} cards to {product}.csv")