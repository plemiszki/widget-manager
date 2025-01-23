interface Widget {
  id?: number;
  name: string;
  age: string;
}

interface WidgetErrors {
  name?: string;
  age?: string;
}

export { Widget, WidgetErrors };
