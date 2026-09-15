import { useRef } from "react";

const useCache = (namespace = "cache", ttlInSeconds = 3600) => {
	const cacheRef = useRef(new Map());
	const ttlInMilliseconds = ttlInSeconds * 1000;

	const getCacheKey = (key) => `${namespace}:${String(key).trim().toLowerCase()}`;

	const setCache = (key, value) => {
		cacheRef.current.set(getCacheKey(key), {
			value,
			expiresAt: Date.now() + ttlInMilliseconds,
		});
	};

	const getCache = (key) => {
		const cacheKey = getCacheKey(key);
		const cachedEntry = cacheRef.current.get(cacheKey);

		if (!cachedEntry) {
			return undefined;
		}

		if (cachedEntry.expiresAt <= Date.now()) {
			cacheRef.current.delete(cacheKey);
			return undefined;
		}

		return cachedEntry.value;
	};

	return { setCache, getCache };
};

export default useCache;
