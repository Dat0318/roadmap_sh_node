interface GenericInterface<T> {
  field: T;
  setField(field: T): void;
  getField(): T;
}

class ImplementationClass implements GenericInterface<number> {
  field: number;

  constructor(field: number) {
    this.field = field;
  }

  setField(field: number): void {
    this.field = field;
  }

  getField(): number {
    return this.field;
  }
}

const instance = new ImplementationClass(123);
// instance.setField(123);
console.log(instance.getField()); // Output: 123
