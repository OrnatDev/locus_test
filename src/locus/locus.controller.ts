import { Controller, Get, Query, Request } from '@nestjs/common';
import { LocusService } from './locus.service';
import { Role } from 'src/enum/role.enum';
import * as jwt from 'jsonwebtoken';

@Controller('locus')
export class LocusController {
  constructor(private readonly locusService: LocusService) {}

  @Get()
  async getAllLocus(
    @Query('page') page: number = 1, 
    @Query('pageSize') pageSize: number = 2, 
    @Query('assemblyId') assemblyId: string,
    @Query('id') id: number,
    @Query('regionId') regionId: number,
    @Query('memberCount') memberCount: number,
    @Request() req) {

    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.decode(token) as { role: Role };
    const userRole: Role = decodedToken.role;
    
    return this.locusService.getAll(
      page, 
      pageSize, 
      userRole,
      assemblyId,
      id,
      regionId,
    );
  }
}
