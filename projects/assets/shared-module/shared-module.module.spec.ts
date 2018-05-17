import { SharedModule } from './shared-module.module';

describe('SharedModuleModule', () => {
  let SharedModule: SharedModuleModule;

  beforeEach(() => {
    SharedModule = new SharedModuleModule();
  });

  it('should create an instance', () => {
    expect(SharedModule).toBeTruthy();
  });
});
