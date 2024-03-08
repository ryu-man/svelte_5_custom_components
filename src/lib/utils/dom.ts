import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}

export function prefix(value: string, prefix: string, delimiter = '-') {
	return `${prefix}${delimiter}${value}`;
}

export function postfix(value: string, postfix: string, delimiter = '-') {
	return `${value}${delimiter}${postfix}`;
}
