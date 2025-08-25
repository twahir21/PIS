import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const ALGO = "aes-256-gcm";

// 🔑 Generate a random key (keep this secret & safe!)
export function generateKey(): Buffer {
  return randomBytes(32); // 256 bits
}

// 🔒 Encrypt function
export function encrypt(text: string, key: Buffer) {
  const iv = randomBytes(16); // Initialization Vector
  const cipher = createCipheriv(ALGO, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return {
    content: encrypted,
    iv: iv.toString("hex"),
    authTag,
  };
}

// 🔓 Decrypt function
export function decrypt(
  encrypted: { content: string; iv: string; authTag: string },
  key: Buffer
) {
  const decipher = createDecipheriv(
    ALGO,
    key,
    Buffer.from(encrypted.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.authTag, "hex"));

  let decrypted = decipher.update(encrypted.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// ------------------
// ✅ Example usage
// ------------------
const key = generateKey();

const secret = "This is a super secret message!";
const encrypted = encrypt(secret, key);
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted, key);
console.log("Decrypted:", decrypted);
