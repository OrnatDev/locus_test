import { Injectable } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
import { PrismaService } from 'src/prisma.service';
import { LocusDto } from './dto/locus.dto';
import { LocusPrismaType } from 'src/types/locus.type';

@Injectable()
export class LocusService {
  constructor(private prisma: PrismaService) {}

  async getAll(
    page: number,
    pageSize: number,
    userRole: Role,
    assemblyId?: string,
    id?: number,
    regionId?: number,
  ): Promise<LocusDto[]> {
    try {
      let include = {};
      let where = {};

      const skip = (page - 1) * pageSize;
      const take = +pageSize;

      if (id !== undefined) {
        where = { ...where, id: +id };
      }

      if (assemblyId !== undefined) {
        where = { ...where, assembly_id: assemblyId };
      }

      if (regionId !== undefined) {
        include = {
          ...include,
          locus_members: {
            where: {
              region_id: +regionId,
            },
          },
        };
      }

      if (userRole === Role.Admin) {
        include = { ...include, locus_members: true };
      }

      const data = await this.prisma.rnc_locus.findMany({
        skip,
        take,
        include,
        where,
      });

      return data.map((locus: LocusPrismaType) => ({
        id: locus.id,
        assemblyId: locus.assembly_id,
        locusName: locus.locus_name,
        publicLocusName: locus.public_locus_name,
        chromosome: locus.chromosome,
        strand: locus.strand,
        locusStart: locus.locus_start,
        locusStop: locus.locus_stop,
        memberCount: locus.member_count,
        locusMembers: locus.locus_members?.map((member) => ({
          id: member.id,
          ursTaxid: member.urs_taxid,
          regionId: member.region_id,
          membershipStatus: member.membership_status,
        })) || [],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
