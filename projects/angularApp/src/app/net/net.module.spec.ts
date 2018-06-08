import { NetModule } from './net.module';

describe('NetModule', () => {
  let netModule: NetModule;

  beforeEach(() => {
    netModule = new NetModule();
  });

  it('should create an instance', () => {
    expect(netModule).toBeTruthy();
  });
});
