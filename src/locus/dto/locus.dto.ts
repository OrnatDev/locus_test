import { LocusMemberDto } from "./locus.members.dto";

export class LocusDto {
  id: number;
  assemblyId: string;
  locusName: string;
  publicLocusName: string;
  chromosome: string;
  strand: string;
  locusStart: number;
  locusStop: number;
  memberCount: number;
  locusMembers: LocusMemberDto[];
}