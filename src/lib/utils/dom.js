import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
	return twMerge(clsx(...inputs));
}

export function prefix(value, prefix, delimiter = '-') {
	return `${prefix}${delimiter}${value}`;
}

export function postfix(value, postfix, delimiter = '-') {
	return `${value}${delimiter}${postfix}`;
}
