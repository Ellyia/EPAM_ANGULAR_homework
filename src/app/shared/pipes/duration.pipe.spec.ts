import { FormatDurationPipe } from './duration.pipe';

describe('FormatDurationPipe', () => {
  let pipe: FormatDurationPipe;

  beforeEach(() => {
    pipe = new FormatDurationPipe();
  });

  it('transforms duration more, than 60 min correctly', () => {
    const duration = 65;
    const transformed = pipe.transform(duration);
    expect(transformed).toBe('01h 05min');
  });

  it('transforms duration less, than 60 min correctly', () => {
    const duration = 55;
    const transformed = pipe.transform(duration);
    expect(transformed).toBe('55min');
  });

  it('transforms duration in 60 min correctly', () => {
    const duration = 60;
    const transformed = pipe.transform(duration);
    expect(transformed).toBe('01h 00min');
  });

  it('returns empty value when duration is not provided', () => {
    const transformed = pipe.transform(undefined, 'empty');
    expect(transformed).toBe('empty');
  });

  it('returns empty string when emptyValue is not provided', () => {
    const transformed = pipe.transform(undefined);
    expect(transformed).toBe('');
  });
});
