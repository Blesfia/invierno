import { Controller, Main, IConfiguration, Get } from '../src';

@Controller('api/v1/status')
export class ControllerTest {
  @Get()
  public status() {
    return 'ok';
  }
}

@Main()
export class Application {
  public configure(): IConfiguration {
    return {
      logger: true,
    };
  }

  public start(configuration) {
    console.log('configuration: ', configuration);
  }
}
