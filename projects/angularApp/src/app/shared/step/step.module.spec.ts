import { StepModule } from './forms.module';

describe('StepModule', () => {
  let formsModule: StepModule;

  beforeEach(() => {
    formsModule = new StepModule();
  });

  it('should create an instance', () => {
    expect(formsModule).toBeTruthy();
  });
});
