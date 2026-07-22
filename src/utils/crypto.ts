const SECRET = 'SSTk9#mX2@pL';

function xorEncode(str: string): string {
  return str
    .split('')
    .map((c, i) => c.charCodeAt(0) ^ SECRET.charCodeAt(i % SECRET.length))
    .map(n => n.toString(16).padStart(2, '0'))
    .join('');
}

function xorDecode(hex: string): string {
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return bytes
    .map((b, i) => String.fromCharCode(b ^ SECRET.charCodeAt(i % SECRET.length)))
    .join('');
}

export function encodeCredentials(botToken: string, chatId: string): string {
  const payload = `${botToken}|${chatId}`;
  return xorEncode(payload);
}

export function decodeCredentials(encoded: string): { botToken: string; chatId: string } | null {
  try {
    const decoded = xorDecode(encoded);
    const sep = decoded.lastIndexOf('|');
    if (sep === -1) return null;
    const botToken = decoded.slice(0, sep);
    const chatId = decoded.slice(sep + 1);
    if (!botToken || !chatId) return null;
    return { botToken, chatId };
  } catch {
    return null;
  }
}
