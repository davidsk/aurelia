import { AccessorType, LifecycleFlags } from '../observation.js';
import type { IAccessor, IObservable } from '../observation.js';

export class PropertyAccessor implements IAccessor {
  // the only thing can be guaranteed is it's an object
  // even if this property accessor is used to access an element
  public type: AccessorType = AccessorType.Obj;

  public getValue(obj: object, key: string): unknown {
    return (obj as IObservable)[key];
  }

  public setValue(value: unknown, flags: LifecycleFlags, obj: object, key: string): void {
    (obj as IObservable)[key] = value;
  }
}

export const propertyAccessor = new PropertyAccessor();
