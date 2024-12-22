// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes:
    {
      light:
      {
        colors: {
          'text': '#05210f',         // Dark greenish-gray for readable text
          'background': '#f7fcfb',   // Very light mint green for a clean background
          'primary': '#2596be',      // Deep teal-green for primary actions
          'secondary': '#246a80',    // Darker soft pastel green for secondary elements
          'accent': '#3d9c7a',       // Darker vibrant sea green for interactive or highlighted elements
          'muted': '#eaf4f1',        // Very pale green for less prominent areas
          'error': '#ff6b6b',        // Soft red for errors or alerts
          'success': '#28b487',      // Gentle green for success indicators
          'info': '#56c29b',         // Bright greenish-aqua for informational highlights
          'highlight': '#f0fbf7',    // Pale mint green for background highlights
        },
      }
    }
  }
})
