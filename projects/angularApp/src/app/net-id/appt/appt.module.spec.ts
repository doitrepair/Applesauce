import { ApptModule } from './appt.module';

describe('ApptModule', () => {
  let apptModule: ApptModule;

  beforeEach(() => {
    apptModule = new ApptModule();
  });

  it('should create an instance', () => {
    expect(apptModule).toBeTruthy();
  });
});
