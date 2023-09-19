import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.adminGuard';
import { UserService } from './user.service';

@UseGuards(AdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list-user')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
