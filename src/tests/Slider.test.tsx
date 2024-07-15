import { Slider } from '../components/Slider/Slider'
const render = require('@testing-library/react').render
import mockupApiResponse from './mock-data/mock-api-response.json'
import { Provider } from 'react-redux' // Import Provider from react-redux
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);
const store = mockStore({
    app: {
        displayStyle: 'slider'
    }
})

describe('Slider Component', () => {
    it('should render the corresponding number of cards with the correct image', () => {

        const { container } = render(
            <Provider store={store}>
                <Slider apiResponse={mockupApiResponse.results} />
            </Provider>
        )

        const elsCards: NodeListOf<HTMLDivElement> = container.querySelectorAll('div[data-card')
        expect(Array.from(elsCards).length).toBe(3)

        // checks the correct src of the images:
        for (const [i, elCard] of Array.from(elsCards).entries()) {
            const srcImage = elCard.querySelector('img')?.src || ''
            expect(srcImage).toBe(mockupApiResponse.results[i].urlMedium)
        }
    })
})

