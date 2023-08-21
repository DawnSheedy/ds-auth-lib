/**
 * Auth Token for a user
 */
export interface AuthToken {
  userId: string;
  firstName: string;
  lastName: string;
  permissions: number[];
}
