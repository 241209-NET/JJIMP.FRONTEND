export enum IssueStatus {
  Inactive = "Inactive",
  Active = "Active",
  Review = "Review",
  Complete = "Complete",
}

export const mapIssueStatus = (status: number): IssueStatus => {
  const statusMap: { [key: number]: IssueStatus } = {
    0: IssueStatus.Inactive,
    1: IssueStatus.Active,
    2: IssueStatus.Review,
    3: IssueStatus.Complete,
  };
  return statusMap[status] || IssueStatus.Inactive; // Default to Inactive if undefined
};

export const mapStatusToNumber = (status: IssueStatus): number => {
  const statusMap: Record<IssueStatus, number> = {
    [IssueStatus.Inactive]: 0,
    [IssueStatus.Active]: 1,
    [IssueStatus.Review]: 2,
    [IssueStatus.Complete]: 3,
  };
  return statusMap[status] ?? 0; // Default to 0 (Inactive) if status is invalid
};
