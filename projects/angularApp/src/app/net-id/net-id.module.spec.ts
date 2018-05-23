import { NetIdModule } from './net-id.module';

describe('NetIdModule', () => {
  let netIdModule: NetIdModule;

  beforeEach(() => {
    netIdModule = new NetIdModule();
  });

  it('should create an instance', () => {
    expect(netIdModule).toBeTruthy();
  });
});
