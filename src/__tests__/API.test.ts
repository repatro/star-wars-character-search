import Joi from 'joi';

import { abortableFetch } from '../API';

describe('API', () => {
  const exampleSchema = Joi.object({
    field1: Joi.string().required(),
    field2: Joi.string().required(),
    field3: Joi.number()
  });

  const fakeFetch = jest.fn();
  window.fetch = fakeFetch;

  beforeEach(() => {
    fakeFetch.mockReset();
  });

  describe('abortableFetch', () => {
    it('should return result trimmed to schema', async () => {
      fakeFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ field1: 'val1', field2: 'val2', unknown: 'unknown' })
      });
      const { getData } = abortableFetch('https://exampleurl.com', exampleSchema);
      const result = await getData();
      expect(result).toEqual({ field1: 'val1', field2: 'val2' });
    });

    it('should throw error if required field is missing in result', async () => {
      fakeFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ field1: 'val1' })
      });
      const { getData } = abortableFetch('https://exampleurl.com', exampleSchema);
      await expect(getData()).rejects.toThrowError();
    });

    it('should use cache', async () => {
      const cacheMock = { 'https://exampleurl.com': { field1: 'val1', field2: 'val2' } };
      const { getData } = abortableFetch('https://exampleurl.com', exampleSchema, undefined, cacheMock);
      const result = await getData();
      expect(result).toEqual({ field1: 'val1', field2: 'val2' });
      expect(fakeFetch).not.toBeCalled();
    });

    it('should replace http with https', async () => {
      fakeFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ field1: 'val1', field2: 'val2' })
      });
      const { getData } = abortableFetch('http://exampleurl.com', exampleSchema);
      await getData();
      const calledUrl = fakeFetch.mock.calls[0][0];
      expect(calledUrl).toBe('https://exampleurl.com');
    });
  });
});
