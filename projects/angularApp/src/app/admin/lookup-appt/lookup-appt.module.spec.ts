import { LookupApptModule } from './lookup-appt.module';

describe('LookupApptModule', () => {
  let lookupApptModule: LookupApptModule;

  beforeEach(() => {
    lookupApptModule = new LookupApptModule();
  });

  it('should create an instance', () => {
    expect(lookupApptModule).toBeTruthy();
  });
});
