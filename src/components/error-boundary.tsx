import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error, errorInfo: null };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ error, errorInfo });
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	handleReload = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	render() {
		if (this.state.hasError) {
			return <ErrorFallbackContent info={this.state} onReload={this.handleReload} />;
		}
		return this.props.children;
	}
}

function ErrorFallbackContent({
	info,
	onReload,
}: {
	info: State;
	onReload: () => void;
}) {
	const insets = useSafeAreaInsets();
	const theme = useTheme();

	return (
		<ThemedView style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={[styles.inner, { paddingBottom: insets.bottom + Spacing.four }]}>
				<ThemedText type="subtitle" style={styles.title}>
					Something went wrong
				</ThemedText>
				<ThemedText type="small" style={styles.message}>
					The app encountered an unexpected error. Your data is safe.
				</ThemedText>
				{__DEV__ && info.error ? (
					<ThemedText type="small" style={styles.errorText}>
						{info.error.message}
					</ThemedText>
				) : null}
				<Pressable onPress={onReload} style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}>
					<ThemedText type="smallBold" themeColor="background">
						Try Again
					</ThemedText>
				</Pressable>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		maxWidth: MaxContentWidth,
		marginHorizontal: 'auto',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Spacing.four,
		gap: Spacing.three,
	},
	title: {
		fontSize: 28,
		textAlign: 'center',
	},
	message: {
		textAlign: 'center',
		opacity: 0.7,
	},
	errorText: {
		textAlign: 'center',
		color: '#ff4444',
		fontFamily: 'monospace',
	},
	button: {
		backgroundColor: '#0a7ea4',
		paddingVertical: Spacing.two,
		paddingHorizontal: Spacing.five,
		borderRadius: Spacing.three,
		marginTop: Spacing.two,
	},
});
