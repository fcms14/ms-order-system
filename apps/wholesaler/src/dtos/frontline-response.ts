export interface FrontlineResponse {
  id: string;
  name: string;
  wholesaler: string;
  packageNumber: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | undefined;
}