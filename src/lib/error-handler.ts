export function registerGlobalErrorHandler() {
	const ErrorUtils = (globalThis as any).ErrorUtils;
	if (!ErrorUtils) {
		return;
	}

	const defaultHandler = ErrorUtils.getGlobalHandler();

	ErrorUtils.setGlobalHandler((error: unknown, isFatal: boolean | undefined) => {
		console.error('Global error handler caught:', error, 'isFatal:', isFatal);
		defaultHandler(error, isFatal);
	});
}
