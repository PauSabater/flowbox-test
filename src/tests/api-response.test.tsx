import { generateApiResponse, IResponseImage } from '../pages/api/generateApiResponse'
import mockApiData from './mock-data/mock-api-unsplash.json'
import mockApiResponse from './mock-data/mock-api-response.json'

describe('generateApiResponse', () => {
  it('should return an empty response when dataResponse is null', () => {
      const result = generateApiResponse(null)
      expect(result).toEqual(new Response(JSON.stringify({})))
  })

  it('should return the correct response when dataResponse is provided', () => {
    const mockDataResponse = mockApiData
    const expectedResponse: IResponseImage[] = mockApiResponse.results
    const result = generateApiResponse(mockDataResponse)
    expect(result).toEqual(expectedResponse)
  })
})
