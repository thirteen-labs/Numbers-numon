declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.css' {}
declare module '*.png' { const value: number; export default value; }

declare module 'react-native' {
  import type { ReactNode, ComponentType } from 'react';
  export type ColorValue = string;
  export interface ViewStyle { [key: string]: any }
  export interface TextStyle { [key: string]: any }
  export interface ImageStyle { [key: string]: any }
  export type StyleProp<T> = T | T[] | undefined;

  export interface GestureResponderEvent { preventDefault(): void; }

  export interface ViewProps { style?: StyleProp<ViewStyle>; children?: ReactNode; }
  export const View: ComponentType<ViewProps>;

  export interface TextProps { style?: StyleProp<TextStyle>; children?: ReactNode; numberOfLines?: number; onPress?: () => void; }
  export const Text: ComponentType<TextProps>;

  export interface ScrollViewProps { style?: StyleProp<ViewStyle>; contentContainerStyle?: StyleProp<ViewStyle>; contentInset?: { top?: number; bottom?: number; left?: number; right?: number }; children?: ReactNode; horizontal?: boolean; pagingEnabled?: boolean; showsHorizontalScrollIndicator?: boolean; onMomentumScrollEnd?: (event: any) => void; ref?: any; }
  export const ScrollView: ComponentType<ScrollViewProps>;

  export interface PressableProps { onPress?: ((event: GestureResponderEvent) => void); style?: ((state: { pressed: boolean }) => StyleProp<ViewStyle>) | StyleProp<ViewStyle>; children?: ReactNode | ((state: { pressed: boolean }) => ReactNode); disabled?: boolean; }
  export const Pressable: ComponentType<PressableProps>;

  export const StyleSheet: { create: <T>(styles: T) => T; absoluteFill: ViewStyle; hairlineWidth: number; };
  export const Platform: { OS: string; select: <T>(spec: { default?: T; ios?: T; android?: T; web?: T }) => T; };
  export const Dimensions: { get: (dim: 'window' | 'screen') => { width: number; height: number; scale: number } };
  export const Alert: { alert: (title: string, message?: string, buttons?: { text: string; style?: string; onPress?: () => void }[]) => void };

  export function useColorScheme(): 'light' | 'dark' | 'unspecified';

  export interface FlatListProps<T> { data: T[]; renderItem: (info: { item: T; index: number }) => ReactNode; style?: StyleProp<ViewStyle>; keyExtractor?: (item: T, index: number) => string; contentContainerStyle?: StyleProp<ViewStyle>; ItemSeparatorComponent?: ComponentType<any>; }
  export class FlatList<T = any> extends React.Component<FlatListProps<T>> {}

  export interface SwitchProps { value?: boolean; onValueChange?: (value: boolean) => void; trackColor?: { false: string; true: string }; }
  export const Switch: ComponentType<SwitchProps>;

  export interface TextInputProps { value?: string; onChangeText?: (text: string) => void; placeholder?: string; autoCapitalize?: string; style?: StyleProp<TextStyle>; keyboardType?: string; multiline?: boolean; autoFocus?: boolean; placeholderTextColor?: string; textAlignVertical?: string; onSelectionChange?: (event: any) => void; }
  export const TextInput: ComponentType<TextInputProps>;

