export class AgencyDeviation {
  constructor(
    public id: number,
    public agency_id: number,
    public regulation_part : string,
    public section: string,
    public language: string,
    public updatedAt: Date,
    public createdAt: Date
  ) {}
}