const isServer = typeof window === 'undefined';

export const urlApi = isServer ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') : ""