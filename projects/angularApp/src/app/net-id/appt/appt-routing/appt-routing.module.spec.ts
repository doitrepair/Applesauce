import { ApptRoutingModule } from './appt-routing.module';

describe('ApptRoutingModule', () => {
  let apptRoutingModule: ApptRoutingModule;

  beforeEach(() => {
    apptRoutingModule = new ApptRoutingModule();
  });

  it('should create an instance', () => {
    expect(apptRoutingModule).toBeTruthy();
  });
});
