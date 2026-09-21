export type FieldValues = Record<string, string>;

export interface MemberEntry {
  id: string;
  values: FieldValues;
}

export interface ApplicationState {
  /** Selected pricing-row label — Family only (e.g. "Preferred"). */
  familyPlanId: string | null;
  applicant: FieldValues;
  members: MemberEntry[];
}
