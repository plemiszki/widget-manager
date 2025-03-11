interface Widget {
  id?: number;
  name: string;
  age: string;
}

interface WidgetErrors {
  name?: string;
  age?: string;
}

interface UserErrors {
  email?: string;
  password?: string;
}

export { Widget, WidgetErrors, UserErrors };
