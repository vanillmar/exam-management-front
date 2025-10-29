

export type Profile = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;
  nationalId: string;
  contactInfo?: ContactInfo;
  address?: Address;
  bio: string;
  notifications: boolean;
};


