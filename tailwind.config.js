module.exports = {
    purge: {
      enabled: true,
      mode: "all",
      content: ["./src/**/*.ts", "./src/**/*.tsx"],
      whitelist: ["body", "html", "svg"],
      whitelistPatterns: [],
    },
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
    theme: {
      darkSelector: '.dark-mode',
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        header: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      extend: {
        colors: {
          primary: {
            lighter: '#4FD1C5',
            default: '#38B2AC',
            darker: '#319795',
          },
          secondary: {
            lighter: '#63B3ED',
            default: '#4299E1',
            darker: '#3182CE',
          },
          backgroundImage: theme => ({
            'top-wave': "url('/public/top-wave.svg')",
          }),
          keyframes: {
            'fade-in-down': {
              '0%': {
                opacity: '0',
                transform: 'translateY(-10px)'
              },
              '100%': {
                opacity: '1',
                transform: 'translateY(0)'
              },
            }
          },
          animation: {
            'fade-in-down': 'fade-in-down 0.5s ease-out'
          }
        },
      },
    },
    variants: {
      backgroundColor: ['dark', 'responsive', 'hover', 'focus'],
      borderColor: [
        'responsive',
        'hover',
        'focus',
        'focus-within',
      ],
      borderWidth: ['dark', 'responsive'],
      textColor: ['dark', 'responsive', 'hover', 'focus'],
    },
    corePlugins: {},
    plugins: [
  
      require('@tailwindcss/custom-forms'),
    ],
  }