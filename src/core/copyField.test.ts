import { copyField } from './copyField';

import { Field } from './Field';

import { fieldGenerator } from './__mocks__/Field';

describe('Check copyField', () => {
  it('Object.is should be different, data is the same', () => {
    const prevField = fieldGenerator(9) as Field;

    const nextField = copyField(prevField);

    // copy links (pointer in memory)
    expect(prevField).not.toBe(nextField);
    // compare structure and data
    expect(prevField).toEqual(nextField);
  });
});