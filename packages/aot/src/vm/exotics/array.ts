import { $Object } from '../types/object';
import { Realm } from '../realm';
import { $Number } from '../types/number';
import { $PropertyDescriptor } from '../types/property-descriptor';
import { $PropertyKey } from '../types/_shared';
import { $Boolean } from '../types/boolean';
import { $Get, $GetFunctionRealm, $Construct } from '../operations';
import { $Function } from '../types/function';

// http://www.ecma-international.org/ecma-262/#sec-array-exotic-objects
export class $ArrayExoticObject extends $Object<'ArrayExoticObject'> {
  public get isArray(): true { return true; }

  // http://www.ecma-international.org/ecma-262/#sec-arraycreate
  public constructor(
    realm: Realm,
    length: $Number,
    proto?: $Object,
  ) {
    if (proto === void 0) {
      proto = realm['[[Intrinsics]]']['%ArrayPrototype%'];
    }

    super(realm, 'ArrayExoticObject', proto);

    // 1. Assert: length is an integer Number ≥ 0.
    // 2. If length is -0, set length to +0.
    if (length.is(realm['[[Intrinsics]]']['-0'])) {
      length = realm['[[Intrinsics]]']['0'];
    }

    // 3. If length > 232 - 1, throw a RangeError exception.
    if (length.value > (2 ** 32 - 1)) {
      throw new RangeError('3. If length > 2^32 - 1, throw a RangeError exception.');
    }

    // 4. If proto is not present, set proto to the intrinsic object %ArrayPrototype%.
    // 5. Let A be a newly created Array exotic object.
    // 6. Set A's essential internal methods except for [[DefineOwnProperty]] to the default ordinary object definitions specified in 9.1.
    // 7. Set A.[[DefineOwnProperty]] as specified in 9.4.2.1.
    // 8. Set A.[[Prototype]] to proto.
    // 9. Set A.[[Extensible]] to true.
    // 10. Perform ! OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor { [[Value]]: length, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }).
    super['[[DefineOwnProperty]]'](
      realm['[[Intrinsics]]'].length,
      new $PropertyDescriptor(
        realm,
        realm['[[Intrinsics]]'].length,
        {
          '[[Value]]': length,
          '[[Writable]]': realm['[[Intrinsics]]'].true,
          '[[Enumerable]]': realm['[[Intrinsics]]'].false,
          '[[Configurable]]': realm['[[Intrinsics]]'].false,
        },
      ),
    );

    // 11. Return A.
  }

  // http://www.ecma-international.org/ecma-262/#sec-array-exotic-objects-defineownproperty-p-desc
  public '[[DefineOwnProperty]]'(P: $PropertyKey, Desc: $PropertyDescriptor): $Boolean {
    const realm = this.realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. Assert: IsPropertyKey(P) is true.
    // 2. If P is "length", then
    if (P.is(intrinsics.length)) {
      // 2. a. Return ? ArraySetLength(A, Desc).
      return this.ArraySetLength(Desc);
    }
    // 3. Else if P is an array index, then
    else if (P.IsArrayIndex) {
      // 3. a. Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
      const oldLenDesc = super['[[GetOwnProperty]]'](intrinsics.length) as $PropertyDescriptor;

      // 3. b. Assert: oldLenDesc will never be undefined or an accessor descriptor because Array objects are created with a length data property that cannot be deleted or reconfigured.
      // 3. c. Let oldLen be oldLenDesc.[[Value]].
      const oldLen = oldLenDesc['[[Value]]'] as $Number;

      // 3. d. Let index be ! ToUint32(P).
      const index = P.ToUint32();

      // 3. e. If index ≥ oldLen and oldLenDesc.[[Writable]] is false, return false.
      if (index.value >= oldLen.value && oldLenDesc['[[Writable]]'].isFalsey) {
        return intrinsics.false;
      }

      // 3. f. Let succeeded be ! OrdinaryDefineOwnProperty(A, P, Desc).
      const succeeded = super['[[DefineOwnProperty]]'](P, Desc);

      // 3. g. If succeeded is false, return false.
      if (succeeded.isFalsey) {
        return intrinsics.false;
      }

      // 3. h. If index ≥ oldLen, then
      if (index.value >= oldLen.value) {
        // 3. h. i. Set oldLenDesc.[[Value]] to index + 1.
        oldLenDesc['[[Value]]'] = new $Number(realm, index.value + 1);

        // 3. h. ii. Let succeeded be OrdinaryDefineOwnProperty(A, "length", oldLenDesc).
        const succeeded = super['[[DefineOwnProperty]]'](intrinsics.length, oldLenDesc);

        // 3. h. iii. Assert: succeeded is true.
      }

      // 3. i. Return true.
      return intrinsics.true;
    }

    // 4. Return OrdinaryDefineOwnProperty(A, P, Desc).
    return super['[[DefineOwnProperty]]'](P, Desc);
  }

