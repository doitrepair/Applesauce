import { CreateApptModule } from './create-appt.module';

describe('CreateApptModule', () => {
  let createApptModule: CreateApptModule;

  beforeEach(() => {
    createApptModule = new CreateApptModule();
  });

  it('should create an instance', () => {
    expect(createApptModule).toBeTruthy();
  });
});
