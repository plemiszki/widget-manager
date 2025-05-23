interface Widget {
  id?: number;
  name: string;
  age: string;
}

interface WidgetErrors {
  name?: string[];
  age?: string[];
}

interface User {
  id?: number;
  email: string;
  password: string;
}

interface UserErrors {
  emailAddress?: string[];
  password?: string[];
}

interface LoginErrors {
  credentials?: boolean;
}

export { Widget, WidgetErrors, User, UserErrors, LoginErrors };
