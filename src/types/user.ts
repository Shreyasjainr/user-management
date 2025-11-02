export interface User {
  id: string;
  name: string;
  code?: string;
  countries: string[];
}

export interface Country {
  id: string;
  name: string;
}

export interface UserFormData {
  name: string;
  code?: string;
  countries: string[];
}