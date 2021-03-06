import {
  IIndexable,
  IServiceLocator,
} from '@aurelia/kernel';
import { LifecycleFlags } from '../observation.js';

import type { IsBindingBehavior } from './ast.js';
import type { IConnectableBinding } from './connectable.js';
import type { Scope } from '../observation/binding-context.js';
import type { IBinding } from '../observation.js';

export interface RefBinding extends IConnectableBinding {}
export class RefBinding implements IBinding {
  public interceptor: this = this;

  public isBound: boolean = false;
  public $scope?: Scope = void 0;
  public $hostScope: Scope | null = null;

  public constructor(
    public sourceExpression: IsBindingBehavior,
    public target: object,
    public locator: IServiceLocator,
  ) {}

  public $bind(flags: LifecycleFlags, scope: Scope, hostScope: Scope | null): void {
    if (this.isBound) {
      if (this.$scope === scope) {
        return;
      }

      this.interceptor.$unbind(flags | LifecycleFlags.fromBind);
    }

    this.$scope = scope;
    this.$hostScope = hostScope;

    if (this.sourceExpression.hasBind) {
      this.sourceExpression.bind(flags, scope, hostScope, this);
    }

    this.sourceExpression.assign!(flags | LifecycleFlags.updateSource, this.$scope, hostScope, this.locator, this.target);

    // add isBound flag and remove isBinding flag
    this.isBound = true;
  }

  public $unbind(flags: LifecycleFlags): void {
    if (!this.isBound) {
      return;
    }

    let sourceExpression = this.sourceExpression;
    if (sourceExpression.evaluate(flags, this.$scope!, this.$hostScope, this.locator, null) === this.target) {
      sourceExpression.assign!(flags, this.$scope!, this.$hostScope, this.locator, null);
    }

    // source expression might have been modified durring assign, via a BB
    sourceExpression = this.sourceExpression;
    if (sourceExpression.hasUnbind) {
      sourceExpression.unbind(flags, this.$scope!, this.$hostScope, this.interceptor);
    }

    this.$scope = void 0;

    this.isBound = false;
  }

  public observeProperty(flags: LifecycleFlags, obj: IIndexable, propertyName: string): void {
    return;
  }

  public handleChange(newValue: unknown, previousValue: unknown, flags: LifecycleFlags): void {
    return;
  }
}
