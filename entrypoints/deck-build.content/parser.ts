import cards from "@/shared/card-map.json";

declare global {
  interface Window {
    cardList: Array<{ cardId: string; cardName: string }>;
  }
}

const cardRegex = /^(\d+)\s+.+?\s+([A-Z]+)\s+(\d+)$/;
const mapping = cards as Record<string, Record<string, number>>;
const cardLookup = new Map(
  (window.cardList || []).map((c) => [c.cardId, c.cardName]),
);

export const getDeckDataFromText = (
  decklist: string,
): {
  cardId: string;
  cardName: string;
  count: string;
}[] => {
  const lines = decklist.split("\n");

  const seen = new Map<string, { count: number; cardName: string }>();

  for (const line of lines) {
    const match = line.match(cardRegex);
    if (!match) continue;

    const [count, setCode, setNum] = match.slice(1);
    const cardId = mapping?.[setCode]?.[setNum];

    if (!cardId) {
      console.warn(`Card not found: ${setCode} ${setNum}`);
      continue;
    }

    const cardIdStr = cardId.toString();
    seen.set(cardIdStr, {
      count: (seen.get(cardIdStr)?.count ?? 0) + parseInt(count),
      cardName: cardLookup.get(cardIdStr) ?? "",
    });
  }

  const deck = [...seen.entries()].map(([cardId, { count, cardName }]) => ({
    cardId: cardId.toString(),
    cardName,
    count: count.toString(),
  }));

  return deck;
};
