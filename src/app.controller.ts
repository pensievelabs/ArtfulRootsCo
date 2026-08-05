import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('worksheets')
  @Redirect('/clean-reader-worksheets', 301)
  getWorksheetsRedirect() {}
}
