/**
 * @see {@link https://github.com/lodash/lodash/blob/8a26eb42adb303f4adc7ef56e300f14c5992aa68/lodash.js#L10372}
 */

export type DebounceOptions = {
	leading?: boolean;
	maxWait?: number;
	trailing?: boolean;
};

export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait = 0,
	options: DebounceOptions = {},
) {
	let timerId: ReturnType<typeof setTimeout> | undefined;
	let lastArgs: Parameters<T> | undefined;
	let lastCallTime: number | undefined;
	let lastInvokeTime = 0;
	let result: ReturnType<T>;
	const { leading = false, trailing = true, maxWait } = options;

	const invoke = (time: number) => {
		const args = lastArgs!;
		lastArgs = undefined;
		lastInvokeTime = time;
		result = fn(...args);
		return result;
	};

	const leadingEdge = (time: number) => {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invoke(time) : result;
	};

	const remainingWait = (time: number) => {
		const sinceLastCall = time - (lastCallTime ?? 0);
		const sinceLastInvoke = time - lastInvokeTime;
		const timeWaiting = wait - sinceLastCall;
		return maxWait !== undefined
			? Math.min(timeWaiting, maxWait - sinceLastInvoke)
			: timeWaiting;
	};

	const shouldInvoke = (time: number) => {
		const sinceLastCall = time - (lastCallTime ?? 0);
		const sinceLastInvoke = time - lastInvokeTime;
		return (
			lastCallTime === undefined ||
			sinceLastCall >= wait ||
			sinceLastCall < 0 ||
			(maxWait !== undefined && sinceLastInvoke >= maxWait)
		);
	};

	const trailingEdge = (time: number) => {
		timerId = undefined;
		if (trailing && lastArgs) {
			return invoke(time);
		}
		lastArgs = undefined;
		return result;
	};

	const timerExpired = () => {
		const time = Date.now();
		if (shouldInvoke(time)) {
			return trailingEdge(time);
		}
		timerId = setTimeout(timerExpired, remainingWait(time));
	};

	const debounced = (...args: Parameters<T>): ReturnType<T> => {
		const time = Date.now();
		const isInvoking = shouldInvoke(time);

		lastArgs = args;
		lastCallTime = time;

		if (isInvoking) {
			if (timerId === undefined) {
				return leadingEdge(lastCallTime);
			}
			if (maxWait !== undefined) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invoke(lastCallTime);
			}
		}

		if (timerId === undefined) {
			timerId = setTimeout(timerExpired, wait);
		}
		return result;
	};

	debounced.cancel = () => {
		if (timerId !== undefined) {
			clearTimeout(timerId);
		}
		timerId = undefined;
		lastArgs = undefined;
		lastCallTime = undefined;
		lastInvokeTime = 0;
	};

	debounced.flush = () =>
		timerId === undefined ? result : trailingEdge(Date.now());

	return debounced;
}
