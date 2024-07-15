import { generateApiResponse, IResponseImage } from '../pages/api/generateApiResponse'
import mockApiData from './mock-data/mock-api-unsplash.json'
import mockApiResponse from './mock-data/mock-api-response.json'

describe('generateApiResponse', () => {
    it('should return the correct response when dataResponse is provided', () => {
        const mockDataResponse = mockApiData
        const expectedResponse: IResponseImage[] = mockApiResponse.results
        const result = generateApiResponse(mockDataResponse)
        expect(result).toEqual(expectedResponse)
    })
})
