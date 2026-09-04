import { useEffect, useRef } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, router, useSegments } from 'expo-router';
import { Platform, useColorScheme, View } from 'react-native';
// @ts-ignore - types may vary by expo-router version, but runtime export exists
import * as SplashScreenModule from 'expo-splash-screen';

// Web only: load CSS vars (native would crash without NativeWind)
if (Platform.OS === 'web') {
  try { require('@/global.css'); } catch {}
}

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ErrorBoundary } from '@/components/error-boundary';
import AppTabs from '@/components/app-tabs';
import { useAppStore } from '@/lib/store';
import { isOnboardingDone } from '@/lib/storage';
import { registerGlobalErrorHandler } from '@/lib/error-handler';

// Keep native splash visible until JS is ready — prevents white flash / race with AnimatedSplashOverlay.
const SplashScreen: any = (SplashScreenModule as any).default ?? SplashScreenModule;
try { SplashScreen.preventAutoHideAsync?.()?.catch(() => {}); } catch {}

// Gesture handler fallback — if native module missing, use View to avoid crash
let GestureHandlerRootView: any = View;
try {
  const gh = require('react-native-gesture-handler') as any;
  if (gh?.GestureHandlerRootView) GestureHandlerRootView = gh.GestureHandlerRootView;
} catch {}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { theme, setLastOpenedScreen, setOnboarded } = useAppStore();
	const segments = useSegments();
	const hasRedirected = useRef(false);
	const hasHiddenSplash = useRef(false);

	const resolvedTheme = theme === 'system' ? colorScheme ?? 'light' : theme;
	const navTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme;

	useEffect(() => {
		try { registerGlobalErrorHandler(); } catch (e) { console.warn('[Layout] registerGlobalErrorHandler failed', e); }
	}, []);

	// Hide native splash once JS is ready (with fallback timeout)
	useEffect(() => {
		if (hasHiddenSplash.current) return;
		hasHiddenSplash.current = true;
		const t = setTimeout(() => {
			try { SplashScreen.hideAsync?.()?.catch(() => {}); } catch {}
		}, 300);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		// Delay redirect until next tick — prevents "has not completed initialization" crash
		if (hasRedirected.current) return;
		const timer = setTimeout(() => {
			let done = false;
			try { done = isOnboardingDone(); } catch (e) { console.warn('[Layout] isOnboardingDone failed', e); done = false; }
			setOnboarded(done);
			if (!done) {
				const current = segments.join('/');
				if (!current.includes('onboarding')) {
					hasRedirected.current = true;
					try { router.replace('/onboarding' as any); } catch (e) { console.warn('[Layout] router.replace failed', e); }
				}
			}
		}, 400);
		return () => clearTimeout(timer);
		// run once on mount; segments intentionally not dep to avoid loop
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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ErrorBoundary>
				<ThemeProvider value={navTheme}>
					<AnimatedSplashOverlay />
					<AppTabs />
				</ThemeProvider>
			</ErrorBoundary>
		</GestureHandlerRootView>
	);
}