  // http://www.ecma-international.org/ecma-262/#sec-arraysetlength
  public ArraySetLength(Desc: $PropertyDescriptor): $Boolean {
    const realm = this.realm;
    const intrinsics = realm['[[Intrinsics]]'];

    // 1. If Desc.[[Value]] is absent, then
    if (Desc['[[Value]]'].isEmpty) {
      // 1. a. Return OrdinaryDefineOwnProperty(A, "length", Desc).
      return super['[[DefineOwnProperty]]'](intrinsics.length, Desc);
    }

    // 2. Let newLenDesc be a copy of Desc.
    const newLenDesc = new $PropertyDescriptor(
      Desc.realm,
      Desc.name,
      {
        '[[Writable]]': Desc['[[Writable]]'],
        '[[Enumerable]]': Desc['[[Enumerable]]'],
        '[[Configurable]]': Desc['[[Configurable]]'],
      },
    );

    // 3. Let newLen be ? ToUint32(Desc.[[Value]]).
    const newLen = Desc['[[Value]]'].ToUint32();

    // 4. Let numberLen be ? ToNumber(Desc.[[Value]]).
    const numberLen = Desc['[[Value]]'].ToNumber();

    // 5. If newLen ≠ numberLen, throw a RangeError exception.
    if (!newLen.is(numberLen)) {
      throw new RangeError('5. If newLen ≠ numberLen, throw a RangeError exception.');
    }

    // 6. Set newLenDesc.[[Value]] to newLen.
    newLenDesc['[[Value]]'] = newLen;

    // 7. Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
    const oldLenDesc = super['[[GetOwnProperty]]'](intrinsics.length) as $PropertyDescriptor;

    // 8. Assert: oldLenDesc will never be undefined or an accessor descriptor because Array objects are created with a length data property that cannot be deleted or reconfigured.
    // 9. Let oldLen be oldLenDesc.[[Value]].
    const oldLen = oldLenDesc['[[Value]]'] as $Number;

    // 10. If newLen ≥ oldLen, then
    if (newLen.value >= oldLen.value) {
      // 10. a. Return OrdinaryDefineOwnProperty(A, "length", newLenDesc).
      return super['[[DefineOwnProperty]]'](intrinsics.length, newLenDesc);
    }

    // 11. If oldLenDesc.[[Writable]] is false, return false.
    if (oldLenDesc['[[Writable]]'].isFalsey) {
      return intrinsics.false;
    }

    let newWritable: boolean;
    // 12. If newLenDesc.[[Writable]] is absent or has the value true, let newWritable be true.
    if (newLenDesc['[[Writable]]'].isEmpty || newLenDesc['[[Writable]]'].isTruthy) {
      newWritable = true;
    }
    // 13. Else,
    else {
      // 13. a. Need to defer setting the [[Writable]] attribute to false in case any elements cannot be deleted.
      // 13. b. Let newWritable be false.
      newWritable = false;

      // 13. c. Set newLenDesc.[[Writable]] to true.
      newLenDesc['[[Writable]]'] = intrinsics.true;
    }

    // 14. Let succeeded be ! OrdinaryDefineOwnProperty(A, "length", newLenDesc).
    const succeeded = super['[[DefineOwnProperty]]'](intrinsics.length, newLenDesc);

    // 15. If succeeded is false, return false.
    if (succeeded.isFalsey) {
      return intrinsics.false;
    }

    let $newLen = newLen.value;
    let $oldLen = oldLen.value;

    // 16. Repeat, while newLen < oldLen,
    while ($newLen < $oldLen) {
      // 16. a. Decrease oldLen by 1.
      --$oldLen;

      // 16. b. Let deleteSucceeded be ! A.[[Delete]](! ToString(oldLen)).
      const deleteSucceeded = this['[[Delete]]'](new $Number(realm, $oldLen).ToString());

      // 16. c. If deleteSucceeded is false, then
      if (deleteSucceeded.isFalsey) {
        // 16. c. i. Set newLenDesc.[[Value]] to oldLen + 1.
        newLenDesc['[[Value]]'] = new $Number(realm, $oldLen + 1);

        // 16. c. ii. If newWritable is false, set newLenDesc.[[Writable]] to false.
        if (!newWritable) {
          newLenDesc['[[Writable]]'] = intrinsics.false;
        }

        // 16. c. iii. Perform ! OrdinaryDefineOwnProperty(A, "length", newLenDesc).
        super['[[DefineOwnProperty]]'](intrinsics.length, newLenDesc);

        // 16. c. iv. Return false.
        return intrinsics.false;
      }
    }

    // 17. If newWritable is false, then
    if (!newWritable) {
      // 17. a. Return OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor { [[Writable]]: false }). This call will always return true.
      return super['[[DefineOwnProperty]]'](
        intrinsics.length,
        new $PropertyDescriptor(
          realm,
          intrinsics.length,
          {
            '[[Writable]]': intrinsics.false,
          },
        ),
      );
    }

    // 18. Return true.
    return intrinsics.true;
  }
}

