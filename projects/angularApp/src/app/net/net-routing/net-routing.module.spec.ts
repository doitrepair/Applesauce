import { NetRoutingModule } from './net-routing.module';

describe('NetRoutingModule', () => {
  let netRoutingModule: NetRoutingModule;

  beforeEach(() => {
    netRoutingModule = new NetRoutingModule();
  });

  it('should create an instance', () => {
    expect(netRoutingModule).toBeTruthy();
  });
});
