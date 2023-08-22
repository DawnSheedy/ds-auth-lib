/**
 * Auth Token for a user
 */
export interface AuthToken {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  permissions: string[];
}
