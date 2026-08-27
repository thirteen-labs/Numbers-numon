import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      // @ts-expect-error style array with conditional undefined handled by RN runtime
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'smallBold' ? styles.smallBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'linkPrimary' ? styles.linkPrimary : undefined,
        type === 'code' ? styles.code : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700' as const,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  title: {
    fontSize: 48,
    fontWeight: '600' as const,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600' as const,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fontWeight: (Platform.select({ ios: '500', android: '700', default: '500' }) ?? '500') as any,
    fontSize: 12,
  },
});
