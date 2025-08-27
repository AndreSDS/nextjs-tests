import React from 'react'
import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'
import './storybook.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'ffffff' }
      ],
      default: 'light'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [(Story) => (<Story />)]
};

export default preview;