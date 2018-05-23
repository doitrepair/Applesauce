import { RepairModule } from './repair.module';

describe('RepairModule', () => {
  let repairModule: RepairModule;

  beforeEach(() => {
    repairModule = new RepairModule();
  });

  it('should create an instance', () => {
    expect(repairModule).toBeTruthy();
  });
});
