import { User } from "next-auth";
import jwt from 'jsonwebtoken';
import crypto from "crypto";

export function getJwtPublicKey() {
  const publicKey = process.env.NEXT_PUBLIC_JWT;

  if (!publicKey) {
    throw new Error("JWT public key is not set, set it up in the .env file (check .env.example for more info)");
  }

  return publicKey;
}


export function getJwtPrivateKey() {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("JWT Private key is not set, set it up in the .env file (check .env.example for more info)");
  }

  return privateKey;
}

export async function verifyJwtToken(token: string) {
  if (!token) return null;
  const obj: any = await jwt.verify(token, getJwtPublicKey());
  return obj as User;
}

export async function verifyJwtTokenClient(token: string) {
  if (!token) return null;
  const k = await fetch("/api/auth/verify",{
    method: "POST",
    body: JSON.stringify({
      token
    })
  })
  if(!k.ok) throw new Error("Verification failed or expired");
  const data = await k.json();
  return data.user as User;
}


// ------------------- Crypto Stuff (Securing Password) -------------------

const splitterText = '__SALT=__'

export async function hashPassword(passwordPlainText: string) {
  // Creating a unique salt for a particular user 
  const salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations, 
  return crypto.pbkdf2Sync(passwordPlainText, salt,
    1000, 64, `sha512`).toString(`hex`)
    + splitterText
    + salt;
}

export async function verifyHashedPassword(password?: string | null, hashSalt?: string | null) {
  if (!password || !hashSalt) return false;

  const [hash, salt] = hashSalt?.split(splitterText);


  // Hashing user's salt and password with 1000 iterations, 
  const newHash = crypto.pbkdf2Sync(password,
    salt, 1000, 64, `sha512`).toString(`hex`);

  return newHash === hash;
}

