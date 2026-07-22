const PB_URL = 'https://nod.pockethost.io/api/collections/configs/records';

export interface ConfigRecord {
  id: string;
  slug: string;
  bot_token: string;
  chat_id: string;
}

function generateSlug(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join('');
}

async function slugExists(slug: string): Promise<boolean> {
  const res = await fetch(`${PB_URL}?filter=(slug="${slug}")&perPage=1`);
  if (!res.ok) return false;
  const data = await res.json();
  return data.totalItems > 0;
}

export async function createConfig(botToken: string, chatId: string): Promise<ConfigRecord> {
  let slug = generateSlug();
  while (await slugExists(slug)) {
    slug = generateSlug();
  }

  const res = await fetch(PB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, bot_token: botToken, chat_id: chatId }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PocketBase error: ${err}`);
  }

  return res.json();
}

export async function getConfigBySlug(slug: string): Promise<ConfigRecord | null> {
  try {
    const res = await fetch(`${PB_URL}?filter=(slug="${slug}")&perPage=1`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.items || data.items.length === 0) return null;
    return data.items[0] as ConfigRecord;
  } catch {
    return null;
  }
}
