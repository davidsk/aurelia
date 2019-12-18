import { $PropertyKey, $AnyNonError, $Primitive, PotentialNonEmptyCompletionType, CompletionTarget, $AnyNonEmpty, $AnyNonEmptyNonError, $AnyObject, $Any } from './_shared';
import { $PropertyDescriptor } from './property-descriptor';
import { $Null } from './null';
import { $Boolean } from './boolean';
import { Realm, ExecutionContext } from '../realm';
import { $String } from './string';
import { $Number } from './number';
import { $Function } from './function';
import { $Undefined } from './undefined';
import { $Error } from './error';
import { $List } from './list';
import { Writable, IDisposable } from '@aurelia/kernel';
import { I$Node } from '../ast/_shared';
export declare class $Object<T extends string = string> implements IDisposable {
    readonly realm: Realm;
    readonly IntrinsicName: T;
    readonly '<$Object>': unknown;
    disposed: boolean;
    readonly id: number;
    '[[Type]]': PotentialNonEmptyCompletionType;
    get '[[Value]]'(): Record<string, unknown>;
    '[[Target]]': CompletionTarget;
    get isAbrupt(): false;
    readonly propertyMap: Map<string | symbol, number>;
    readonly propertyDescriptors: $PropertyDescriptor[];
    readonly propertyKeys: $PropertyKey[];
    ['[[Prototype]]']: $AnyObject | $Null;
    ['[[Extensible]]']: $Boolean;
    get Type(): 'Object';
    get isEmpty(): false;
    get isUndefined(): false;
    get isNull(): false;
    get isNil(): false;
    get isBoolean(): false;
    get isNumber(): false;
    get isString(): false;
    get isSymbol(): false;
    get isPrimitive(): false;
    get isObject(): true;
    get isArray(): boolean;
    get isProxy(): boolean;
    get isFunction(): boolean;
    get isBoundFunction(): boolean;
    get isTruthy(): true;
    get isFalsey(): false;
    get isSpeculative(): false;
    get hasValue(): false;
    get isList(): false;
    readonly nodeStack: I$Node[];
    ctx: ExecutionContext | null;
    stack: string;
    constructor(realm: Realm, IntrinsicName: T, proto: $AnyObject | $Null, type: PotentialNonEmptyCompletionType, target: CompletionTarget);
    static ObjectCreate<T extends string = string, TSlots extends {} = {}>(ctx: ExecutionContext, IntrinsicName: T, proto: $AnyObject, internalSlotsList?: TSlots): $Object<T> & TSlots;
    is(other: $AnyNonError): other is $Object<T>;
    enrichWith(ctx: ExecutionContext, node: I$Node): this;
    [Symbol.toPrimitive](): string;
    [Symbol.toStringTag](): string;
    ToCompletion(type: PotentialNonEmptyCompletionType, target: CompletionTarget): this;
    UpdateEmpty(value: $Any): this;
    ToObject(ctx: ExecutionContext): this;
    ToPropertyKey(ctx: ExecutionContext): $String | $Error;
    ToLength(ctx: ExecutionContext): $Number | $Error;
    ToBoolean(ctx: ExecutionContext): $Boolean | $Error;
    ToNumber(ctx: ExecutionContext): $Number | $Error;
    ToInt32(ctx: ExecutionContext): $Number | $Error;
    ToUint32(ctx: ExecutionContext): $Number | $Error;
    ToInt16(ctx: ExecutionContext): $Number | $Error;
    ToUint16(ctx: ExecutionContext): $Number | $Error;
    ToInt8(ctx: ExecutionContext): $Number | $Error;
    ToUint8(ctx: ExecutionContext): $Number | $Error;
    ToUint8Clamp(ctx: ExecutionContext): $Number | $Error;
    ToString(ctx: ExecutionContext): $String | $Error;
    ToPrimitive(ctx: ExecutionContext, PreferredType?: 'default' | 'string' | 'number'): $Primitive | $Error;
    OrdinaryToPrimitive(ctx: ExecutionContext, hint: 'string' | 'number'): $Primitive | $Error;
    GetValue(ctx: ExecutionContext): this;
    GetMethod(ctx: ExecutionContext, P: $PropertyKey): $Function | $Undefined | $Error;
    hasProperty(key: $PropertyKey): boolean;
    getProperty(key: $PropertyKey): $PropertyDescriptor;
    setProperty(desc: $PropertyDescriptor): void;
    deleteProperty(key: $PropertyKey): void;
    setDataProperty(name: $PropertyKey, value: $AnyNonEmpty, writable?: boolean, enumerable?: boolean, configurable?: boolean): void;
    setAccessorProperty(name: $String, getter: $Function | null, setter: $Function | null, enumerable?: boolean, configurable?: boolean): void;
    '[[GetPrototypeOf]]'(this: $AnyObject, ctx: ExecutionContext): $AnyObject | $Null | $Error;
    '[[SetPrototypeOf]]'(this: $AnyObject, ctx: ExecutionContext, V: $AnyObject | $Null): $Boolean | $Error;
    '[[IsExtensible]]'(this: $AnyObject, ctx: ExecutionContext): $Boolean | $Error;
    '[[PreventExtensions]]'(this: $AnyObject, ctx: ExecutionContext): $Boolean | $Error;
    '[[GetOwnProperty]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey): $PropertyDescriptor | $Undefined | $Error;
    '[[DefineOwnProperty]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey, Desc: $PropertyDescriptor): $Boolean | $Error;
    '[[HasProperty]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey): $Boolean | $Error;
    '[[Get]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey, Receiver: $AnyNonEmptyNonError): $AnyNonEmpty;
    '[[Set]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey, V: $AnyNonEmpty, Receiver: $AnyObject): $Boolean | $Error;
    '[[Delete]]'(this: $AnyObject, ctx: ExecutionContext, P: $PropertyKey): $Boolean | $Error;
    '[[OwnPropertyKeys]]'(this: $AnyObject, ctx: ExecutionContext): $List<$PropertyKey> | $Error;
    dispose(this: Writable<Partial<$Object>>): void;
}
//# sourceMappingURL=object.d.ts.map