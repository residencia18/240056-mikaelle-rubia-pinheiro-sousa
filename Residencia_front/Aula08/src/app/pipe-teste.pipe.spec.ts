import { PipeTestePipe } from './pipe-teste.pipe';

describe('PipeTestePipe', () => {
  it('create an instance', () => {
    const pipe = new PipeTestePipe();
    expect(pipe).toBeTruthy();
  });
});