  export type ImageSourcePropType = number | { uri: string };
}
declare module 'react-native-safe-area-context' {
  import type { ComponentType, ReactNode } from 'react';
  export function useSafeAreaInsets(): { top: number; bottom: number; left: number; right: number };
  export const SafeAreaProvider: ComponentType<{ children: ReactNode }>;
}
declare module 'react-native-screens' {}
declare module 'react-native-web' {}
declare module 'react-native-gesture-handler' {}
declare module 'react-native-svg' {
  import type { ComponentType, ReactNode } from 'react';
  interface SvgProps { viewBox?: string; width?: number | string; height?: number | string; children?: ReactNode; style?: any; }
  export default function Svg(props: SvgProps): any;
  export function Circle(props: Record<string, any>): any;
  export function Line(props: Record<string, any>): any;
  export function Rect(props: Record<string, any>): any;
  export function Text(props: Record<string, any>): any;
}
declare module 'react-native-worklets' {
  export function scheduleOnRN(cb: (...args: any[]) => void, ...args: any[]): void;
}
declare module 'zustand' {
  type SetState<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;
  type GetState<T> = () => T;
  type StoreApi<T> = { setState: SetState<T>; getState: GetState<T> };
  export function create<T>(initializer: (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T): { (): T; <U>(selector: (state: T) => U): U };
}
declare module 'react-native-mmkv' {
  export function createMMKV(config?: { id?: string; path?: string; encryptionKey?: string }): { getString: (key: string) => string | undefined; getBoolean: (key: string) => boolean | undefined; set: (key: string, value: string | boolean | number) => void; delete: (key: string) => void; clearAll: () => void; };
}
declare module 'expo-router' {
  import type { ComponentType, ReactNode } from 'react';
  export interface Router { push: (href: string) => void; back: () => void; replace: (href: string) => void; }
  export const router: Router;
  export const Link: ComponentType<{ href: string; target?: string; onPress?: (event: any) => void; children?: ReactNode; style?: any }>;
  export function useFocusEffect(callback: () => void | (() => void)): void;
  export function useLocalSearchParams<T = Record<string, string>>(): T;
  export function useSegments(): string[];
  export function usePathname(): string;
  export type Href = string;
  export const DarkTheme: { colors: { [key: string]: string } };
  export const DefaultTheme: { colors: { [key: string]: string } };
  export const ThemeProvider: ComponentType<{ children: ReactNode; value: any }>;
}
declare module 'expo-router/unstable-native-tabs' {
  import type { ComponentType, ReactNode } from 'react';
  export const NativeTabs: ComponentType<{ backgroundColor?: string; indicatorColor?: string; labelStyle?: any; children?: ReactNode }> & {
    Trigger: ComponentType<{ name: string; children?: ReactNode; href?: string }> & {
      Label: ComponentType<{ children?: ReactNode }>;
      Icon: ComponentType<{ src?: any; renderingMode?: string; focused?: boolean }>;
    };
  };
}
declare module 'expo-router/ui' {
  import type { ComponentType, ReactNode } from 'react';
  export const Tabs: ComponentType<{ children?: ReactNode; style?: any }>;
  export const TabList: ComponentType<{ children?: ReactNode; style?: any; asChild?: boolean }>;
  export const TabTrigger: ComponentType<{ children?: ReactNode; name: string; href?: string; asChild?: boolean; style?: any }>;
  export const TabSlot: ComponentType<{ style?: any }>;
  export type TabTriggerSlotProps = { href?: string; isFocused?: boolean; children?: ReactNode; style?: any; onPress?: (e: any) => void };
  export type TabListProps = { children?: ReactNode; style?: any };
  export type TabListProps = { children?: ReactNode; style?: any };
}
declare module 'expo-sqlite' {
  export interface SQLiteDatabase {
    execAsync(sql: string): Promise<void>;
    closeAsync(): Promise<void>;
    runAsync(sql: string, ...params: any[]): Promise<any>;
    getAllAsync<T = any>(sql: string, ...params: any[]): Promise<T[]>;
    getFirstAsync<T = any>(sql: string, ...params: any[]): Promise<T | null>;
  }
  export function openDatabaseAsync(name: string): Promise<SQLiteDatabase>;
}
declare module 'react-native-reanimated' {
  import type { ComponentType } from 'react';
  const Animated: { View: ComponentType<{ entering?: any; style?: any; children?: any }> };
  export const Easing: { elastic: (bounciness: number) => any };
  export class Keyframe { constructor(defs: Record<string, any>); duration(ms: number): { withCallback: (cb: (finished: boolean) => void) => any }; }
  export const FadeIn: { duration: (ms: number) => any };
  export default Animated;
}
declare module 'expo-web-browser' {
  export const WebBrowserPresentationStyle: { AUTOMATIC: string };
  export function openBrowserAsync(url: string, options?: { presentationStyle?: string }): Promise<void>;
}
declare module 'expo-symbols' {
  import type { ComponentType } from 'react';
  export const SymbolView: ComponentType<{ name: { ios: string; android: string; web: string }; size?: number; weight?: string; tintColor?: string; style?: any }>;
}
declare module 'expo-document-picker' {
  export function getDocumentAsync(options: { type?: string | string[] }): Promise<{ canceled: boolean; assets?: { uri: string; name?: string; size?: number }[] }>;
}
declare module 'expo-file-system' {
  export class File { constructor(uri: string); text(): Promise<string>; write(content: string): Promise<void>; }
  export const Paths: { cache: string };
}
declare module 'expo-image' {
  import type { ComponentType } from 'react';
  export const Image: ComponentType<{ source: any; style?: any }>;
}
declare module 'expo-notifications' {
  export function setNotificationHandler(handler: { handleNotification: () => Promise<{ shouldShowAlert?: boolean; shouldPlaySound?: boolean; shouldSetBadge?: boolean; shouldShowBanner?: boolean; shouldShowList?: boolean }> }): void;
  export function getPermissionsAsync(): Promise<{ granted: boolean; status: string }>;
  export function requestPermissionsAsync(): Promise<{ granted: boolean; status: string }>;
  export function scheduleNotificationAsync(options: any): Promise<string>;
  export function cancelScheduledNotificationAsync(id: string): Promise<void>;
  export function cancelAllScheduledNotificationsAsync(): Promise<void>;
  export function setNotificationCategoryAsync(id: string, actions: any[]): Promise<void>;
  export const SchedulableTriggerInputTypes: { DAILY: string };
  export type NotificationPermissionsStatus = { granted: boolean; status: string };
}
declare module 'expo-constants' {}
declare module 'expo-device' {}
declare module 'expo-font' {}
declare module 'expo-linking' {}
declare module 'expo-splash-screen' {}
declare module 'expo-status-bar' {}
declare module 'expo-system-ui' {}
declare module 'expo-glass-effect' {}
declare module '@expo/ui' {}
declare module '@hookform/resolvers' {}
declare module 'react-hook-form' {}
declare module 'expo/package.json' { export const version: string; }
declare module '*.module.css' { const classes: { readonly [key: string]: string }; export default classes; }

declare namespace NodeJS { interface ProcessEnv { EXPO_OS?: string } }
declare const process: { env: NodeJS.ProcessEnv };
declare const crypto: { randomUUID: () => string };
declare var require: (module: string) => any;
