export type LocusPrismaType = {
  id: number;
  assembly_id: string;
  locus_name: string;
  public_locus_name: string;
  chromosome: string;
  strand: string;
  locus_start: number;
  locus_stop: number;
  member_count: number;
  locus_members: {
    id: number;
    urs_taxid: string;
    region_id: number;
    membership_status: string;
  }[];
};