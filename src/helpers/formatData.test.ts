import { formatDate } from './formatData';

describe('formatDate', () => {
    it('correctly formats a valid date string', () => {
        const dateString = '2023-04-15';
        const expectedDate = '15 апреля 2023 г.';
        const result = formatDate(dateString);
        expect(result).toEqual(expectedDate);
    });

    it('returns "Invalid Date" for an invalid date string', () => {
        const invalidDateString = 'invalid date';
        const result = formatDate(invalidDateString);
        expect(result).toEqual('Invalid Date');
    });

    it('returns "Invalid Date" for an empty string', () => {
        const emptyDateString = '';
        const result = formatDate(emptyDateString);
        expect(result).toEqual('Invalid Date');
    });
});