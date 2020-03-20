/**
 * Data Types
 */

export interface IUser {
  id: number;
  name: string;
  email: string;
  provider: boolean;
  avatar?: {
    id?: number;
    url?: string;
    path?: string;
  };
}

/**
 * State Types
 */

export interface ProfileState {
  user?: IUser;
}
