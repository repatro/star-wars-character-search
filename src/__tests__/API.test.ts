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
});
