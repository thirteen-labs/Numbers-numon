import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, router, useSegments } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ErrorBoundary } from '@/components/error-boundary';
import AppTabs from '@/components/app-tabs';
import { useAppStore } from '@/lib/store';
import { isOnboardingDone } from '@/lib/storage';
import { registerGlobalErrorHandler } from '@/lib/error-handler';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { theme, setLastOpenedScreen, setOnboarded } = useAppStore();
	const segments = useSegments();

	const resolvedTheme = theme === 'system' ? colorScheme ?? 'light' : theme;
	const navTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme;

	useEffect(() => {
		try { registerGlobalErrorHandler(); } catch (e) { console.warn('[Layout] registerGlobalErrorHandler failed', e); }
	}, []);

	useEffect(() => {
		let done = false;
		try { done = isOnboardingDone(); } catch (e) { console.warn('[Layout] isOnboardingDone failed', e); done = false; }
		setOnboarded(done);
		if (!done) {
			const current = segments.join('/');
			if (!current.includes('onboarding')) {
				try { router.replace('/onboarding'); } catch (e) { console.warn('[Layout] router.replace failed', e); }
			}
		}
		// segments intentionally omitted to avoid loop; run once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setOnboarded]);

	useEffect(() => {
		try {
			const path = segments.join('/');
			if (path) setLastOpenedScreen(path);
		} catch (e) { console.warn('[Layout] setLastOpenedScreen failed', e); }
	}, [segments, setLastOpenedScreen]);

	useEffect(() => {
		// @ts-ignore AppState may be missing in some RN type builds - use runtime require
		const AppState = (require('react-native') as any).AppState as { addEventListener: (t: string, cb: (s: string) => void) => { remove: () => void } } | undefined;
		if (!AppState?.addEventListener) return;
		const sub = AppState.addEventListener('change', (state: string) => {
			if (state === 'background') {
				try {
					import('@/lib/database/db').then(({ closeDb }) => {
						const t = setTimeout(() => {}, 0);
						closeDb().finally(() => clearTimeout(t));
					}).catch(() => {});
				} catch {}
			}
		});
		return () => sub.remove();
	}, []);

	return (
		<ErrorBoundary>
			<ThemeProvider value={navTheme}>
				<AnimatedSplashOverlay />
				<AppTabs />
			</ThemeProvider>
		</ErrorBoundary>
	);
}
