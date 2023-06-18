import type { Preview } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
import { withRouter } from 'storybook-addon-react-router-v6';

import { store } from '../src/lib/stores/store'

import '../src/styles/index.sass'

const preview: Preview = {
  decorators: [
    withRouter,
    (Story) => (
      <ReduxProvider store={store}>
        <Story />
      </ReduxProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    reactRouter: {
      routePath: '/',
      routeParams: {},
    },
  },
}

export default preview
