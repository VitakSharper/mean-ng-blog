export interface Post {
  id: string;
  title: string;
  imagePath?: string;
  content: string;
  updatedAt?: string;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
}