// http://www.ecma-international.org/ecma-262/#sec-arrayspeciescreate
export function $ArraySpeciesCreate(realm: Realm, originalArray: $Object, length: $Number): $Object {
  const intrinsics = realm['[[Intrinsics]]'];

  // 1. Assert: length is an integer Number ≥ 0.
  // 2. If length is -0, set length to +0.
  if (length.is(intrinsics['-0'])) {
    length = intrinsics['0'];
  }

  // 3. Let isArray be ? IsArray(originalArray).
  if (!originalArray.isArray) {
    // 4. If isArray is false, return ? ArrayCreate(length).
    return new $ArrayExoticObject(realm, length);
  }

  // 5. Let C be ? Get(originalArray, "constructor").
  let C = $Get(originalArray, intrinsics.$constructor);

  // 6. If IsConstructor(C) is true, then
  if (C.isFunction) {
    // 6. a. Let thisRealm be the current Realm Record.
    const thisRealm = realm;

    // 6. b. Let realmC be ? GetFunctionRealm(C).
    const realmC = $GetFunctionRealm(realm, C);

    // 6. c. If thisRealm and realmC are not the same Realm Record, then
    if (thisRealm !== realmC) {
      // 6. c. i. If SameValue(C, realmC.[[Intrinsics]].[[%Array%]]) is true, set C to undefined.
      if (C.is(realmC['[[Intrinsics]]']['%Array%'])) {
        C = intrinsics.undefined;
      }
    }
  }

  // 7. If Type(C) is Object, then
  if (C.isObject) {
    // 7. a. Set C to ? Get(C, @@species).
    C = $Get(C, intrinsics['@@species']);

    // 7. b. If C is null, set C to undefined.
    if (C.isNull) {
      C = intrinsics.undefined;
    }
  }

  // 8. If C is undefined, return ? ArrayCreate(length).
  if (C.isUndefined) {
    return new $ArrayExoticObject(realm, length);
  }

  // 9. If IsConstructor(C) is false, throw a TypeError exception.
  if (!C.isFunction) {
    throw new TypeError('9. If IsConstructor(C) is false, throw a TypeError exception.');
  }

  // 10. Return ? Construct(C, « length »).
  return $Construct(C as $Function, [length]);
}
