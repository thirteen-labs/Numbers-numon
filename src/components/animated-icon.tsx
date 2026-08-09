import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = 1.5;
const DURATION = 600;
const FALLBACK_TIMEOUT = DURATION + 500;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, FALLBACK_TIMEOUT);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
		0: {
			transform: [{ scale: INITIAL_SCALE_FACTOR }],
			opacity: 1,
		},
		20: {
			opacity: 1,
		},
		70: {
			opacity: 0,
			easing: Easing.elastic(0.7),
		},
		100: {
			opacity: 0,
			transform: [{ scale: 1 }],
			easing: Easing.elastic(0.7),
		},
	});

	return (
		<Animated.View
			entering={splashKeyframe.duration(DURATION).withCallback((finished: boolean) => {
				'worklet';
				if (finished) {
					scheduleOnRN(setVisible, false);
				}
			})}
			style={styles.backgroundSolidColor}
		/>
	);
}

const keyframe = new Keyframe({
	0: {
		transform: [{ scale: INITIAL_SCALE_FACTOR }],
	},
	100: {
		transform: [{ scale: 1 }],
		easing: Easing.elastic(0.7),
	},
});

const logoKeyframe = new Keyframe({
	0: {
		transform: [{ scale: 1.3 }],
		opacity: 0,
	},
	20: {
		transform: [{ scale: 1.3 }],
		opacity: 0,
		easing: Easing.elastic(0.7),
	},
	40: {
		opacity: 0,
	},
	100: {
		opacity: 1,
		transform: [{ scale: 1 }],
		easing: Easing.elastic(0.7),
	},
});

const glowKeyframe = new Keyframe({
	0: {
		transform: [{ rotateZ: '0deg' }],
	},
	100: {
		transform: [{ rotateZ: '7200deg' }],
	},
});

export function AnimatedIcon() {
	return (
		<View style={styles.iconContainer}>
			<Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
				<Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
			</Animated.View>

			<Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
			<Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
				<Image style={styles.image} source={require('@/assets/images/icon.png')} />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	glow: {
		width: 201,
		height: 201,
		position: 'absolute',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 128,
		height: 128,
		zIndex: 100,
	},
	image: {
		position: 'absolute',
		width: 64,
		height: 64,
		borderRadius: 16,
	},
	background: {
		borderRadius: 40,
		experimental_backgroundImage: `linear-gradient(180deg, #7C3AED, #4F46E5)`,
		width: 128,
		height: 128,
		position: 'absolute',
	},
	backgroundSolidColor: {
		...StyleSheet.absoluteFill,
		backgroundColor: '#6D28D9',
		zIndex: 1000,
	},
});
