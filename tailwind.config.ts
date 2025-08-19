
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	safelist: [
		{ pattern: /bg-brand-(dark-cyan|white|apricot|tangerine|jasper)-(100|200|300|400|500|600|700|800|900)/ },
		{ pattern: /text-brand-(dark-cyan|white|apricot|tangerine|jasper)-(100|200|300|400|500|600|700|800|900)/ },
		{ pattern: /border-brand-(dark-cyan|white|apricot|tangerine|jasper)-(100|200|300|400|500|600|700|800|900)/ },
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
					brand: {
						'dark-cyan': {
							DEFAULT: '#588b8b',
							'100': '#121c1c',
							'200': '#243838',
							'300': '#365454',
							'400': '#487070',
							'500': '#588b8b',
							'600': '#76a7a7',
							'700': '#98bdbd',
							'800': '#bbd3d3',
							'900': '#dde9e9'
						},
						white: {
							DEFAULT: '#ffffff',
							'100': '#333333',
							'200': '#666666',
							'300': '#999999',
							'400': '#cccccc',
							'500': '#ffffff',
							'600': '#ffffff',
							'700': '#ffffff',
							'800': '#ffffff',
							'900': '#ffffff'
						},
						apricot: {
							DEFAULT: '#ffd5c2',
							'100': '#5a1c00',
							'200': '#b43900',
							'300': '#ff5b0e',
							'400': '#ff9868',
							'500': '#ffd5c2',
							'600': '#ffdece',
							'700': '#ffe6da',
							'800': '#ffeee7',
							'900': '#fff7f3'
						},
						tangerine: {
							DEFAULT: '#f28f3b',
							'100': '#391c04',
							'200': '#713907',
							'300': '#aa550b',
							'400': '#e2710e',
							'500': '#f28f3b',
							'600': '#f5a662',
							'700': '#f7bd89',
							'800': '#fad3b0',
							'900': '#fce9d8'
						},
						jasper: {
							DEFAULT: '#c8553d',
							'100': '#29100b',
							'200': '#512117',
							'300': '#7a3122',
							'400': '#a2412e',
							'500': '#c8553d',
							'600': '#d37663',
							'700': '#de988a',
							'800': '#e9bab1',
							'900': '#f4ddd8'
						}
					}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
