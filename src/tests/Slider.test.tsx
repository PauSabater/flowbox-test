import { Slider } from '../components/Slider/Slider'
import React from 'react'
const render = require('@testing-library/react').render
const fireEvent = require('@testing-library/react').fireEvent
// import { render, fireEvent } from '@testing-library/react'
import mockupApiResponse from './mockup-data/mockup-api-response.json'
import { Provider } from 'react-redux' // Import Provider from react-redux
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);
const store = mockStore({
  app: {
    displayStyle: 'slider' // Mock initial state as needed
  }
  // Add other slices of state as needed
})

describe('Slider Component', () => {
    it('should update currentSlideNumber on range change', () => {

        const { container } = render(
            <Provider store={store}>
                <Slider apiResponse={mockupApiResponse.results} />
            </Provider>
        )

        // Trigger a range change (example with Controls component interaction)
        const rangeValue = '2' // Simulating range change to index 2
        const rangeInput = container.querySelector('input[type="range"]')

        if (rangeInput) {
            fireEvent.change(rangeInput, { target: { value: rangeValue } })
        }

        console.log('HEY IN TEST!!')
        console.log(container.innerHTML)

        // Assert currentSlideNumber is updated
        // expect(container.querySelector('.current-slide').textContent).toBe('2');
      })

})
