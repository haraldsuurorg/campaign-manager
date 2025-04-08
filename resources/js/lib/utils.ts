import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import TinyEmitter from 'tiny-emitter'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emitter = new (TinyEmitter as any)();
