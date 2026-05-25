export interface ThemeColors {
  primary: string; // Main accent color
  primaryForeground: string; // Text on primary
  background: string; // Page background
  foreground: string; // Main text color
  muted: string; // Muted background
  mutedForeground: string; // Muted text
  border: string; // Border color
  card: string; // Card background
}

export function getThemeColors(): ThemeColors {
  return {
    primary: 'oklch(0.55 0.08 230)', // Soft medium blue
    primaryForeground: 'oklch(0.98 0.005 230)', // Almost white
    background: 'oklch(0.98 0.005 230)', // Very pale blue-white
    foreground: 'oklch(0.25 0.02 240)', // Deep blue-grey
    muted: 'oklch(0.92 0.01 230)', // Muted blue-grey
    mutedForeground: 'oklch(0.50 0.03 240)', // Medium grey-blue
    border: 'oklch(0.90 0.01 230)', // Soft blue border
    card: 'oklch(0.99 0.003 230)', // Almost white with blue hint
  };
}

// Convert OKLCH to approximate hex for email clients
export function getEmailSafeColors(): Record<string, string> {
  return {
    primary: '#5b7fa8', // Soft medium blue
    primaryForeground: '#fafbfc', // Almost white
    background: '#fafbfc', // Very pale blue-white
    foreground: '#3a3f50', // Deep blue-grey
    muted: '#e6e9f0', // Muted blue-grey
    mutedForeground: '#6b7280', // Medium grey-blue
    border: '#d9dde8', // Soft blue border
    card: '#fcfdfe', // Almost white with blue hint
  };
}
