import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.signal.finance',
  appName: 'Signal',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
}

export default config
