
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Visit
 * 
 */
export type Visit = $Result.DefaultSelection<Prisma.$VisitPayload>
/**
 * Model CarePlan
 * 
 */
export type CarePlan = $Result.DefaultSelection<Prisma.$CarePlanPayload>
/**
 * Model Budget
 * 
 */
export type Budget = $Result.DefaultSelection<Prisma.$BudgetPayload>
/**
 * Model BudgetExpense
 * 
 */
export type BudgetExpense = $Result.DefaultSelection<Prisma.$BudgetExpensePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  CLIENT: 'CLIENT',
  WORKER: 'WORKER',
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const DataClassification: {
  PUBLIC: 'PUBLIC',
  INTERNAL: 'INTERNAL',
  PII: 'PII',
  PHI: 'PHI'
};

export type DataClassification = (typeof DataClassification)[keyof typeof DataClassification]


export const VisitStatus: {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
  RESCHEDULED: 'RESCHEDULED'
};

export type VisitStatus = (typeof VisitStatus)[keyof typeof VisitStatus]


export const CarePlanStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  DISCONTINUED: 'DISCONTINUED'
};

export type CarePlanStatus = (typeof CarePlanStatus)[keyof typeof CarePlanStatus]


export const BudgetStatus: {
  ACTIVE: 'ACTIVE',
  EXHAUSTED: 'EXHAUSTED',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED'
};

export type BudgetStatus = (typeof BudgetStatus)[keyof typeof BudgetStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type DataClassification = $Enums.DataClassification

export const DataClassification: typeof $Enums.DataClassification

export type VisitStatus = $Enums.VisitStatus

export const VisitStatus: typeof $Enums.VisitStatus

export type CarePlanStatus = $Enums.CarePlanStatus

export const CarePlanStatus: typeof $Enums.CarePlanStatus

export type BudgetStatus = $Enums.BudgetStatus

export const BudgetStatus: typeof $Enums.BudgetStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs>;

  /**
   * `prisma.visit`: Exposes CRUD operations for the **Visit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visits
    * const visits = await prisma.visit.findMany()
    * ```
    */
  get visit(): Prisma.VisitDelegate<ExtArgs>;

  /**
   * `prisma.carePlan`: Exposes CRUD operations for the **CarePlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarePlans
    * const carePlans = await prisma.carePlan.findMany()
    * ```
    */
  get carePlan(): Prisma.CarePlanDelegate<ExtArgs>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<ExtArgs>;

  /**
   * `prisma.budgetExpense`: Exposes CRUD operations for the **BudgetExpense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BudgetExpenses
    * const budgetExpenses = await prisma.budgetExpense.findMany()
    * ```
    */
  get budgetExpense(): Prisma.BudgetExpenseDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Visit: 'Visit',
    CarePlan: 'CarePlan',
    Budget: 'Budget',
    BudgetExpense: 'BudgetExpense',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "profile" | "visit" | "carePlan" | "budget" | "budgetExpense" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Visit: {
        payload: Prisma.$VisitPayload<ExtArgs>
        fields: Prisma.VisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          findFirst: {
            args: Prisma.VisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          findMany: {
            args: Prisma.VisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>[]
          }
          create: {
            args: Prisma.VisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          createMany: {
            args: Prisma.VisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>[]
          }
          delete: {
            args: Prisma.VisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          update: {
            args: Prisma.VisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          deleteMany: {
            args: Prisma.VisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitPayload>
          }
          aggregate: {
            args: Prisma.VisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisit>
          }
          groupBy: {
            args: Prisma.VisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitCountArgs<ExtArgs>
            result: $Utils.Optional<VisitCountAggregateOutputType> | number
          }
        }
      }
      CarePlan: {
        payload: Prisma.$CarePlanPayload<ExtArgs>
        fields: Prisma.CarePlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarePlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarePlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          findFirst: {
            args: Prisma.CarePlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarePlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          findMany: {
            args: Prisma.CarePlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>[]
          }
          create: {
            args: Prisma.CarePlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          createMany: {
            args: Prisma.CarePlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarePlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>[]
          }
          delete: {
            args: Prisma.CarePlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          update: {
            args: Prisma.CarePlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          deleteMany: {
            args: Prisma.CarePlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarePlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CarePlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePlanPayload>
          }
          aggregate: {
            args: Prisma.CarePlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarePlan>
          }
          groupBy: {
            args: Prisma.CarePlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarePlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarePlanCountArgs<ExtArgs>
            result: $Utils.Optional<CarePlanCountAggregateOutputType> | number
          }
        }
      }
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>
        fields: Prisma.BudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudget>
          }
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCountAggregateOutputType> | number
          }
        }
      }
      BudgetExpense: {
        payload: Prisma.$BudgetExpensePayload<ExtArgs>
        fields: Prisma.BudgetExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          findFirst: {
            args: Prisma.BudgetExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          findMany: {
            args: Prisma.BudgetExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>[]
          }
          create: {
            args: Prisma.BudgetExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          createMany: {
            args: Prisma.BudgetExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>[]
          }
          delete: {
            args: Prisma.BudgetExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          update: {
            args: Prisma.BudgetExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          deleteMany: {
            args: Prisma.BudgetExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BudgetExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetExpensePayload>
          }
          aggregate: {
            args: Prisma.BudgetExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudgetExpense>
          }
          groupBy: {
            args: Prisma.BudgetExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetExpenseCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clientVisits: number
    workerVisits: number
    supervisedWorkers: number
    carePlans: number
    budgets: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clientVisits?: boolean | UserCountOutputTypeCountClientVisitsArgs
    workerVisits?: boolean | UserCountOutputTypeCountWorkerVisitsArgs
    supervisedWorkers?: boolean | UserCountOutputTypeCountSupervisedWorkersArgs
    carePlans?: boolean | UserCountOutputTypeCountCarePlansArgs
    budgets?: boolean | UserCountOutputTypeCountBudgetsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkerVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupervisedWorkersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCarePlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarePlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type VisitCountOutputType
   */

  export type VisitCountOutputType = {
    expenses: number
  }

  export type VisitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | VisitCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * VisitCountOutputType without action
   */
  export type VisitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitCountOutputType
     */
    select?: VisitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VisitCountOutputType without action
   */
  export type VisitCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetExpenseWhereInput
  }


  /**
   * Count Type CarePlanCountOutputType
   */

  export type CarePlanCountOutputType = {
    visits: number
  }

  export type CarePlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visits?: boolean | CarePlanCountOutputTypeCountVisitsArgs
  }

  // Custom InputTypes
  /**
   * CarePlanCountOutputType without action
   */
  export type CarePlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlanCountOutputType
     */
    select?: CarePlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarePlanCountOutputType without action
   */
  export type CarePlanCountOutputTypeCountVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
  }


  /**
   * Count Type BudgetCountOutputType
   */

  export type BudgetCountOutputType = {
    expenses: number
  }

  export type BudgetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | BudgetCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCountOutputType
     */
    select?: BudgetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetExpenseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    loginAttempts: number | null
    version: number | null
  }

  export type UserSumAggregateOutputType = {
    loginAttempts: number | null
    version: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    emailVerified: boolean | null
    emailVerifiedAt: Date | null
    lastLoginAt: Date | null
    refreshToken: string | null
    refreshTokenExpiresAt: Date | null
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    loginAttempts: number | null
    lockedUntil: Date | null
    supervisorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    emailVerified: boolean | null
    emailVerifiedAt: Date | null
    lastLoginAt: Date | null
    refreshToken: string | null
    refreshTokenExpiresAt: Date | null
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    loginAttempts: number | null
    lockedUntil: Date | null
    supervisorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    isActive: number
    emailVerified: number
    emailVerifiedAt: number
    lastLoginAt: number
    refreshToken: number
    refreshTokenExpiresAt: number
    passwordResetToken: number
    passwordResetExpiresAt: number
    loginAttempts: number
    lockedUntil: number
    supervisorId: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    loginAttempts?: true
    version?: true
  }

  export type UserSumAggregateInputType = {
    loginAttempts?: true
    version?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    emailVerified?: true
    emailVerifiedAt?: true
    lastLoginAt?: true
    refreshToken?: true
    refreshTokenExpiresAt?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    loginAttempts?: true
    lockedUntil?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    emailVerified?: true
    emailVerifiedAt?: true
    lastLoginAt?: true
    refreshToken?: true
    refreshTokenExpiresAt?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    loginAttempts?: true
    lockedUntil?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    emailVerified?: true
    emailVerifiedAt?: true
    lastLoginAt?: true
    refreshToken?: true
    refreshTokenExpiresAt?: true
    passwordResetToken?: true
    passwordResetExpiresAt?: true
    loginAttempts?: true
    lockedUntil?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    isActive: boolean
    emailVerified: boolean
    emailVerifiedAt: Date | null
    lastLoginAt: Date | null
    refreshToken: string | null
    refreshTokenExpiresAt: Date | null
    passwordResetToken: string | null
    passwordResetExpiresAt: Date | null
    loginAttempts: number
    lockedUntil: Date | null
    supervisorId: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    lastLoginAt?: boolean
    refreshToken?: boolean
    refreshTokenExpiresAt?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    loginAttempts?: boolean
    lockedUntil?: boolean
    supervisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    clientVisits?: boolean | User$clientVisitsArgs<ExtArgs>
    workerVisits?: boolean | User$workerVisitsArgs<ExtArgs>
    supervisedWorkers?: boolean | User$supervisedWorkersArgs<ExtArgs>
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
    carePlans?: boolean | User$carePlansArgs<ExtArgs>
    budgets?: boolean | User$budgetsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    lastLoginAt?: boolean
    refreshToken?: boolean
    refreshTokenExpiresAt?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    loginAttempts?: boolean
    lockedUntil?: boolean
    supervisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    lastLoginAt?: boolean
    refreshToken?: boolean
    refreshTokenExpiresAt?: boolean
    passwordResetToken?: boolean
    passwordResetExpiresAt?: boolean
    loginAttempts?: boolean
    lockedUntil?: boolean
    supervisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    clientVisits?: boolean | User$clientVisitsArgs<ExtArgs>
    workerVisits?: boolean | User$workerVisitsArgs<ExtArgs>
    supervisedWorkers?: boolean | User$supervisedWorkersArgs<ExtArgs>
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
    carePlans?: boolean | User$carePlansArgs<ExtArgs>
    budgets?: boolean | User$budgetsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      clientVisits: Prisma.$VisitPayload<ExtArgs>[]
      workerVisits: Prisma.$VisitPayload<ExtArgs>[]
      supervisedWorkers: Prisma.$UserPayload<ExtArgs>[]
      supervisor: Prisma.$UserPayload<ExtArgs> | null
      carePlans: Prisma.$CarePlanPayload<ExtArgs>[]
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      isActive: boolean
      emailVerified: boolean
      emailVerifiedAt: Date | null
      lastLoginAt: Date | null
      refreshToken: string | null
      refreshTokenExpiresAt: Date | null
      passwordResetToken: string | null
      passwordResetExpiresAt: Date | null
      loginAttempts: number
      lockedUntil: Date | null
      supervisorId: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    clientVisits<T extends User$clientVisitsArgs<ExtArgs> = {}>(args?: Subset<T, User$clientVisitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany"> | Null>
    workerVisits<T extends User$workerVisitsArgs<ExtArgs> = {}>(args?: Subset<T, User$workerVisitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany"> | Null>
    supervisedWorkers<T extends User$supervisedWorkersArgs<ExtArgs> = {}>(args?: Subset<T, User$supervisedWorkersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    supervisor<T extends User$supervisorArgs<ExtArgs> = {}>(args?: Subset<T, User$supervisorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    carePlans<T extends User$carePlansArgs<ExtArgs> = {}>(args?: Subset<T, User$carePlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findMany"> | Null>
    budgets<T extends User$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, User$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly emailVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly refreshTokenExpiresAt: FieldRef<"User", 'DateTime'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly passwordResetExpiresAt: FieldRef<"User", 'DateTime'>
    readonly loginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly supervisorId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly createdBy: FieldRef<"User", 'String'>
    readonly updatedBy: FieldRef<"User", 'String'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly version: FieldRef<"User", 'Int'>
    readonly dataClassification: FieldRef<"User", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.clientVisits
   */
  export type User$clientVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    cursor?: VisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * User.workerVisits
   */
  export type User$workerVisitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    cursor?: VisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * User.supervisedWorkers
   */
  export type User$supervisedWorkersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.supervisor
   */
  export type User$supervisorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.carePlans
   */
  export type User$carePlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    where?: CarePlanWhereInput
    orderBy?: CarePlanOrderByWithRelationInput | CarePlanOrderByWithRelationInput[]
    cursor?: CarePlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarePlanScalarFieldEnum | CarePlanScalarFieldEnum[]
  }

  /**
   * User.budgets
   */
  export type User$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    version: number | null
  }

  export type ProfileSumAggregateOutputType = {
    version: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    preferredName: string | null
    phone: string | null
    alternatePhone: string | null
    email: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    country: string | null
    dateOfBirth: Date | null
    gender: string | null
    medicalRecordNumber: string | null
    insuranceNumber: string | null
    insuranceProvider: string | null
    primaryCarePhysician: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    emergencyContactRelation: string | null
    emergencyContactAddress: string | null
    specialNeeds: string | null
    preferredLanguage: string | null
    timezone: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    middleName: string | null
    preferredName: string | null
    phone: string | null
    alternatePhone: string | null
    email: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    country: string | null
    dateOfBirth: Date | null
    gender: string | null
    medicalRecordNumber: string | null
    insuranceNumber: string | null
    insuranceProvider: string | null
    primaryCarePhysician: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    emergencyContactRelation: string | null
    emergencyContactAddress: string | null
    specialNeeds: string | null
    preferredLanguage: string | null
    timezone: string | null
    photoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    middleName: number
    preferredName: number
    phone: number
    alternatePhone: number
    email: number
    streetAddress: number
    city: number
    state: number
    zipCode: number
    country: number
    dateOfBirth: number
    gender: number
    medicalRecordNumber: number
    insuranceNumber: number
    insuranceProvider: number
    primaryCarePhysician: number
    emergencyContactName: number
    emergencyContactPhone: number
    emergencyContactRelation: number
    emergencyContactAddress: number
    allergies: number
    medications: number
    medicalConditions: number
    specialNeeds: number
    preferredLanguage: number
    timezone: number
    photoUrl: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    version?: true
  }

  export type ProfileSumAggregateInputType = {
    version?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    preferredName?: true
    phone?: true
    alternatePhone?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    dateOfBirth?: true
    gender?: true
    medicalRecordNumber?: true
    insuranceNumber?: true
    insuranceProvider?: true
    primaryCarePhysician?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    emergencyContactRelation?: true
    emergencyContactAddress?: true
    specialNeeds?: true
    preferredLanguage?: true
    timezone?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    preferredName?: true
    phone?: true
    alternatePhone?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    dateOfBirth?: true
    gender?: true
    medicalRecordNumber?: true
    insuranceNumber?: true
    insuranceProvider?: true
    primaryCarePhysician?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    emergencyContactRelation?: true
    emergencyContactAddress?: true
    specialNeeds?: true
    preferredLanguage?: true
    timezone?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    middleName?: true
    preferredName?: true
    phone?: true
    alternatePhone?: true
    email?: true
    streetAddress?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    dateOfBirth?: true
    gender?: true
    medicalRecordNumber?: true
    insuranceNumber?: true
    insuranceProvider?: true
    primaryCarePhysician?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    emergencyContactRelation?: true
    emergencyContactAddress?: true
    allergies?: true
    medications?: true
    medicalConditions?: true
    specialNeeds?: true
    preferredLanguage?: true
    timezone?: true
    photoUrl?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    middleName: string | null
    preferredName: string | null
    phone: string | null
    alternatePhone: string | null
    email: string | null
    streetAddress: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    country: string | null
    dateOfBirth: Date | null
    gender: string | null
    medicalRecordNumber: string | null
    insuranceNumber: string | null
    insuranceProvider: string | null
    primaryCarePhysician: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    emergencyContactRelation: string | null
    emergencyContactAddress: string | null
    allergies: string[]
    medications: string[]
    medicalConditions: string[]
    specialNeeds: string | null
    preferredLanguage: string | null
    timezone: string | null
    photoUrl: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    preferredName?: boolean
    phone?: boolean
    alternatePhone?: boolean
    email?: boolean
    streetAddress?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    country?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    medicalRecordNumber?: boolean
    insuranceNumber?: boolean
    insuranceProvider?: boolean
    primaryCarePhysician?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    emergencyContactRelation?: boolean
    emergencyContactAddress?: boolean
    allergies?: boolean
    medications?: boolean
    medicalConditions?: boolean
    specialNeeds?: boolean
    preferredLanguage?: boolean
    timezone?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    preferredName?: boolean
    phone?: boolean
    alternatePhone?: boolean
    email?: boolean
    streetAddress?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    country?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    medicalRecordNumber?: boolean
    insuranceNumber?: boolean
    insuranceProvider?: boolean
    primaryCarePhysician?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    emergencyContactRelation?: boolean
    emergencyContactAddress?: boolean
    allergies?: boolean
    medications?: boolean
    medicalConditions?: boolean
    specialNeeds?: boolean
    preferredLanguage?: boolean
    timezone?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    middleName?: boolean
    preferredName?: boolean
    phone?: boolean
    alternatePhone?: boolean
    email?: boolean
    streetAddress?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    country?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    medicalRecordNumber?: boolean
    insuranceNumber?: boolean
    insuranceProvider?: boolean
    primaryCarePhysician?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    emergencyContactRelation?: boolean
    emergencyContactAddress?: boolean
    allergies?: boolean
    medications?: boolean
    medicalConditions?: boolean
    specialNeeds?: boolean
    preferredLanguage?: boolean
    timezone?: boolean
    photoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      middleName: string | null
      preferredName: string | null
      phone: string | null
      alternatePhone: string | null
      email: string | null
      streetAddress: string | null
      city: string | null
      state: string | null
      zipCode: string | null
      country: string | null
      dateOfBirth: Date | null
      gender: string | null
      medicalRecordNumber: string | null
      insuranceNumber: string | null
      insuranceProvider: string | null
      primaryCarePhysician: string | null
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      emergencyContactRelation: string | null
      emergencyContactAddress: string | null
      allergies: string[]
      medications: string[]
      medicalConditions: string[]
      specialNeeds: string | null
      preferredLanguage: string | null
      timezone: string | null
      photoUrl: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly middleName: FieldRef<"Profile", 'String'>
    readonly preferredName: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly alternatePhone: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly streetAddress: FieldRef<"Profile", 'String'>
    readonly city: FieldRef<"Profile", 'String'>
    readonly state: FieldRef<"Profile", 'String'>
    readonly zipCode: FieldRef<"Profile", 'String'>
    readonly country: FieldRef<"Profile", 'String'>
    readonly dateOfBirth: FieldRef<"Profile", 'DateTime'>
    readonly gender: FieldRef<"Profile", 'String'>
    readonly medicalRecordNumber: FieldRef<"Profile", 'String'>
    readonly insuranceNumber: FieldRef<"Profile", 'String'>
    readonly insuranceProvider: FieldRef<"Profile", 'String'>
    readonly primaryCarePhysician: FieldRef<"Profile", 'String'>
    readonly emergencyContactName: FieldRef<"Profile", 'String'>
    readonly emergencyContactPhone: FieldRef<"Profile", 'String'>
    readonly emergencyContactRelation: FieldRef<"Profile", 'String'>
    readonly emergencyContactAddress: FieldRef<"Profile", 'String'>
    readonly allergies: FieldRef<"Profile", 'String[]'>
    readonly medications: FieldRef<"Profile", 'String[]'>
    readonly medicalConditions: FieldRef<"Profile", 'String[]'>
    readonly specialNeeds: FieldRef<"Profile", 'String'>
    readonly preferredLanguage: FieldRef<"Profile", 'String'>
    readonly timezone: FieldRef<"Profile", 'String'>
    readonly photoUrl: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
    readonly createdBy: FieldRef<"Profile", 'String'>
    readonly updatedBy: FieldRef<"Profile", 'String'>
    readonly deletedAt: FieldRef<"Profile", 'DateTime'>
    readonly version: FieldRef<"Profile", 'Int'>
    readonly dataClassification: FieldRef<"Profile", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Visit
   */

  export type AggregateVisit = {
    _count: VisitCountAggregateOutputType | null
    _avg: VisitAvgAggregateOutputType | null
    _sum: VisitSumAggregateOutputType | null
    _min: VisitMinAggregateOutputType | null
    _max: VisitMaxAggregateOutputType | null
  }

  export type VisitAvgAggregateOutputType = {
    duration: number | null
    actualDuration: number | null
    clientSatisfaction: number | null
    billableTime: number | null
    billingRate: Decimal | null
    totalCost: Decimal | null
    version: number | null
  }

  export type VisitSumAggregateOutputType = {
    duration: number | null
    actualDuration: number | null
    clientSatisfaction: number | null
    billableTime: number | null
    billingRate: Decimal | null
    totalCost: Decimal | null
    version: number | null
  }

  export type VisitMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    workerId: string | null
    scheduledAt: Date | null
    scheduledEndAt: Date | null
    actualStartAt: Date | null
    actualEndAt: Date | null
    duration: number | null
    actualDuration: number | null
    status: $Enums.VisitStatus | null
    visitType: string | null
    location: string | null
    notes: string | null
    privateNotes: string | null
    clientSatisfaction: number | null
    workerNotes: string | null
    supervisorReview: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    billableTime: number | null
    billingRate: Decimal | null
    totalCost: Decimal | null
    invoiceId: string | null
    documentationComplete: boolean | null
    cancellationReason: string | null
    rescheduledFrom: string | null
    rescheduledTo: string | null
    carePlanId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type VisitMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    workerId: string | null
    scheduledAt: Date | null
    scheduledEndAt: Date | null
    actualStartAt: Date | null
    actualEndAt: Date | null
    duration: number | null
    actualDuration: number | null
    status: $Enums.VisitStatus | null
    visitType: string | null
    location: string | null
    notes: string | null
    privateNotes: string | null
    clientSatisfaction: number | null
    workerNotes: string | null
    supervisorReview: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    billableTime: number | null
    billingRate: Decimal | null
    totalCost: Decimal | null
    invoiceId: string | null
    documentationComplete: boolean | null
    cancellationReason: string | null
    rescheduledFrom: string | null
    rescheduledTo: string | null
    carePlanId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type VisitCountAggregateOutputType = {
    id: number
    clientId: number
    workerId: number
    scheduledAt: number
    scheduledEndAt: number
    actualStartAt: number
    actualEndAt: number
    duration: number
    actualDuration: number
    status: number
    visitType: number
    location: number
    notes: number
    privateNotes: number
    activities: number
    plannedActivities: number
    medications: number
    vitals: number
    clientSatisfaction: number
    workerNotes: number
    supervisorReview: number
    reviewedAt: number
    reviewedBy: number
    billableTime: number
    billingRate: number
    totalCost: number
    invoiceId: number
    documentationComplete: number
    cancellationReason: number
    rescheduledFrom: number
    rescheduledTo: number
    carePlanId: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type VisitAvgAggregateInputType = {
    duration?: true
    actualDuration?: true
    clientSatisfaction?: true
    billableTime?: true
    billingRate?: true
    totalCost?: true
    version?: true
  }

  export type VisitSumAggregateInputType = {
    duration?: true
    actualDuration?: true
    clientSatisfaction?: true
    billableTime?: true
    billingRate?: true
    totalCost?: true
    version?: true
  }

  export type VisitMinAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    scheduledAt?: true
    scheduledEndAt?: true
    actualStartAt?: true
    actualEndAt?: true
    duration?: true
    actualDuration?: true
    status?: true
    visitType?: true
    location?: true
    notes?: true
    privateNotes?: true
    clientSatisfaction?: true
    workerNotes?: true
    supervisorReview?: true
    reviewedAt?: true
    reviewedBy?: true
    billableTime?: true
    billingRate?: true
    totalCost?: true
    invoiceId?: true
    documentationComplete?: true
    cancellationReason?: true
    rescheduledFrom?: true
    rescheduledTo?: true
    carePlanId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type VisitMaxAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    scheduledAt?: true
    scheduledEndAt?: true
    actualStartAt?: true
    actualEndAt?: true
    duration?: true
    actualDuration?: true
    status?: true
    visitType?: true
    location?: true
    notes?: true
    privateNotes?: true
    clientSatisfaction?: true
    workerNotes?: true
    supervisorReview?: true
    reviewedAt?: true
    reviewedBy?: true
    billableTime?: true
    billingRate?: true
    totalCost?: true
    invoiceId?: true
    documentationComplete?: true
    cancellationReason?: true
    rescheduledFrom?: true
    rescheduledTo?: true
    carePlanId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type VisitCountAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    scheduledAt?: true
    scheduledEndAt?: true
    actualStartAt?: true
    actualEndAt?: true
    duration?: true
    actualDuration?: true
    status?: true
    visitType?: true
    location?: true
    notes?: true
    privateNotes?: true
    activities?: true
    plannedActivities?: true
    medications?: true
    vitals?: true
    clientSatisfaction?: true
    workerNotes?: true
    supervisorReview?: true
    reviewedAt?: true
    reviewedBy?: true
    billableTime?: true
    billingRate?: true
    totalCost?: true
    invoiceId?: true
    documentationComplete?: true
    cancellationReason?: true
    rescheduledFrom?: true
    rescheduledTo?: true
    carePlanId?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type VisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visit to aggregate.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Visits
    **/
    _count?: true | VisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VisitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VisitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitMaxAggregateInputType
  }

  export type GetVisitAggregateType<T extends VisitAggregateArgs> = {
        [P in keyof T & keyof AggregateVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisit[P]>
      : GetScalarType<T[P], AggregateVisit[P]>
  }




  export type VisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithAggregationInput | VisitOrderByWithAggregationInput[]
    by: VisitScalarFieldEnum[] | VisitScalarFieldEnum
    having?: VisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitCountAggregateInputType | true
    _avg?: VisitAvgAggregateInputType
    _sum?: VisitSumAggregateInputType
    _min?: VisitMinAggregateInputType
    _max?: VisitMaxAggregateInputType
  }

  export type VisitGroupByOutputType = {
    id: string
    clientId: string
    workerId: string
    scheduledAt: Date
    scheduledEndAt: Date | null
    actualStartAt: Date | null
    actualEndAt: Date | null
    duration: number | null
    actualDuration: number | null
    status: $Enums.VisitStatus
    visitType: string | null
    location: string | null
    notes: string | null
    privateNotes: string | null
    activities: string[]
    plannedActivities: string[]
    medications: string[]
    vitals: JsonValue | null
    clientSatisfaction: number | null
    workerNotes: string | null
    supervisorReview: string | null
    reviewedAt: Date | null
    reviewedBy: string | null
    billableTime: number | null
    billingRate: Decimal | null
    totalCost: Decimal | null
    invoiceId: string | null
    documentationComplete: boolean
    cancellationReason: string | null
    rescheduledFrom: string | null
    rescheduledTo: string | null
    carePlanId: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: VisitCountAggregateOutputType | null
    _avg: VisitAvgAggregateOutputType | null
    _sum: VisitSumAggregateOutputType | null
    _min: VisitMinAggregateOutputType | null
    _max: VisitMaxAggregateOutputType | null
  }

  type GetVisitGroupByPayload<T extends VisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitGroupByOutputType[P]>
            : GetScalarType<T[P], VisitGroupByOutputType[P]>
        }
      >
    >


  export type VisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    scheduledAt?: boolean
    scheduledEndAt?: boolean
    actualStartAt?: boolean
    actualEndAt?: boolean
    duration?: boolean
    actualDuration?: boolean
    status?: boolean
    visitType?: boolean
    location?: boolean
    notes?: boolean
    privateNotes?: boolean
    activities?: boolean
    plannedActivities?: boolean
    medications?: boolean
    vitals?: boolean
    clientSatisfaction?: boolean
    workerNotes?: boolean
    supervisorReview?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    billableTime?: boolean
    billingRate?: boolean
    totalCost?: boolean
    invoiceId?: boolean
    documentationComplete?: boolean
    cancellationReason?: boolean
    rescheduledFrom?: boolean
    rescheduledTo?: boolean
    carePlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | UserDefaultArgs<ExtArgs>
    carePlan?: boolean | Visit$carePlanArgs<ExtArgs>
    expenses?: boolean | Visit$expensesArgs<ExtArgs>
    _count?: boolean | VisitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visit"]>

  export type VisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    scheduledAt?: boolean
    scheduledEndAt?: boolean
    actualStartAt?: boolean
    actualEndAt?: boolean
    duration?: boolean
    actualDuration?: boolean
    status?: boolean
    visitType?: boolean
    location?: boolean
    notes?: boolean
    privateNotes?: boolean
    activities?: boolean
    plannedActivities?: boolean
    medications?: boolean
    vitals?: boolean
    clientSatisfaction?: boolean
    workerNotes?: boolean
    supervisorReview?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    billableTime?: boolean
    billingRate?: boolean
    totalCost?: boolean
    invoiceId?: boolean
    documentationComplete?: boolean
    cancellationReason?: boolean
    rescheduledFrom?: boolean
    rescheduledTo?: boolean
    carePlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | UserDefaultArgs<ExtArgs>
    carePlan?: boolean | Visit$carePlanArgs<ExtArgs>
  }, ExtArgs["result"]["visit"]>

  export type VisitSelectScalar = {
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    scheduledAt?: boolean
    scheduledEndAt?: boolean
    actualStartAt?: boolean
    actualEndAt?: boolean
    duration?: boolean
    actualDuration?: boolean
    status?: boolean
    visitType?: boolean
    location?: boolean
    notes?: boolean
    privateNotes?: boolean
    activities?: boolean
    plannedActivities?: boolean
    medications?: boolean
    vitals?: boolean
    clientSatisfaction?: boolean
    workerNotes?: boolean
    supervisorReview?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    billableTime?: boolean
    billingRate?: boolean
    totalCost?: boolean
    invoiceId?: boolean
    documentationComplete?: boolean
    cancellationReason?: boolean
    rescheduledFrom?: boolean
    rescheduledTo?: boolean
    carePlanId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type VisitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | UserDefaultArgs<ExtArgs>
    carePlan?: boolean | Visit$carePlanArgs<ExtArgs>
    expenses?: boolean | Visit$expensesArgs<ExtArgs>
    _count?: boolean | VisitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VisitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | UserDefaultArgs<ExtArgs>
    carePlan?: boolean | Visit$carePlanArgs<ExtArgs>
  }

  export type $VisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Visit"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      worker: Prisma.$UserPayload<ExtArgs>
      carePlan: Prisma.$CarePlanPayload<ExtArgs> | null
      expenses: Prisma.$BudgetExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      workerId: string
      scheduledAt: Date
      scheduledEndAt: Date | null
      actualStartAt: Date | null
      actualEndAt: Date | null
      duration: number | null
      actualDuration: number | null
      status: $Enums.VisitStatus
      visitType: string | null
      location: string | null
      notes: string | null
      privateNotes: string | null
      activities: string[]
      plannedActivities: string[]
      medications: string[]
      vitals: Prisma.JsonValue | null
      clientSatisfaction: number | null
      workerNotes: string | null
      supervisorReview: string | null
      reviewedAt: Date | null
      reviewedBy: string | null
      billableTime: number | null
      billingRate: Prisma.Decimal | null
      totalCost: Prisma.Decimal | null
      invoiceId: string | null
      documentationComplete: boolean
      cancellationReason: string | null
      rescheduledFrom: string | null
      rescheduledTo: string | null
      carePlanId: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["visit"]>
    composites: {}
  }

  type VisitGetPayload<S extends boolean | null | undefined | VisitDefaultArgs> = $Result.GetResult<Prisma.$VisitPayload, S>

  type VisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VisitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VisitCountAggregateInputType | true
    }

  export interface VisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Visit'], meta: { name: 'Visit' } }
    /**
     * Find zero or one Visit that matches the filter.
     * @param {VisitFindUniqueArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitFindUniqueArgs>(args: SelectSubset<T, VisitFindUniqueArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Visit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VisitFindUniqueOrThrowArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Visit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindFirstArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitFindFirstArgs>(args?: SelectSubset<T, VisitFindFirstArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Visit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindFirstOrThrowArgs} args - Arguments to find a Visit
     * @example
     * // Get one Visit
     * const visit = await prisma.visit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Visits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visits
     * const visits = await prisma.visit.findMany()
     * 
     * // Get first 10 Visits
     * const visits = await prisma.visit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitWithIdOnly = await prisma.visit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitFindManyArgs>(args?: SelectSubset<T, VisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Visit.
     * @param {VisitCreateArgs} args - Arguments to create a Visit.
     * @example
     * // Create one Visit
     * const Visit = await prisma.visit.create({
     *   data: {
     *     // ... data to create a Visit
     *   }
     * })
     * 
     */
    create<T extends VisitCreateArgs>(args: SelectSubset<T, VisitCreateArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Visits.
     * @param {VisitCreateManyArgs} args - Arguments to create many Visits.
     * @example
     * // Create many Visits
     * const visit = await prisma.visit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitCreateManyArgs>(args?: SelectSubset<T, VisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Visits and returns the data saved in the database.
     * @param {VisitCreateManyAndReturnArgs} args - Arguments to create many Visits.
     * @example
     * // Create many Visits
     * const visit = await prisma.visit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Visits and only return the `id`
     * const visitWithIdOnly = await prisma.visit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Visit.
     * @param {VisitDeleteArgs} args - Arguments to delete one Visit.
     * @example
     * // Delete one Visit
     * const Visit = await prisma.visit.delete({
     *   where: {
     *     // ... filter to delete one Visit
     *   }
     * })
     * 
     */
    delete<T extends VisitDeleteArgs>(args: SelectSubset<T, VisitDeleteArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Visit.
     * @param {VisitUpdateArgs} args - Arguments to update one Visit.
     * @example
     * // Update one Visit
     * const visit = await prisma.visit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitUpdateArgs>(args: SelectSubset<T, VisitUpdateArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Visits.
     * @param {VisitDeleteManyArgs} args - Arguments to filter Visits to delete.
     * @example
     * // Delete a few Visits
     * const { count } = await prisma.visit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitDeleteManyArgs>(args?: SelectSubset<T, VisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visits
     * const visit = await prisma.visit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitUpdateManyArgs>(args: SelectSubset<T, VisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Visit.
     * @param {VisitUpsertArgs} args - Arguments to update or create a Visit.
     * @example
     * // Update or create a Visit
     * const visit = await prisma.visit.upsert({
     *   create: {
     *     // ... data to create a Visit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visit we want to update
     *   }
     * })
     */
    upsert<T extends VisitUpsertArgs>(args: SelectSubset<T, VisitUpsertArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Visits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitCountArgs} args - Arguments to filter Visits to count.
     * @example
     * // Count the number of Visits
     * const count = await prisma.visit.count({
     *   where: {
     *     // ... the filter for the Visits we want to count
     *   }
     * })
    **/
    count<T extends VisitCountArgs>(
      args?: Subset<T, VisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitAggregateArgs>(args: Subset<T, VisitAggregateArgs>): Prisma.PrismaPromise<GetVisitAggregateType<T>>

    /**
     * Group by Visit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitGroupByArgs['orderBy'] }
        : { orderBy?: VisitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Visit model
   */
  readonly fields: VisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Visit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    worker<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    carePlan<T extends Visit$carePlanArgs<ExtArgs> = {}>(args?: Subset<T, Visit$carePlanArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    expenses<T extends Visit$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Visit$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Visit model
   */ 
  interface VisitFieldRefs {
    readonly id: FieldRef<"Visit", 'String'>
    readonly clientId: FieldRef<"Visit", 'String'>
    readonly workerId: FieldRef<"Visit", 'String'>
    readonly scheduledAt: FieldRef<"Visit", 'DateTime'>
    readonly scheduledEndAt: FieldRef<"Visit", 'DateTime'>
    readonly actualStartAt: FieldRef<"Visit", 'DateTime'>
    readonly actualEndAt: FieldRef<"Visit", 'DateTime'>
    readonly duration: FieldRef<"Visit", 'Int'>
    readonly actualDuration: FieldRef<"Visit", 'Int'>
    readonly status: FieldRef<"Visit", 'VisitStatus'>
    readonly visitType: FieldRef<"Visit", 'String'>
    readonly location: FieldRef<"Visit", 'String'>
    readonly notes: FieldRef<"Visit", 'String'>
    readonly privateNotes: FieldRef<"Visit", 'String'>
    readonly activities: FieldRef<"Visit", 'String[]'>
    readonly plannedActivities: FieldRef<"Visit", 'String[]'>
    readonly medications: FieldRef<"Visit", 'String[]'>
    readonly vitals: FieldRef<"Visit", 'Json'>
    readonly clientSatisfaction: FieldRef<"Visit", 'Int'>
    readonly workerNotes: FieldRef<"Visit", 'String'>
    readonly supervisorReview: FieldRef<"Visit", 'String'>
    readonly reviewedAt: FieldRef<"Visit", 'DateTime'>
    readonly reviewedBy: FieldRef<"Visit", 'String'>
    readonly billableTime: FieldRef<"Visit", 'Int'>
    readonly billingRate: FieldRef<"Visit", 'Decimal'>
    readonly totalCost: FieldRef<"Visit", 'Decimal'>
    readonly invoiceId: FieldRef<"Visit", 'String'>
    readonly documentationComplete: FieldRef<"Visit", 'Boolean'>
    readonly cancellationReason: FieldRef<"Visit", 'String'>
    readonly rescheduledFrom: FieldRef<"Visit", 'String'>
    readonly rescheduledTo: FieldRef<"Visit", 'String'>
    readonly carePlanId: FieldRef<"Visit", 'String'>
    readonly createdAt: FieldRef<"Visit", 'DateTime'>
    readonly updatedAt: FieldRef<"Visit", 'DateTime'>
    readonly createdBy: FieldRef<"Visit", 'String'>
    readonly updatedBy: FieldRef<"Visit", 'String'>
    readonly deletedAt: FieldRef<"Visit", 'DateTime'>
    readonly version: FieldRef<"Visit", 'Int'>
    readonly dataClassification: FieldRef<"Visit", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * Visit findUnique
   */
  export type VisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit findUniqueOrThrow
   */
  export type VisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit findFirst
   */
  export type VisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visits.
     */
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit findFirstOrThrow
   */
  export type VisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visit to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visits.
     */
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit findMany
   */
  export type VisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter, which Visits to fetch.
     */
    where?: VisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visits to fetch.
     */
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Visits.
     */
    cursor?: VisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visits.
     */
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * Visit create
   */
  export type VisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The data needed to create a Visit.
     */
    data: XOR<VisitCreateInput, VisitUncheckedCreateInput>
  }

  /**
   * Visit createMany
   */
  export type VisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Visits.
     */
    data: VisitCreateManyInput | VisitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Visit createManyAndReturn
   */
  export type VisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Visits.
     */
    data: VisitCreateManyInput | VisitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Visit update
   */
  export type VisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The data needed to update a Visit.
     */
    data: XOR<VisitUpdateInput, VisitUncheckedUpdateInput>
    /**
     * Choose, which Visit to update.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit updateMany
   */
  export type VisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Visits.
     */
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyInput>
    /**
     * Filter which Visits to update
     */
    where?: VisitWhereInput
  }

  /**
   * Visit upsert
   */
  export type VisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * The filter to search for the Visit to update in case it exists.
     */
    where: VisitWhereUniqueInput
    /**
     * In case the Visit found by the `where` argument doesn't exist, create a new Visit with this data.
     */
    create: XOR<VisitCreateInput, VisitUncheckedCreateInput>
    /**
     * In case the Visit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitUpdateInput, VisitUncheckedUpdateInput>
  }

  /**
   * Visit delete
   */
  export type VisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    /**
     * Filter which Visit to delete.
     */
    where: VisitWhereUniqueInput
  }

  /**
   * Visit deleteMany
   */
  export type VisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visits to delete
     */
    where?: VisitWhereInput
  }

  /**
   * Visit.carePlan
   */
  export type Visit$carePlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    where?: CarePlanWhereInput
  }

  /**
   * Visit.expenses
   */
  export type Visit$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    where?: BudgetExpenseWhereInput
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    cursor?: BudgetExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetExpenseScalarFieldEnum | BudgetExpenseScalarFieldEnum[]
  }

  /**
   * Visit without action
   */
  export type VisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
  }


  /**
   * Model CarePlan
   */

  export type AggregateCarePlan = {
    _count: CarePlanCountAggregateOutputType | null
    _avg: CarePlanAvgAggregateOutputType | null
    _sum: CarePlanSumAggregateOutputType | null
    _min: CarePlanMinAggregateOutputType | null
    _max: CarePlanMaxAggregateOutputType | null
  }

  export type CarePlanAvgAggregateOutputType = {
    version: number | null
  }

  export type CarePlanSumAggregateOutputType = {
    version: number | null
  }

  export type CarePlanMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    description: string | null
    status: $Enums.CarePlanStatus | null
    priority: string | null
    category: string | null
    specialInstructions: string | null
    emergencyProtocols: string | null
    startDate: Date | null
    endDate: Date | null
    reviewDate: Date | null
    lastReviewDate: Date | null
    initialAssessment: string | null
    treatmentPlan: string | null
    restrictionsLimitations: string | null
    safetyConsiderations: string | null
    primaryCaregiver: string | null
    supervising: string | null
    approvedBy: string | null
    approvedAt: Date | null
    nextReviewBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type CarePlanMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    description: string | null
    status: $Enums.CarePlanStatus | null
    priority: string | null
    category: string | null
    specialInstructions: string | null
    emergencyProtocols: string | null
    startDate: Date | null
    endDate: Date | null
    reviewDate: Date | null
    lastReviewDate: Date | null
    initialAssessment: string | null
    treatmentPlan: string | null
    restrictionsLimitations: string | null
    safetyConsiderations: string | null
    primaryCaregiver: string | null
    supervising: string | null
    approvedBy: string | null
    approvedAt: Date | null
    nextReviewBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type CarePlanCountAggregateOutputType = {
    id: number
    clientId: number
    name: number
    description: number
    status: number
    priority: number
    category: number
    goals: number
    objectives: number
    expectedOutcomes: number
    standardActivities: number
    specialInstructions: number
    medicationReminders: number
    emergencyProtocols: number
    startDate: number
    endDate: number
    reviewDate: number
    lastReviewDate: number
    initialAssessment: number
    progressNotes: number
    goalsAchieved: number
    challengesFaced: number
    diagnosisCodes: number
    treatmentPlan: number
    restrictionsLimitations: number
    safetyConsiderations: number
    primaryCaregiver: number
    supervising: number
    familyContacts: number
    approvedBy: number
    approvedAt: number
    nextReviewBy: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type CarePlanAvgAggregateInputType = {
    version?: true
  }

  export type CarePlanSumAggregateInputType = {
    version?: true
  }

  export type CarePlanMinAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    category?: true
    specialInstructions?: true
    emergencyProtocols?: true
    startDate?: true
    endDate?: true
    reviewDate?: true
    lastReviewDate?: true
    initialAssessment?: true
    treatmentPlan?: true
    restrictionsLimitations?: true
    safetyConsiderations?: true
    primaryCaregiver?: true
    supervising?: true
    approvedBy?: true
    approvedAt?: true
    nextReviewBy?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type CarePlanMaxAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    category?: true
    specialInstructions?: true
    emergencyProtocols?: true
    startDate?: true
    endDate?: true
    reviewDate?: true
    lastReviewDate?: true
    initialAssessment?: true
    treatmentPlan?: true
    restrictionsLimitations?: true
    safetyConsiderations?: true
    primaryCaregiver?: true
    supervising?: true
    approvedBy?: true
    approvedAt?: true
    nextReviewBy?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type CarePlanCountAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    priority?: true
    category?: true
    goals?: true
    objectives?: true
    expectedOutcomes?: true
    standardActivities?: true
    specialInstructions?: true
    medicationReminders?: true
    emergencyProtocols?: true
    startDate?: true
    endDate?: true
    reviewDate?: true
    lastReviewDate?: true
    initialAssessment?: true
    progressNotes?: true
    goalsAchieved?: true
    challengesFaced?: true
    diagnosisCodes?: true
    treatmentPlan?: true
    restrictionsLimitations?: true
    safetyConsiderations?: true
    primaryCaregiver?: true
    supervising?: true
    familyContacts?: true
    approvedBy?: true
    approvedAt?: true
    nextReviewBy?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type CarePlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarePlan to aggregate.
     */
    where?: CarePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarePlans to fetch.
     */
    orderBy?: CarePlanOrderByWithRelationInput | CarePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CarePlans
    **/
    _count?: true | CarePlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarePlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarePlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarePlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarePlanMaxAggregateInputType
  }

  export type GetCarePlanAggregateType<T extends CarePlanAggregateArgs> = {
        [P in keyof T & keyof AggregateCarePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarePlan[P]>
      : GetScalarType<T[P], AggregateCarePlan[P]>
  }




  export type CarePlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarePlanWhereInput
    orderBy?: CarePlanOrderByWithAggregationInput | CarePlanOrderByWithAggregationInput[]
    by: CarePlanScalarFieldEnum[] | CarePlanScalarFieldEnum
    having?: CarePlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarePlanCountAggregateInputType | true
    _avg?: CarePlanAvgAggregateInputType
    _sum?: CarePlanSumAggregateInputType
    _min?: CarePlanMinAggregateInputType
    _max?: CarePlanMaxAggregateInputType
  }

  export type CarePlanGroupByOutputType = {
    id: string
    clientId: string
    name: string
    description: string | null
    status: $Enums.CarePlanStatus
    priority: string | null
    category: string | null
    goals: string[]
    objectives: JsonValue | null
    expectedOutcomes: string[]
    standardActivities: string[]
    specialInstructions: string | null
    medicationReminders: string[]
    emergencyProtocols: string | null
    startDate: Date
    endDate: Date | null
    reviewDate: Date | null
    lastReviewDate: Date | null
    initialAssessment: string | null
    progressNotes: string[]
    goalsAchieved: string[]
    challengesFaced: string[]
    diagnosisCodes: string[]
    treatmentPlan: string | null
    restrictionsLimitations: string | null
    safetyConsiderations: string | null
    primaryCaregiver: string | null
    supervising: string | null
    familyContacts: JsonValue | null
    approvedBy: string | null
    approvedAt: Date | null
    nextReviewBy: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: CarePlanCountAggregateOutputType | null
    _avg: CarePlanAvgAggregateOutputType | null
    _sum: CarePlanSumAggregateOutputType | null
    _min: CarePlanMinAggregateOutputType | null
    _max: CarePlanMaxAggregateOutputType | null
  }

  type GetCarePlanGroupByPayload<T extends CarePlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarePlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarePlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarePlanGroupByOutputType[P]>
            : GetScalarType<T[P], CarePlanGroupByOutputType[P]>
        }
      >
    >


  export type CarePlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    category?: boolean
    goals?: boolean
    objectives?: boolean
    expectedOutcomes?: boolean
    standardActivities?: boolean
    specialInstructions?: boolean
    medicationReminders?: boolean
    emergencyProtocols?: boolean
    startDate?: boolean
    endDate?: boolean
    reviewDate?: boolean
    lastReviewDate?: boolean
    initialAssessment?: boolean
    progressNotes?: boolean
    goalsAchieved?: boolean
    challengesFaced?: boolean
    diagnosisCodes?: boolean
    treatmentPlan?: boolean
    restrictionsLimitations?: boolean
    safetyConsiderations?: boolean
    primaryCaregiver?: boolean
    supervising?: boolean
    familyContacts?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    nextReviewBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    visits?: boolean | CarePlan$visitsArgs<ExtArgs>
    _count?: boolean | CarePlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carePlan"]>

  export type CarePlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    category?: boolean
    goals?: boolean
    objectives?: boolean
    expectedOutcomes?: boolean
    standardActivities?: boolean
    specialInstructions?: boolean
    medicationReminders?: boolean
    emergencyProtocols?: boolean
    startDate?: boolean
    endDate?: boolean
    reviewDate?: boolean
    lastReviewDate?: boolean
    initialAssessment?: boolean
    progressNotes?: boolean
    goalsAchieved?: boolean
    challengesFaced?: boolean
    diagnosisCodes?: boolean
    treatmentPlan?: boolean
    restrictionsLimitations?: boolean
    safetyConsiderations?: boolean
    primaryCaregiver?: boolean
    supervising?: boolean
    familyContacts?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    nextReviewBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carePlan"]>

  export type CarePlanSelectScalar = {
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    category?: boolean
    goals?: boolean
    objectives?: boolean
    expectedOutcomes?: boolean
    standardActivities?: boolean
    specialInstructions?: boolean
    medicationReminders?: boolean
    emergencyProtocols?: boolean
    startDate?: boolean
    endDate?: boolean
    reviewDate?: boolean
    lastReviewDate?: boolean
    initialAssessment?: boolean
    progressNotes?: boolean
    goalsAchieved?: boolean
    challengesFaced?: boolean
    diagnosisCodes?: boolean
    treatmentPlan?: boolean
    restrictionsLimitations?: boolean
    safetyConsiderations?: boolean
    primaryCaregiver?: boolean
    supervising?: boolean
    familyContacts?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    nextReviewBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type CarePlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    visits?: boolean | CarePlan$visitsArgs<ExtArgs>
    _count?: boolean | CarePlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CarePlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CarePlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarePlan"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      visits: Prisma.$VisitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      name: string
      description: string | null
      status: $Enums.CarePlanStatus
      priority: string | null
      category: string | null
      goals: string[]
      objectives: Prisma.JsonValue | null
      expectedOutcomes: string[]
      standardActivities: string[]
      specialInstructions: string | null
      medicationReminders: string[]
      emergencyProtocols: string | null
      startDate: Date
      endDate: Date | null
      reviewDate: Date | null
      lastReviewDate: Date | null
      initialAssessment: string | null
      progressNotes: string[]
      goalsAchieved: string[]
      challengesFaced: string[]
      diagnosisCodes: string[]
      treatmentPlan: string | null
      restrictionsLimitations: string | null
      safetyConsiderations: string | null
      primaryCaregiver: string | null
      supervising: string | null
      familyContacts: Prisma.JsonValue | null
      approvedBy: string | null
      approvedAt: Date | null
      nextReviewBy: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["carePlan"]>
    composites: {}
  }

  type CarePlanGetPayload<S extends boolean | null | undefined | CarePlanDefaultArgs> = $Result.GetResult<Prisma.$CarePlanPayload, S>

  type CarePlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CarePlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CarePlanCountAggregateInputType | true
    }

  export interface CarePlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CarePlan'], meta: { name: 'CarePlan' } }
    /**
     * Find zero or one CarePlan that matches the filter.
     * @param {CarePlanFindUniqueArgs} args - Arguments to find a CarePlan
     * @example
     * // Get one CarePlan
     * const carePlan = await prisma.carePlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarePlanFindUniqueArgs>(args: SelectSubset<T, CarePlanFindUniqueArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CarePlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CarePlanFindUniqueOrThrowArgs} args - Arguments to find a CarePlan
     * @example
     * // Get one CarePlan
     * const carePlan = await prisma.carePlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarePlanFindUniqueOrThrowArgs>(args: SelectSubset<T, CarePlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CarePlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanFindFirstArgs} args - Arguments to find a CarePlan
     * @example
     * // Get one CarePlan
     * const carePlan = await prisma.carePlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarePlanFindFirstArgs>(args?: SelectSubset<T, CarePlanFindFirstArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CarePlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanFindFirstOrThrowArgs} args - Arguments to find a CarePlan
     * @example
     * // Get one CarePlan
     * const carePlan = await prisma.carePlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarePlanFindFirstOrThrowArgs>(args?: SelectSubset<T, CarePlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CarePlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CarePlans
     * const carePlans = await prisma.carePlan.findMany()
     * 
     * // Get first 10 CarePlans
     * const carePlans = await prisma.carePlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carePlanWithIdOnly = await prisma.carePlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarePlanFindManyArgs>(args?: SelectSubset<T, CarePlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CarePlan.
     * @param {CarePlanCreateArgs} args - Arguments to create a CarePlan.
     * @example
     * // Create one CarePlan
     * const CarePlan = await prisma.carePlan.create({
     *   data: {
     *     // ... data to create a CarePlan
     *   }
     * })
     * 
     */
    create<T extends CarePlanCreateArgs>(args: SelectSubset<T, CarePlanCreateArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CarePlans.
     * @param {CarePlanCreateManyArgs} args - Arguments to create many CarePlans.
     * @example
     * // Create many CarePlans
     * const carePlan = await prisma.carePlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarePlanCreateManyArgs>(args?: SelectSubset<T, CarePlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CarePlans and returns the data saved in the database.
     * @param {CarePlanCreateManyAndReturnArgs} args - Arguments to create many CarePlans.
     * @example
     * // Create many CarePlans
     * const carePlan = await prisma.carePlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CarePlans and only return the `id`
     * const carePlanWithIdOnly = await prisma.carePlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarePlanCreateManyAndReturnArgs>(args?: SelectSubset<T, CarePlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CarePlan.
     * @param {CarePlanDeleteArgs} args - Arguments to delete one CarePlan.
     * @example
     * // Delete one CarePlan
     * const CarePlan = await prisma.carePlan.delete({
     *   where: {
     *     // ... filter to delete one CarePlan
     *   }
     * })
     * 
     */
    delete<T extends CarePlanDeleteArgs>(args: SelectSubset<T, CarePlanDeleteArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CarePlan.
     * @param {CarePlanUpdateArgs} args - Arguments to update one CarePlan.
     * @example
     * // Update one CarePlan
     * const carePlan = await prisma.carePlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarePlanUpdateArgs>(args: SelectSubset<T, CarePlanUpdateArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CarePlans.
     * @param {CarePlanDeleteManyArgs} args - Arguments to filter CarePlans to delete.
     * @example
     * // Delete a few CarePlans
     * const { count } = await prisma.carePlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarePlanDeleteManyArgs>(args?: SelectSubset<T, CarePlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CarePlans
     * const carePlan = await prisma.carePlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarePlanUpdateManyArgs>(args: SelectSubset<T, CarePlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CarePlan.
     * @param {CarePlanUpsertArgs} args - Arguments to update or create a CarePlan.
     * @example
     * // Update or create a CarePlan
     * const carePlan = await prisma.carePlan.upsert({
     *   create: {
     *     // ... data to create a CarePlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CarePlan we want to update
     *   }
     * })
     */
    upsert<T extends CarePlanUpsertArgs>(args: SelectSubset<T, CarePlanUpsertArgs<ExtArgs>>): Prisma__CarePlanClient<$Result.GetResult<Prisma.$CarePlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CarePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanCountArgs} args - Arguments to filter CarePlans to count.
     * @example
     * // Count the number of CarePlans
     * const count = await prisma.carePlan.count({
     *   where: {
     *     // ... the filter for the CarePlans we want to count
     *   }
     * })
    **/
    count<T extends CarePlanCountArgs>(
      args?: Subset<T, CarePlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarePlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CarePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarePlanAggregateArgs>(args: Subset<T, CarePlanAggregateArgs>): Prisma.PrismaPromise<GetCarePlanAggregateType<T>>

    /**
     * Group by CarePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarePlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarePlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarePlanGroupByArgs['orderBy'] }
        : { orderBy?: CarePlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarePlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarePlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CarePlan model
   */
  readonly fields: CarePlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CarePlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarePlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    visits<T extends CarePlan$visitsArgs<ExtArgs> = {}>(args?: Subset<T, CarePlan$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CarePlan model
   */ 
  interface CarePlanFieldRefs {
    readonly id: FieldRef<"CarePlan", 'String'>
    readonly clientId: FieldRef<"CarePlan", 'String'>
    readonly name: FieldRef<"CarePlan", 'String'>
    readonly description: FieldRef<"CarePlan", 'String'>
    readonly status: FieldRef<"CarePlan", 'CarePlanStatus'>
    readonly priority: FieldRef<"CarePlan", 'String'>
    readonly category: FieldRef<"CarePlan", 'String'>
    readonly goals: FieldRef<"CarePlan", 'String[]'>
    readonly objectives: FieldRef<"CarePlan", 'Json'>
    readonly expectedOutcomes: FieldRef<"CarePlan", 'String[]'>
    readonly standardActivities: FieldRef<"CarePlan", 'String[]'>
    readonly specialInstructions: FieldRef<"CarePlan", 'String'>
    readonly medicationReminders: FieldRef<"CarePlan", 'String[]'>
    readonly emergencyProtocols: FieldRef<"CarePlan", 'String'>
    readonly startDate: FieldRef<"CarePlan", 'DateTime'>
    readonly endDate: FieldRef<"CarePlan", 'DateTime'>
    readonly reviewDate: FieldRef<"CarePlan", 'DateTime'>
    readonly lastReviewDate: FieldRef<"CarePlan", 'DateTime'>
    readonly initialAssessment: FieldRef<"CarePlan", 'String'>
    readonly progressNotes: FieldRef<"CarePlan", 'String[]'>
    readonly goalsAchieved: FieldRef<"CarePlan", 'String[]'>
    readonly challengesFaced: FieldRef<"CarePlan", 'String[]'>
    readonly diagnosisCodes: FieldRef<"CarePlan", 'String[]'>
    readonly treatmentPlan: FieldRef<"CarePlan", 'String'>
    readonly restrictionsLimitations: FieldRef<"CarePlan", 'String'>
    readonly safetyConsiderations: FieldRef<"CarePlan", 'String'>
    readonly primaryCaregiver: FieldRef<"CarePlan", 'String'>
    readonly supervising: FieldRef<"CarePlan", 'String'>
    readonly familyContacts: FieldRef<"CarePlan", 'Json'>
    readonly approvedBy: FieldRef<"CarePlan", 'String'>
    readonly approvedAt: FieldRef<"CarePlan", 'DateTime'>
    readonly nextReviewBy: FieldRef<"CarePlan", 'String'>
    readonly createdAt: FieldRef<"CarePlan", 'DateTime'>
    readonly updatedAt: FieldRef<"CarePlan", 'DateTime'>
    readonly createdBy: FieldRef<"CarePlan", 'String'>
    readonly updatedBy: FieldRef<"CarePlan", 'String'>
    readonly deletedAt: FieldRef<"CarePlan", 'DateTime'>
    readonly version: FieldRef<"CarePlan", 'Int'>
    readonly dataClassification: FieldRef<"CarePlan", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * CarePlan findUnique
   */
  export type CarePlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter, which CarePlan to fetch.
     */
    where: CarePlanWhereUniqueInput
  }

  /**
   * CarePlan findUniqueOrThrow
   */
  export type CarePlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter, which CarePlan to fetch.
     */
    where: CarePlanWhereUniqueInput
  }

  /**
   * CarePlan findFirst
   */
  export type CarePlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter, which CarePlan to fetch.
     */
    where?: CarePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarePlans to fetch.
     */
    orderBy?: CarePlanOrderByWithRelationInput | CarePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarePlans.
     */
    cursor?: CarePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarePlans.
     */
    distinct?: CarePlanScalarFieldEnum | CarePlanScalarFieldEnum[]
  }

  /**
   * CarePlan findFirstOrThrow
   */
  export type CarePlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter, which CarePlan to fetch.
     */
    where?: CarePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarePlans to fetch.
     */
    orderBy?: CarePlanOrderByWithRelationInput | CarePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarePlans.
     */
    cursor?: CarePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarePlans.
     */
    distinct?: CarePlanScalarFieldEnum | CarePlanScalarFieldEnum[]
  }

  /**
   * CarePlan findMany
   */
  export type CarePlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter, which CarePlans to fetch.
     */
    where?: CarePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarePlans to fetch.
     */
    orderBy?: CarePlanOrderByWithRelationInput | CarePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CarePlans.
     */
    cursor?: CarePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarePlans.
     */
    skip?: number
    distinct?: CarePlanScalarFieldEnum | CarePlanScalarFieldEnum[]
  }

  /**
   * CarePlan create
   */
  export type CarePlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * The data needed to create a CarePlan.
     */
    data: XOR<CarePlanCreateInput, CarePlanUncheckedCreateInput>
  }

  /**
   * CarePlan createMany
   */
  export type CarePlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CarePlans.
     */
    data: CarePlanCreateManyInput | CarePlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CarePlan createManyAndReturn
   */
  export type CarePlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CarePlans.
     */
    data: CarePlanCreateManyInput | CarePlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarePlan update
   */
  export type CarePlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * The data needed to update a CarePlan.
     */
    data: XOR<CarePlanUpdateInput, CarePlanUncheckedUpdateInput>
    /**
     * Choose, which CarePlan to update.
     */
    where: CarePlanWhereUniqueInput
  }

  /**
   * CarePlan updateMany
   */
  export type CarePlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CarePlans.
     */
    data: XOR<CarePlanUpdateManyMutationInput, CarePlanUncheckedUpdateManyInput>
    /**
     * Filter which CarePlans to update
     */
    where?: CarePlanWhereInput
  }

  /**
   * CarePlan upsert
   */
  export type CarePlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * The filter to search for the CarePlan to update in case it exists.
     */
    where: CarePlanWhereUniqueInput
    /**
     * In case the CarePlan found by the `where` argument doesn't exist, create a new CarePlan with this data.
     */
    create: XOR<CarePlanCreateInput, CarePlanUncheckedCreateInput>
    /**
     * In case the CarePlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarePlanUpdateInput, CarePlanUncheckedUpdateInput>
  }

  /**
   * CarePlan delete
   */
  export type CarePlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
    /**
     * Filter which CarePlan to delete.
     */
    where: CarePlanWhereUniqueInput
  }

  /**
   * CarePlan deleteMany
   */
  export type CarePlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarePlans to delete
     */
    where?: CarePlanWhereInput
  }

  /**
   * CarePlan.visits
   */
  export type CarePlan$visitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
    orderBy?: VisitOrderByWithRelationInput | VisitOrderByWithRelationInput[]
    cursor?: VisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitScalarFieldEnum | VisitScalarFieldEnum[]
  }

  /**
   * CarePlan without action
   */
  export type CarePlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarePlan
     */
    select?: CarePlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarePlanInclude<ExtArgs> | null
  }


  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    totalAllocated: Decimal | null
    totalSpent: Decimal | null
    totalCommitted: Decimal | null
    remaining: Decimal | null
    fiscalYear: number | null
    personalCare: Decimal | null
    medicalServices: Decimal | null
    transportation: Decimal | null
    homeModifications: Decimal | null
    emergencyFund: Decimal | null
    other: Decimal | null
    personalCareSpent: Decimal | null
    medicalServicesSpent: Decimal | null
    transportationSpent: Decimal | null
    homeModificationsSpent: Decimal | null
    emergencyFundSpent: Decimal | null
    otherSpent: Decimal | null
    warningThreshold: Decimal | null
    criticalThreshold: Decimal | null
    version: number | null
  }

  export type BudgetSumAggregateOutputType = {
    totalAllocated: Decimal | null
    totalSpent: Decimal | null
    totalCommitted: Decimal | null
    remaining: Decimal | null
    fiscalYear: number | null
    personalCare: Decimal | null
    medicalServices: Decimal | null
    transportation: Decimal | null
    homeModifications: Decimal | null
    emergencyFund: Decimal | null
    other: Decimal | null
    personalCareSpent: Decimal | null
    medicalServicesSpent: Decimal | null
    transportationSpent: Decimal | null
    homeModificationsSpent: Decimal | null
    emergencyFundSpent: Decimal | null
    otherSpent: Decimal | null
    warningThreshold: Decimal | null
    criticalThreshold: Decimal | null
    version: number | null
  }

  export type BudgetMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    description: string | null
    status: $Enums.BudgetStatus | null
    budgetType: string | null
    totalAllocated: Decimal | null
    totalSpent: Decimal | null
    totalCommitted: Decimal | null
    remaining: Decimal | null
    periodStart: Date | null
    periodEnd: Date | null
    fiscalYear: number | null
    personalCare: Decimal | null
    medicalServices: Decimal | null
    transportation: Decimal | null
    homeModifications: Decimal | null
    emergencyFund: Decimal | null
    other: Decimal | null
    personalCareSpent: Decimal | null
    medicalServicesSpent: Decimal | null
    transportationSpent: Decimal | null
    homeModificationsSpent: Decimal | null
    emergencyFundSpent: Decimal | null
    otherSpent: Decimal | null
    approvedBy: string | null
    approvedAt: Date | null
    lastReviewDate: Date | null
    nextReviewDate: Date | null
    autoRenew: boolean | null
    warningThreshold: Decimal | null
    criticalThreshold: Decimal | null
    alertsEnabled: boolean | null
    fundingSource: string | null
    authorizationNumber: string | null
    authorizationExpiry: Date | null
    notes: string | null
    restrictions: string | null
    approvalRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    name: string | null
    description: string | null
    status: $Enums.BudgetStatus | null
    budgetType: string | null
    totalAllocated: Decimal | null
    totalSpent: Decimal | null
    totalCommitted: Decimal | null
    remaining: Decimal | null
    periodStart: Date | null
    periodEnd: Date | null
    fiscalYear: number | null
    personalCare: Decimal | null
    medicalServices: Decimal | null
    transportation: Decimal | null
    homeModifications: Decimal | null
    emergencyFund: Decimal | null
    other: Decimal | null
    personalCareSpent: Decimal | null
    medicalServicesSpent: Decimal | null
    transportationSpent: Decimal | null
    homeModificationsSpent: Decimal | null
    emergencyFundSpent: Decimal | null
    otherSpent: Decimal | null
    approvedBy: string | null
    approvedAt: Date | null
    lastReviewDate: Date | null
    nextReviewDate: Date | null
    autoRenew: boolean | null
    warningThreshold: Decimal | null
    criticalThreshold: Decimal | null
    alertsEnabled: boolean | null
    fundingSource: string | null
    authorizationNumber: string | null
    authorizationExpiry: Date | null
    notes: string | null
    restrictions: string | null
    approvalRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    clientId: number
    name: number
    description: number
    status: number
    budgetType: number
    totalAllocated: number
    totalSpent: number
    totalCommitted: number
    remaining: number
    periodStart: number
    periodEnd: number
    fiscalYear: number
    personalCare: number
    medicalServices: number
    transportation: number
    homeModifications: number
    emergencyFund: number
    other: number
    personalCareSpent: number
    medicalServicesSpent: number
    transportationSpent: number
    homeModificationsSpent: number
    emergencyFundSpent: number
    otherSpent: number
    approvedBy: number
    approvedAt: number
    lastReviewDate: number
    nextReviewDate: number
    autoRenew: number
    warningThreshold: number
    criticalThreshold: number
    alertsEnabled: number
    fundingSource: number
    authorizationNumber: number
    authorizationExpiry: number
    notes: number
    restrictions: number
    approvalRequired: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    totalAllocated?: true
    totalSpent?: true
    totalCommitted?: true
    remaining?: true
    fiscalYear?: true
    personalCare?: true
    medicalServices?: true
    transportation?: true
    homeModifications?: true
    emergencyFund?: true
    other?: true
    personalCareSpent?: true
    medicalServicesSpent?: true
    transportationSpent?: true
    homeModificationsSpent?: true
    emergencyFundSpent?: true
    otherSpent?: true
    warningThreshold?: true
    criticalThreshold?: true
    version?: true
  }

  export type BudgetSumAggregateInputType = {
    totalAllocated?: true
    totalSpent?: true
    totalCommitted?: true
    remaining?: true
    fiscalYear?: true
    personalCare?: true
    medicalServices?: true
    transportation?: true
    homeModifications?: true
    emergencyFund?: true
    other?: true
    personalCareSpent?: true
    medicalServicesSpent?: true
    transportationSpent?: true
    homeModificationsSpent?: true
    emergencyFundSpent?: true
    otherSpent?: true
    warningThreshold?: true
    criticalThreshold?: true
    version?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    budgetType?: true
    totalAllocated?: true
    totalSpent?: true
    totalCommitted?: true
    remaining?: true
    periodStart?: true
    periodEnd?: true
    fiscalYear?: true
    personalCare?: true
    medicalServices?: true
    transportation?: true
    homeModifications?: true
    emergencyFund?: true
    other?: true
    personalCareSpent?: true
    medicalServicesSpent?: true
    transportationSpent?: true
    homeModificationsSpent?: true
    emergencyFundSpent?: true
    otherSpent?: true
    approvedBy?: true
    approvedAt?: true
    lastReviewDate?: true
    nextReviewDate?: true
    autoRenew?: true
    warningThreshold?: true
    criticalThreshold?: true
    alertsEnabled?: true
    fundingSource?: true
    authorizationNumber?: true
    authorizationExpiry?: true
    notes?: true
    restrictions?: true
    approvalRequired?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    budgetType?: true
    totalAllocated?: true
    totalSpent?: true
    totalCommitted?: true
    remaining?: true
    periodStart?: true
    periodEnd?: true
    fiscalYear?: true
    personalCare?: true
    medicalServices?: true
    transportation?: true
    homeModifications?: true
    emergencyFund?: true
    other?: true
    personalCareSpent?: true
    medicalServicesSpent?: true
    transportationSpent?: true
    homeModificationsSpent?: true
    emergencyFundSpent?: true
    otherSpent?: true
    approvedBy?: true
    approvedAt?: true
    lastReviewDate?: true
    nextReviewDate?: true
    autoRenew?: true
    warningThreshold?: true
    criticalThreshold?: true
    alertsEnabled?: true
    fundingSource?: true
    authorizationNumber?: true
    authorizationExpiry?: true
    notes?: true
    restrictions?: true
    approvalRequired?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    clientId?: true
    name?: true
    description?: true
    status?: true
    budgetType?: true
    totalAllocated?: true
    totalSpent?: true
    totalCommitted?: true
    remaining?: true
    periodStart?: true
    periodEnd?: true
    fiscalYear?: true
    personalCare?: true
    medicalServices?: true
    transportation?: true
    homeModifications?: true
    emergencyFund?: true
    other?: true
    personalCareSpent?: true
    medicalServicesSpent?: true
    transportationSpent?: true
    homeModificationsSpent?: true
    emergencyFundSpent?: true
    otherSpent?: true
    approvedBy?: true
    approvedAt?: true
    lastReviewDate?: true
    nextReviewDate?: true
    autoRenew?: true
    warningThreshold?: true
    criticalThreshold?: true
    alertsEnabled?: true
    fundingSource?: true
    authorizationNumber?: true
    authorizationExpiry?: true
    notes?: true
    restrictions?: true
    approvalRequired?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type BudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithAggregationInput | BudgetOrderByWithAggregationInput[]
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }

  export type BudgetGroupByOutputType = {
    id: string
    clientId: string
    name: string
    description: string | null
    status: $Enums.BudgetStatus
    budgetType: string
    totalAllocated: Decimal
    totalSpent: Decimal
    totalCommitted: Decimal
    remaining: Decimal
    periodStart: Date
    periodEnd: Date
    fiscalYear: number | null
    personalCare: Decimal | null
    medicalServices: Decimal | null
    transportation: Decimal | null
    homeModifications: Decimal | null
    emergencyFund: Decimal | null
    other: Decimal | null
    personalCareSpent: Decimal | null
    medicalServicesSpent: Decimal | null
    transportationSpent: Decimal | null
    homeModificationsSpent: Decimal | null
    emergencyFundSpent: Decimal | null
    otherSpent: Decimal | null
    approvedBy: string | null
    approvedAt: Date | null
    lastReviewDate: Date | null
    nextReviewDate: Date | null
    autoRenew: boolean
    warningThreshold: Decimal | null
    criticalThreshold: Decimal | null
    alertsEnabled: boolean
    fundingSource: string | null
    authorizationNumber: string | null
    authorizationExpiry: Date | null
    notes: string | null
    restrictions: string | null
    approvalRequired: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    budgetType?: boolean
    totalAllocated?: boolean
    totalSpent?: boolean
    totalCommitted?: boolean
    remaining?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    fiscalYear?: boolean
    personalCare?: boolean
    medicalServices?: boolean
    transportation?: boolean
    homeModifications?: boolean
    emergencyFund?: boolean
    other?: boolean
    personalCareSpent?: boolean
    medicalServicesSpent?: boolean
    transportationSpent?: boolean
    homeModificationsSpent?: boolean
    emergencyFundSpent?: boolean
    otherSpent?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    lastReviewDate?: boolean
    nextReviewDate?: boolean
    autoRenew?: boolean
    warningThreshold?: boolean
    criticalThreshold?: boolean
    alertsEnabled?: boolean
    fundingSource?: boolean
    authorizationNumber?: boolean
    authorizationExpiry?: boolean
    notes?: boolean
    restrictions?: boolean
    approvalRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    expenses?: boolean | Budget$expensesArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    budgetType?: boolean
    totalAllocated?: boolean
    totalSpent?: boolean
    totalCommitted?: boolean
    remaining?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    fiscalYear?: boolean
    personalCare?: boolean
    medicalServices?: boolean
    transportation?: boolean
    homeModifications?: boolean
    emergencyFund?: boolean
    other?: boolean
    personalCareSpent?: boolean
    medicalServicesSpent?: boolean
    transportationSpent?: boolean
    homeModificationsSpent?: boolean
    emergencyFundSpent?: boolean
    otherSpent?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    lastReviewDate?: boolean
    nextReviewDate?: boolean
    autoRenew?: boolean
    warningThreshold?: boolean
    criticalThreshold?: boolean
    alertsEnabled?: boolean
    fundingSource?: boolean
    authorizationNumber?: boolean
    authorizationExpiry?: boolean
    notes?: boolean
    restrictions?: boolean
    approvalRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>

  export type BudgetSelectScalar = {
    id?: boolean
    clientId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    budgetType?: boolean
    totalAllocated?: boolean
    totalSpent?: boolean
    totalCommitted?: boolean
    remaining?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    fiscalYear?: boolean
    personalCare?: boolean
    medicalServices?: boolean
    transportation?: boolean
    homeModifications?: boolean
    emergencyFund?: boolean
    other?: boolean
    personalCareSpent?: boolean
    medicalServicesSpent?: boolean
    transportationSpent?: boolean
    homeModificationsSpent?: boolean
    emergencyFundSpent?: boolean
    otherSpent?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    lastReviewDate?: boolean
    nextReviewDate?: boolean
    autoRenew?: boolean
    warningThreshold?: boolean
    criticalThreshold?: boolean
    alertsEnabled?: boolean
    fundingSource?: boolean
    authorizationNumber?: boolean
    authorizationExpiry?: boolean
    notes?: boolean
    restrictions?: boolean
    approvalRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type BudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    expenses?: boolean | Budget$expensesArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BudgetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Budget"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      expenses: Prisma.$BudgetExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      name: string
      description: string | null
      status: $Enums.BudgetStatus
      budgetType: string
      totalAllocated: Prisma.Decimal
      totalSpent: Prisma.Decimal
      totalCommitted: Prisma.Decimal
      remaining: Prisma.Decimal
      periodStart: Date
      periodEnd: Date
      fiscalYear: number | null
      personalCare: Prisma.Decimal | null
      medicalServices: Prisma.Decimal | null
      transportation: Prisma.Decimal | null
      homeModifications: Prisma.Decimal | null
      emergencyFund: Prisma.Decimal | null
      other: Prisma.Decimal | null
      personalCareSpent: Prisma.Decimal | null
      medicalServicesSpent: Prisma.Decimal | null
      transportationSpent: Prisma.Decimal | null
      homeModificationsSpent: Prisma.Decimal | null
      emergencyFundSpent: Prisma.Decimal | null
      otherSpent: Prisma.Decimal | null
      approvedBy: string | null
      approvedAt: Date | null
      lastReviewDate: Date | null
      nextReviewDate: Date | null
      autoRenew: boolean
      warningThreshold: Prisma.Decimal | null
      criticalThreshold: Prisma.Decimal | null
      alertsEnabled: boolean
      fundingSource: string | null
      authorizationNumber: string | null
      authorizationExpiry: Date | null
      notes: string | null
      restrictions: string | null
      approvalRequired: boolean
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["budget"]>
    composites: {}
  }

  type BudgetGetPayload<S extends boolean | null | undefined | BudgetDefaultArgs> = $Result.GetResult<Prisma.$BudgetPayload, S>

  type BudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BudgetCountAggregateInputType | true
    }

  export interface BudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Budget'], meta: { name: 'Budget' } }
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetFindManyArgs>(args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
     */
    create<T extends BudgetCreateArgs>(args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCreateManyArgs>(args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Budgets and returns the data saved in the database.
     * @param {BudgetCreateManyAndReturnArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Budgets and only return the `id`
     * const budgetWithIdOnly = await prisma.budget.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
     */
    delete<T extends BudgetDeleteArgs>(args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetUpdateArgs>(args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetDeleteManyArgs>(args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetUpdateManyArgs>(args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): Prisma.PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Budget model
   */
  readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    expenses<T extends Budget$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Budget$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Budget model
   */ 
  interface BudgetFieldRefs {
    readonly id: FieldRef<"Budget", 'String'>
    readonly clientId: FieldRef<"Budget", 'String'>
    readonly name: FieldRef<"Budget", 'String'>
    readonly description: FieldRef<"Budget", 'String'>
    readonly status: FieldRef<"Budget", 'BudgetStatus'>
    readonly budgetType: FieldRef<"Budget", 'String'>
    readonly totalAllocated: FieldRef<"Budget", 'Decimal'>
    readonly totalSpent: FieldRef<"Budget", 'Decimal'>
    readonly totalCommitted: FieldRef<"Budget", 'Decimal'>
    readonly remaining: FieldRef<"Budget", 'Decimal'>
    readonly periodStart: FieldRef<"Budget", 'DateTime'>
    readonly periodEnd: FieldRef<"Budget", 'DateTime'>
    readonly fiscalYear: FieldRef<"Budget", 'Int'>
    readonly personalCare: FieldRef<"Budget", 'Decimal'>
    readonly medicalServices: FieldRef<"Budget", 'Decimal'>
    readonly transportation: FieldRef<"Budget", 'Decimal'>
    readonly homeModifications: FieldRef<"Budget", 'Decimal'>
    readonly emergencyFund: FieldRef<"Budget", 'Decimal'>
    readonly other: FieldRef<"Budget", 'Decimal'>
    readonly personalCareSpent: FieldRef<"Budget", 'Decimal'>
    readonly medicalServicesSpent: FieldRef<"Budget", 'Decimal'>
    readonly transportationSpent: FieldRef<"Budget", 'Decimal'>
    readonly homeModificationsSpent: FieldRef<"Budget", 'Decimal'>
    readonly emergencyFundSpent: FieldRef<"Budget", 'Decimal'>
    readonly otherSpent: FieldRef<"Budget", 'Decimal'>
    readonly approvedBy: FieldRef<"Budget", 'String'>
    readonly approvedAt: FieldRef<"Budget", 'DateTime'>
    readonly lastReviewDate: FieldRef<"Budget", 'DateTime'>
    readonly nextReviewDate: FieldRef<"Budget", 'DateTime'>
    readonly autoRenew: FieldRef<"Budget", 'Boolean'>
    readonly warningThreshold: FieldRef<"Budget", 'Decimal'>
    readonly criticalThreshold: FieldRef<"Budget", 'Decimal'>
    readonly alertsEnabled: FieldRef<"Budget", 'Boolean'>
    readonly fundingSource: FieldRef<"Budget", 'String'>
    readonly authorizationNumber: FieldRef<"Budget", 'String'>
    readonly authorizationExpiry: FieldRef<"Budget", 'DateTime'>
    readonly notes: FieldRef<"Budget", 'String'>
    readonly restrictions: FieldRef<"Budget", 'String'>
    readonly approvalRequired: FieldRef<"Budget", 'Boolean'>
    readonly createdAt: FieldRef<"Budget", 'DateTime'>
    readonly updatedAt: FieldRef<"Budget", 'DateTime'>
    readonly createdBy: FieldRef<"Budget", 'String'>
    readonly updatedBy: FieldRef<"Budget", 'String'>
    readonly deletedAt: FieldRef<"Budget", 'DateTime'>
    readonly version: FieldRef<"Budget", 'Int'>
    readonly dataClassification: FieldRef<"Budget", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget create
   */
  export type BudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Budget createManyAndReturn
   */
  export type BudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
  }

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput
  }

  /**
   * Budget.expenses
   */
  export type Budget$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    where?: BudgetExpenseWhereInput
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    cursor?: BudgetExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetExpenseScalarFieldEnum | BudgetExpenseScalarFieldEnum[]
  }

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
  }


  /**
   * Model BudgetExpense
   */

  export type AggregateBudgetExpense = {
    _count: BudgetExpenseCountAggregateOutputType | null
    _avg: BudgetExpenseAvgAggregateOutputType | null
    _sum: BudgetExpenseSumAggregateOutputType | null
    _min: BudgetExpenseMinAggregateOutputType | null
    _max: BudgetExpenseMaxAggregateOutputType | null
  }

  export type BudgetExpenseAvgAggregateOutputType = {
    amount: Decimal | null
    version: number | null
  }

  export type BudgetExpenseSumAggregateOutputType = {
    amount: Decimal | null
    version: number | null
  }

  export type BudgetExpenseMinAggregateOutputType = {
    id: string | null
    budgetId: string | null
    visitId: string | null
    description: string | null
    category: string | null
    amount: Decimal | null
    expenseDate: Date | null
    approvedBy: string | null
    approvedAt: Date | null
    status: string | null
    receiptUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type BudgetExpenseMaxAggregateOutputType = {
    id: string | null
    budgetId: string | null
    visitId: string | null
    description: string | null
    category: string | null
    amount: Decimal | null
    expenseDate: Date | null
    approvedBy: string | null
    approvedAt: Date | null
    status: string | null
    receiptUrl: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number | null
    dataClassification: $Enums.DataClassification | null
  }

  export type BudgetExpenseCountAggregateOutputType = {
    id: number
    budgetId: number
    visitId: number
    description: number
    category: number
    amount: number
    expenseDate: number
    approvedBy: number
    approvedAt: number
    status: number
    receiptUrl: number
    notes: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    deletedAt: number
    version: number
    dataClassification: number
    _all: number
  }


  export type BudgetExpenseAvgAggregateInputType = {
    amount?: true
    version?: true
  }

  export type BudgetExpenseSumAggregateInputType = {
    amount?: true
    version?: true
  }

  export type BudgetExpenseMinAggregateInputType = {
    id?: true
    budgetId?: true
    visitId?: true
    description?: true
    category?: true
    amount?: true
    expenseDate?: true
    approvedBy?: true
    approvedAt?: true
    status?: true
    receiptUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type BudgetExpenseMaxAggregateInputType = {
    id?: true
    budgetId?: true
    visitId?: true
    description?: true
    category?: true
    amount?: true
    expenseDate?: true
    approvedBy?: true
    approvedAt?: true
    status?: true
    receiptUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
  }

  export type BudgetExpenseCountAggregateInputType = {
    id?: true
    budgetId?: true
    visitId?: true
    description?: true
    category?: true
    amount?: true
    expenseDate?: true
    approvedBy?: true
    approvedAt?: true
    status?: true
    receiptUrl?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    deletedAt?: true
    version?: true
    dataClassification?: true
    _all?: true
  }

  export type BudgetExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetExpense to aggregate.
     */
    where?: BudgetExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetExpenses to fetch.
     */
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BudgetExpenses
    **/
    _count?: true | BudgetExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetExpenseMaxAggregateInputType
  }

  export type GetBudgetExpenseAggregateType<T extends BudgetExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgetExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgetExpense[P]>
      : GetScalarType<T[P], AggregateBudgetExpense[P]>
  }




  export type BudgetExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetExpenseWhereInput
    orderBy?: BudgetExpenseOrderByWithAggregationInput | BudgetExpenseOrderByWithAggregationInput[]
    by: BudgetExpenseScalarFieldEnum[] | BudgetExpenseScalarFieldEnum
    having?: BudgetExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetExpenseCountAggregateInputType | true
    _avg?: BudgetExpenseAvgAggregateInputType
    _sum?: BudgetExpenseSumAggregateInputType
    _min?: BudgetExpenseMinAggregateInputType
    _max?: BudgetExpenseMaxAggregateInputType
  }

  export type BudgetExpenseGroupByOutputType = {
    id: string
    budgetId: string
    visitId: string | null
    description: string
    category: string
    amount: Decimal
    expenseDate: Date
    approvedBy: string | null
    approvedAt: Date | null
    status: string
    receiptUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    deletedAt: Date | null
    version: number
    dataClassification: $Enums.DataClassification
    _count: BudgetExpenseCountAggregateOutputType | null
    _avg: BudgetExpenseAvgAggregateOutputType | null
    _sum: BudgetExpenseSumAggregateOutputType | null
    _min: BudgetExpenseMinAggregateOutputType | null
    _max: BudgetExpenseMaxAggregateOutputType | null
  }

  type GetBudgetExpenseGroupByPayload<T extends BudgetExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetExpenseGroupByOutputType[P]>
        }
      >
    >


  export type BudgetExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    budgetId?: boolean
    visitId?: boolean
    description?: boolean
    category?: boolean
    amount?: boolean
    expenseDate?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    status?: boolean
    receiptUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    visit?: boolean | BudgetExpense$visitArgs<ExtArgs>
  }, ExtArgs["result"]["budgetExpense"]>

  export type BudgetExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    budgetId?: boolean
    visitId?: boolean
    description?: boolean
    category?: boolean
    amount?: boolean
    expenseDate?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    status?: boolean
    receiptUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    visit?: boolean | BudgetExpense$visitArgs<ExtArgs>
  }, ExtArgs["result"]["budgetExpense"]>

  export type BudgetExpenseSelectScalar = {
    id?: boolean
    budgetId?: boolean
    visitId?: boolean
    description?: boolean
    category?: boolean
    amount?: boolean
    expenseDate?: boolean
    approvedBy?: boolean
    approvedAt?: boolean
    status?: boolean
    receiptUrl?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedAt?: boolean
    version?: boolean
    dataClassification?: boolean
  }

  export type BudgetExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    visit?: boolean | BudgetExpense$visitArgs<ExtArgs>
  }
  export type BudgetExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budget?: boolean | BudgetDefaultArgs<ExtArgs>
    visit?: boolean | BudgetExpense$visitArgs<ExtArgs>
  }

  export type $BudgetExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BudgetExpense"
    objects: {
      budget: Prisma.$BudgetPayload<ExtArgs>
      visit: Prisma.$VisitPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      budgetId: string
      visitId: string | null
      description: string
      category: string
      amount: Prisma.Decimal
      expenseDate: Date
      approvedBy: string | null
      approvedAt: Date | null
      status: string
      receiptUrl: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
      deletedAt: Date | null
      version: number
      dataClassification: $Enums.DataClassification
    }, ExtArgs["result"]["budgetExpense"]>
    composites: {}
  }

  type BudgetExpenseGetPayload<S extends boolean | null | undefined | BudgetExpenseDefaultArgs> = $Result.GetResult<Prisma.$BudgetExpensePayload, S>

  type BudgetExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BudgetExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BudgetExpenseCountAggregateInputType | true
    }

  export interface BudgetExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BudgetExpense'], meta: { name: 'BudgetExpense' } }
    /**
     * Find zero or one BudgetExpense that matches the filter.
     * @param {BudgetExpenseFindUniqueArgs} args - Arguments to find a BudgetExpense
     * @example
     * // Get one BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetExpenseFindUniqueArgs>(args: SelectSubset<T, BudgetExpenseFindUniqueArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BudgetExpense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BudgetExpenseFindUniqueOrThrowArgs} args - Arguments to find a BudgetExpense
     * @example
     * // Get one BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BudgetExpense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseFindFirstArgs} args - Arguments to find a BudgetExpense
     * @example
     * // Get one BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetExpenseFindFirstArgs>(args?: SelectSubset<T, BudgetExpenseFindFirstArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BudgetExpense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseFindFirstOrThrowArgs} args - Arguments to find a BudgetExpense
     * @example
     * // Get one BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BudgetExpenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BudgetExpenses
     * const budgetExpenses = await prisma.budgetExpense.findMany()
     * 
     * // Get first 10 BudgetExpenses
     * const budgetExpenses = await prisma.budgetExpense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetExpenseWithIdOnly = await prisma.budgetExpense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetExpenseFindManyArgs>(args?: SelectSubset<T, BudgetExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BudgetExpense.
     * @param {BudgetExpenseCreateArgs} args - Arguments to create a BudgetExpense.
     * @example
     * // Create one BudgetExpense
     * const BudgetExpense = await prisma.budgetExpense.create({
     *   data: {
     *     // ... data to create a BudgetExpense
     *   }
     * })
     * 
     */
    create<T extends BudgetExpenseCreateArgs>(args: SelectSubset<T, BudgetExpenseCreateArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BudgetExpenses.
     * @param {BudgetExpenseCreateManyArgs} args - Arguments to create many BudgetExpenses.
     * @example
     * // Create many BudgetExpenses
     * const budgetExpense = await prisma.budgetExpense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetExpenseCreateManyArgs>(args?: SelectSubset<T, BudgetExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BudgetExpenses and returns the data saved in the database.
     * @param {BudgetExpenseCreateManyAndReturnArgs} args - Arguments to create many BudgetExpenses.
     * @example
     * // Create many BudgetExpenses
     * const budgetExpense = await prisma.budgetExpense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BudgetExpenses and only return the `id`
     * const budgetExpenseWithIdOnly = await prisma.budgetExpense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BudgetExpense.
     * @param {BudgetExpenseDeleteArgs} args - Arguments to delete one BudgetExpense.
     * @example
     * // Delete one BudgetExpense
     * const BudgetExpense = await prisma.budgetExpense.delete({
     *   where: {
     *     // ... filter to delete one BudgetExpense
     *   }
     * })
     * 
     */
    delete<T extends BudgetExpenseDeleteArgs>(args: SelectSubset<T, BudgetExpenseDeleteArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BudgetExpense.
     * @param {BudgetExpenseUpdateArgs} args - Arguments to update one BudgetExpense.
     * @example
     * // Update one BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetExpenseUpdateArgs>(args: SelectSubset<T, BudgetExpenseUpdateArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BudgetExpenses.
     * @param {BudgetExpenseDeleteManyArgs} args - Arguments to filter BudgetExpenses to delete.
     * @example
     * // Delete a few BudgetExpenses
     * const { count } = await prisma.budgetExpense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetExpenseDeleteManyArgs>(args?: SelectSubset<T, BudgetExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BudgetExpenses
     * const budgetExpense = await prisma.budgetExpense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetExpenseUpdateManyArgs>(args: SelectSubset<T, BudgetExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BudgetExpense.
     * @param {BudgetExpenseUpsertArgs} args - Arguments to update or create a BudgetExpense.
     * @example
     * // Update or create a BudgetExpense
     * const budgetExpense = await prisma.budgetExpense.upsert({
     *   create: {
     *     // ... data to create a BudgetExpense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BudgetExpense we want to update
     *   }
     * })
     */
    upsert<T extends BudgetExpenseUpsertArgs>(args: SelectSubset<T, BudgetExpenseUpsertArgs<ExtArgs>>): Prisma__BudgetExpenseClient<$Result.GetResult<Prisma.$BudgetExpensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BudgetExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseCountArgs} args - Arguments to filter BudgetExpenses to count.
     * @example
     * // Count the number of BudgetExpenses
     * const count = await prisma.budgetExpense.count({
     *   where: {
     *     // ... the filter for the BudgetExpenses we want to count
     *   }
     * })
    **/
    count<T extends BudgetExpenseCountArgs>(
      args?: Subset<T, BudgetExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BudgetExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetExpenseAggregateArgs>(args: Subset<T, BudgetExpenseAggregateArgs>): Prisma.PrismaPromise<GetBudgetExpenseAggregateType<T>>

    /**
     * Group by BudgetExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetExpenseGroupByArgs['orderBy'] }
        : { orderBy?: BudgetExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BudgetExpense model
   */
  readonly fields: BudgetExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BudgetExpense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budget<T extends BudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BudgetDefaultArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    visit<T extends BudgetExpense$visitArgs<ExtArgs> = {}>(args?: Subset<T, BudgetExpense$visitArgs<ExtArgs>>): Prisma__VisitClient<$Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BudgetExpense model
   */ 
  interface BudgetExpenseFieldRefs {
    readonly id: FieldRef<"BudgetExpense", 'String'>
    readonly budgetId: FieldRef<"BudgetExpense", 'String'>
    readonly visitId: FieldRef<"BudgetExpense", 'String'>
    readonly description: FieldRef<"BudgetExpense", 'String'>
    readonly category: FieldRef<"BudgetExpense", 'String'>
    readonly amount: FieldRef<"BudgetExpense", 'Decimal'>
    readonly expenseDate: FieldRef<"BudgetExpense", 'DateTime'>
    readonly approvedBy: FieldRef<"BudgetExpense", 'String'>
    readonly approvedAt: FieldRef<"BudgetExpense", 'DateTime'>
    readonly status: FieldRef<"BudgetExpense", 'String'>
    readonly receiptUrl: FieldRef<"BudgetExpense", 'String'>
    readonly notes: FieldRef<"BudgetExpense", 'String'>
    readonly createdAt: FieldRef<"BudgetExpense", 'DateTime'>
    readonly updatedAt: FieldRef<"BudgetExpense", 'DateTime'>
    readonly createdBy: FieldRef<"BudgetExpense", 'String'>
    readonly updatedBy: FieldRef<"BudgetExpense", 'String'>
    readonly deletedAt: FieldRef<"BudgetExpense", 'DateTime'>
    readonly version: FieldRef<"BudgetExpense", 'Int'>
    readonly dataClassification: FieldRef<"BudgetExpense", 'DataClassification'>
  }
    

  // Custom InputTypes
  /**
   * BudgetExpense findUnique
   */
  export type BudgetExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter, which BudgetExpense to fetch.
     */
    where: BudgetExpenseWhereUniqueInput
  }

  /**
   * BudgetExpense findUniqueOrThrow
   */
  export type BudgetExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter, which BudgetExpense to fetch.
     */
    where: BudgetExpenseWhereUniqueInput
  }

  /**
   * BudgetExpense findFirst
   */
  export type BudgetExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter, which BudgetExpense to fetch.
     */
    where?: BudgetExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetExpenses to fetch.
     */
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetExpenses.
     */
    cursor?: BudgetExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetExpenses.
     */
    distinct?: BudgetExpenseScalarFieldEnum | BudgetExpenseScalarFieldEnum[]
  }

  /**
   * BudgetExpense findFirstOrThrow
   */
  export type BudgetExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter, which BudgetExpense to fetch.
     */
    where?: BudgetExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetExpenses to fetch.
     */
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetExpenses.
     */
    cursor?: BudgetExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetExpenses.
     */
    distinct?: BudgetExpenseScalarFieldEnum | BudgetExpenseScalarFieldEnum[]
  }

  /**
   * BudgetExpense findMany
   */
  export type BudgetExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter, which BudgetExpenses to fetch.
     */
    where?: BudgetExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetExpenses to fetch.
     */
    orderBy?: BudgetExpenseOrderByWithRelationInput | BudgetExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BudgetExpenses.
     */
    cursor?: BudgetExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetExpenses.
     */
    skip?: number
    distinct?: BudgetExpenseScalarFieldEnum | BudgetExpenseScalarFieldEnum[]
  }

  /**
   * BudgetExpense create
   */
  export type BudgetExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a BudgetExpense.
     */
    data: XOR<BudgetExpenseCreateInput, BudgetExpenseUncheckedCreateInput>
  }

  /**
   * BudgetExpense createMany
   */
  export type BudgetExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BudgetExpenses.
     */
    data: BudgetExpenseCreateManyInput | BudgetExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BudgetExpense createManyAndReturn
   */
  export type BudgetExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BudgetExpenses.
     */
    data: BudgetExpenseCreateManyInput | BudgetExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetExpense update
   */
  export type BudgetExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a BudgetExpense.
     */
    data: XOR<BudgetExpenseUpdateInput, BudgetExpenseUncheckedUpdateInput>
    /**
     * Choose, which BudgetExpense to update.
     */
    where: BudgetExpenseWhereUniqueInput
  }

  /**
   * BudgetExpense updateMany
   */
  export type BudgetExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BudgetExpenses.
     */
    data: XOR<BudgetExpenseUpdateManyMutationInput, BudgetExpenseUncheckedUpdateManyInput>
    /**
     * Filter which BudgetExpenses to update
     */
    where?: BudgetExpenseWhereInput
  }

  /**
   * BudgetExpense upsert
   */
  export type BudgetExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the BudgetExpense to update in case it exists.
     */
    where: BudgetExpenseWhereUniqueInput
    /**
     * In case the BudgetExpense found by the `where` argument doesn't exist, create a new BudgetExpense with this data.
     */
    create: XOR<BudgetExpenseCreateInput, BudgetExpenseUncheckedCreateInput>
    /**
     * In case the BudgetExpense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetExpenseUpdateInput, BudgetExpenseUncheckedUpdateInput>
  }

  /**
   * BudgetExpense delete
   */
  export type BudgetExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
    /**
     * Filter which BudgetExpense to delete.
     */
    where: BudgetExpenseWhereUniqueInput
  }

  /**
   * BudgetExpense deleteMany
   */
  export type BudgetExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetExpenses to delete
     */
    where?: BudgetExpenseWhereInput
  }

  /**
   * BudgetExpense.visit
   */
  export type BudgetExpense$visitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: VisitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitInclude<ExtArgs> | null
    where?: VisitWhereInput
  }

  /**
   * BudgetExpense without action
   */
  export type BudgetExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetExpense
     */
    select?: BudgetExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetExpenseInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    ipAddress: string | null
    userAgent: string | null
    sessionId: string | null
    requestId: string | null
    endpoint: string | null
    reason: string | null
    approvalRequired: boolean | null
    approvedBy: string | null
    dataAccessed: $Enums.DataClassification | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    ipAddress: string | null
    userAgent: string | null
    sessionId: string | null
    requestId: string | null
    endpoint: string | null
    reason: string | null
    approvalRequired: boolean | null
    approvedBy: string | null
    dataAccessed: $Enums.DataClassification | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    entityType: number
    entityId: number
    action: number
    oldValues: number
    newValues: number
    ipAddress: number
    userAgent: number
    sessionId: number
    requestId: number
    endpoint: number
    reason: number
    approvalRequired: number
    approvedBy: number
    dataAccessed: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    entityType?: true
    entityId?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    sessionId?: true
    requestId?: true
    endpoint?: true
    reason?: true
    approvalRequired?: true
    approvedBy?: true
    dataAccessed?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    entityType?: true
    entityId?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    sessionId?: true
    requestId?: true
    endpoint?: true
    reason?: true
    approvalRequired?: true
    approvedBy?: true
    dataAccessed?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    entityType?: true
    entityId?: true
    action?: true
    oldValues?: true
    newValues?: true
    ipAddress?: true
    userAgent?: true
    sessionId?: true
    requestId?: true
    endpoint?: true
    reason?: true
    approvalRequired?: true
    approvedBy?: true
    dataAccessed?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    entityType: string
    entityId: string
    action: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    sessionId: string | null
    requestId: string | null
    endpoint: string | null
    reason: string | null
    approvalRequired: boolean
    approvedBy: string | null
    dataAccessed: $Enums.DataClassification | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    sessionId?: boolean
    requestId?: boolean
    endpoint?: boolean
    reason?: boolean
    approvalRequired?: boolean
    approvedBy?: boolean
    dataAccessed?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    sessionId?: boolean
    requestId?: boolean
    endpoint?: boolean
    reason?: boolean
    approvalRequired?: boolean
    approvedBy?: boolean
    dataAccessed?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    sessionId?: boolean
    requestId?: boolean
    endpoint?: boolean
    reason?: boolean
    approvalRequired?: boolean
    approvedBy?: boolean
    dataAccessed?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      entityType: string
      entityId: string
      action: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      sessionId: string | null
      requestId: string | null
      endpoint: string | null
      reason: string | null
      approvalRequired: boolean
      approvedBy: string | null
      dataAccessed: $Enums.DataClassification | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly sessionId: FieldRef<"AuditLog", 'String'>
    readonly requestId: FieldRef<"AuditLog", 'String'>
    readonly endpoint: FieldRef<"AuditLog", 'String'>
    readonly reason: FieldRef<"AuditLog", 'String'>
    readonly approvalRequired: FieldRef<"AuditLog", 'Boolean'>
    readonly approvedBy: FieldRef<"AuditLog", 'String'>
    readonly dataAccessed: FieldRef<"AuditLog", 'DataClassification'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    emailVerifiedAt: 'emailVerifiedAt',
    lastLoginAt: 'lastLoginAt',
    refreshToken: 'refreshToken',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpiresAt: 'passwordResetExpiresAt',
    loginAttempts: 'loginAttempts',
    lockedUntil: 'lockedUntil',
    supervisorId: 'supervisorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    middleName: 'middleName',
    preferredName: 'preferredName',
    phone: 'phone',
    alternatePhone: 'alternatePhone',
    email: 'email',
    streetAddress: 'streetAddress',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    medicalRecordNumber: 'medicalRecordNumber',
    insuranceNumber: 'insuranceNumber',
    insuranceProvider: 'insuranceProvider',
    primaryCarePhysician: 'primaryCarePhysician',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    emergencyContactRelation: 'emergencyContactRelation',
    emergencyContactAddress: 'emergencyContactAddress',
    allergies: 'allergies',
    medications: 'medications',
    medicalConditions: 'medicalConditions',
    specialNeeds: 'specialNeeds',
    preferredLanguage: 'preferredLanguage',
    timezone: 'timezone',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const VisitScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    workerId: 'workerId',
    scheduledAt: 'scheduledAt',
    scheduledEndAt: 'scheduledEndAt',
    actualStartAt: 'actualStartAt',
    actualEndAt: 'actualEndAt',
    duration: 'duration',
    actualDuration: 'actualDuration',
    status: 'status',
    visitType: 'visitType',
    location: 'location',
    notes: 'notes',
    privateNotes: 'privateNotes',
    activities: 'activities',
    plannedActivities: 'plannedActivities',
    medications: 'medications',
    vitals: 'vitals',
    clientSatisfaction: 'clientSatisfaction',
    workerNotes: 'workerNotes',
    supervisorReview: 'supervisorReview',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    billableTime: 'billableTime',
    billingRate: 'billingRate',
    totalCost: 'totalCost',
    invoiceId: 'invoiceId',
    documentationComplete: 'documentationComplete',
    cancellationReason: 'cancellationReason',
    rescheduledFrom: 'rescheduledFrom',
    rescheduledTo: 'rescheduledTo',
    carePlanId: 'carePlanId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type VisitScalarFieldEnum = (typeof VisitScalarFieldEnum)[keyof typeof VisitScalarFieldEnum]


  export const CarePlanScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    name: 'name',
    description: 'description',
    status: 'status',
    priority: 'priority',
    category: 'category',
    goals: 'goals',
    objectives: 'objectives',
    expectedOutcomes: 'expectedOutcomes',
    standardActivities: 'standardActivities',
    specialInstructions: 'specialInstructions',
    medicationReminders: 'medicationReminders',
    emergencyProtocols: 'emergencyProtocols',
    startDate: 'startDate',
    endDate: 'endDate',
    reviewDate: 'reviewDate',
    lastReviewDate: 'lastReviewDate',
    initialAssessment: 'initialAssessment',
    progressNotes: 'progressNotes',
    goalsAchieved: 'goalsAchieved',
    challengesFaced: 'challengesFaced',
    diagnosisCodes: 'diagnosisCodes',
    treatmentPlan: 'treatmentPlan',
    restrictionsLimitations: 'restrictionsLimitations',
    safetyConsiderations: 'safetyConsiderations',
    primaryCaregiver: 'primaryCaregiver',
    supervising: 'supervising',
    familyContacts: 'familyContacts',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    nextReviewBy: 'nextReviewBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type CarePlanScalarFieldEnum = (typeof CarePlanScalarFieldEnum)[keyof typeof CarePlanScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    name: 'name',
    description: 'description',
    status: 'status',
    budgetType: 'budgetType',
    totalAllocated: 'totalAllocated',
    totalSpent: 'totalSpent',
    totalCommitted: 'totalCommitted',
    remaining: 'remaining',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    fiscalYear: 'fiscalYear',
    personalCare: 'personalCare',
    medicalServices: 'medicalServices',
    transportation: 'transportation',
    homeModifications: 'homeModifications',
    emergencyFund: 'emergencyFund',
    other: 'other',
    personalCareSpent: 'personalCareSpent',
    medicalServicesSpent: 'medicalServicesSpent',
    transportationSpent: 'transportationSpent',
    homeModificationsSpent: 'homeModificationsSpent',
    emergencyFundSpent: 'emergencyFundSpent',
    otherSpent: 'otherSpent',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    lastReviewDate: 'lastReviewDate',
    nextReviewDate: 'nextReviewDate',
    autoRenew: 'autoRenew',
    warningThreshold: 'warningThreshold',
    criticalThreshold: 'criticalThreshold',
    alertsEnabled: 'alertsEnabled',
    fundingSource: 'fundingSource',
    authorizationNumber: 'authorizationNumber',
    authorizationExpiry: 'authorizationExpiry',
    notes: 'notes',
    restrictions: 'restrictions',
    approvalRequired: 'approvalRequired',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const BudgetExpenseScalarFieldEnum: {
    id: 'id',
    budgetId: 'budgetId',
    visitId: 'visitId',
    description: 'description',
    category: 'category',
    amount: 'amount',
    expenseDate: 'expenseDate',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    status: 'status',
    receiptUrl: 'receiptUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    version: 'version',
    dataClassification: 'dataClassification'
  };

  export type BudgetExpenseScalarFieldEnum = (typeof BudgetExpenseScalarFieldEnum)[keyof typeof BudgetExpenseScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    entityType: 'entityType',
    entityId: 'entityId',
    action: 'action',
    oldValues: 'oldValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    sessionId: 'sessionId',
    requestId: 'requestId',
    endpoint: 'endpoint',
    reason: 'reason',
    approvalRequired: 'approvalRequired',
    approvedBy: 'approvedBy',
    dataAccessed: 'dataAccessed',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DataClassification'
   */
  export type EnumDataClassificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataClassification'>
    


  /**
   * Reference to a field of type 'DataClassification[]'
   */
  export type ListEnumDataClassificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataClassification[]'>
    


  /**
   * Reference to a field of type 'VisitStatus'
   */
  export type EnumVisitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitStatus'>
    


  /**
   * Reference to a field of type 'VisitStatus[]'
   */
  export type ListEnumVisitStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'CarePlanStatus'
   */
  export type EnumCarePlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarePlanStatus'>
    


  /**
   * Reference to a field of type 'CarePlanStatus[]'
   */
  export type ListEnumCarePlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarePlanStatus[]'>
    


  /**
   * Reference to a field of type 'BudgetStatus'
   */
  export type EnumBudgetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetStatus'>
    


  /**
   * Reference to a field of type 'BudgetStatus[]'
   */
  export type ListEnumBudgetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BudgetStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    loginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    supervisorId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBy?: StringNullableFilter<"User"> | string | null
    updatedBy?: StringNullableFilter<"User"> | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    version?: IntFilter<"User"> | number
    dataClassification?: EnumDataClassificationFilter<"User"> | $Enums.DataClassification
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    clientVisits?: VisitListRelationFilter
    workerVisits?: VisitListRelationFilter
    supervisedWorkers?: UserListRelationFilter
    supervisor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    carePlans?: CarePlanListRelationFilter
    budgets?: BudgetListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiresAt?: SortOrderInput | SortOrder
    loginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    supervisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    clientVisits?: VisitOrderByRelationAggregateInput
    workerVisits?: VisitOrderByRelationAggregateInput
    supervisedWorkers?: UserOrderByRelationAggregateInput
    supervisor?: UserOrderByWithRelationInput
    carePlans?: CarePlanOrderByRelationAggregateInput
    budgets?: BudgetOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    loginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    supervisorId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBy?: StringNullableFilter<"User"> | string | null
    updatedBy?: StringNullableFilter<"User"> | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    version?: IntFilter<"User"> | number
    dataClassification?: EnumDataClassificationFilter<"User"> | $Enums.DataClassification
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    clientVisits?: VisitListRelationFilter
    workerVisits?: VisitListRelationFilter
    supervisedWorkers?: UserListRelationFilter
    supervisor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    carePlans?: CarePlanListRelationFilter
    budgets?: BudgetListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiresAt?: SortOrderInput | SortOrder
    loginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    supervisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    loginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    supervisorId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    version?: IntWithAggregatesFilter<"User"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"User"> | $Enums.DataClassification
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    middleName?: StringNullableFilter<"Profile"> | string | null
    preferredName?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    alternatePhone?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    streetAddress?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    state?: StringNullableFilter<"Profile"> | string | null
    zipCode?: StringNullableFilter<"Profile"> | string | null
    country?: StringNullableFilter<"Profile"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Profile"> | Date | string | null
    gender?: StringNullableFilter<"Profile"> | string | null
    medicalRecordNumber?: StringNullableFilter<"Profile"> | string | null
    insuranceNumber?: StringNullableFilter<"Profile"> | string | null
    insuranceProvider?: StringNullableFilter<"Profile"> | string | null
    primaryCarePhysician?: StringNullableFilter<"Profile"> | string | null
    emergencyContactName?: StringNullableFilter<"Profile"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Profile"> | string | null
    emergencyContactRelation?: StringNullableFilter<"Profile"> | string | null
    emergencyContactAddress?: StringNullableFilter<"Profile"> | string | null
    allergies?: StringNullableListFilter<"Profile">
    medications?: StringNullableListFilter<"Profile">
    medicalConditions?: StringNullableListFilter<"Profile">
    specialNeeds?: StringNullableFilter<"Profile"> | string | null
    preferredLanguage?: StringNullableFilter<"Profile"> | string | null
    timezone?: StringNullableFilter<"Profile"> | string | null
    photoUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    createdBy?: StringNullableFilter<"Profile"> | string | null
    updatedBy?: StringNullableFilter<"Profile"> | string | null
    deletedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    version?: IntFilter<"Profile"> | number
    dataClassification?: EnumDataClassificationFilter<"Profile"> | $Enums.DataClassification
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    preferredName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    alternatePhone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    streetAddress?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    medicalRecordNumber?: SortOrderInput | SortOrder
    insuranceNumber?: SortOrderInput | SortOrder
    insuranceProvider?: SortOrderInput | SortOrder
    primaryCarePhysician?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    emergencyContactRelation?: SortOrderInput | SortOrder
    emergencyContactAddress?: SortOrderInput | SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalConditions?: SortOrder
    specialNeeds?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    medicalRecordNumber?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    middleName?: StringNullableFilter<"Profile"> | string | null
    preferredName?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    alternatePhone?: StringNullableFilter<"Profile"> | string | null
    email?: StringNullableFilter<"Profile"> | string | null
    streetAddress?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    state?: StringNullableFilter<"Profile"> | string | null
    zipCode?: StringNullableFilter<"Profile"> | string | null
    country?: StringNullableFilter<"Profile"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Profile"> | Date | string | null
    gender?: StringNullableFilter<"Profile"> | string | null
    insuranceNumber?: StringNullableFilter<"Profile"> | string | null
    insuranceProvider?: StringNullableFilter<"Profile"> | string | null
    primaryCarePhysician?: StringNullableFilter<"Profile"> | string | null
    emergencyContactName?: StringNullableFilter<"Profile"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Profile"> | string | null
    emergencyContactRelation?: StringNullableFilter<"Profile"> | string | null
    emergencyContactAddress?: StringNullableFilter<"Profile"> | string | null
    allergies?: StringNullableListFilter<"Profile">
    medications?: StringNullableListFilter<"Profile">
    medicalConditions?: StringNullableListFilter<"Profile">
    specialNeeds?: StringNullableFilter<"Profile"> | string | null
    preferredLanguage?: StringNullableFilter<"Profile"> | string | null
    timezone?: StringNullableFilter<"Profile"> | string | null
    photoUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    createdBy?: StringNullableFilter<"Profile"> | string | null
    updatedBy?: StringNullableFilter<"Profile"> | string | null
    deletedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    version?: IntFilter<"Profile"> | number
    dataClassification?: EnumDataClassificationFilter<"Profile"> | $Enums.DataClassification
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId" | "medicalRecordNumber">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    preferredName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    alternatePhone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    streetAddress?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    medicalRecordNumber?: SortOrderInput | SortOrder
    insuranceNumber?: SortOrderInput | SortOrder
    insuranceProvider?: SortOrderInput | SortOrder
    primaryCarePhysician?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    emergencyContactRelation?: SortOrderInput | SortOrder
    emergencyContactAddress?: SortOrderInput | SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalConditions?: SortOrder
    specialNeeds?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    firstName?: StringWithAggregatesFilter<"Profile"> | string
    lastName?: StringWithAggregatesFilter<"Profile"> | string
    middleName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    preferredName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    alternatePhone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    email?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    streetAddress?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    city?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    state?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    country?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    medicalRecordNumber?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    insuranceNumber?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    insuranceProvider?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    primaryCarePhysician?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyContactName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyContactRelation?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    emergencyContactAddress?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    allergies?: StringNullableListFilter<"Profile">
    medications?: StringNullableListFilter<"Profile">
    medicalConditions?: StringNullableListFilter<"Profile">
    specialNeeds?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    preferredLanguage?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    version?: IntWithAggregatesFilter<"Profile"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"Profile"> | $Enums.DataClassification
  }

  export type VisitWhereInput = {
    AND?: VisitWhereInput | VisitWhereInput[]
    OR?: VisitWhereInput[]
    NOT?: VisitWhereInput | VisitWhereInput[]
    id?: StringFilter<"Visit"> | string
    clientId?: StringFilter<"Visit"> | string
    workerId?: StringFilter<"Visit"> | string
    scheduledAt?: DateTimeFilter<"Visit"> | Date | string
    scheduledEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualStartAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    duration?: IntNullableFilter<"Visit"> | number | null
    actualDuration?: IntNullableFilter<"Visit"> | number | null
    status?: EnumVisitStatusFilter<"Visit"> | $Enums.VisitStatus
    visitType?: StringNullableFilter<"Visit"> | string | null
    location?: StringNullableFilter<"Visit"> | string | null
    notes?: StringNullableFilter<"Visit"> | string | null
    privateNotes?: StringNullableFilter<"Visit"> | string | null
    activities?: StringNullableListFilter<"Visit">
    plannedActivities?: StringNullableListFilter<"Visit">
    medications?: StringNullableListFilter<"Visit">
    vitals?: JsonNullableFilter<"Visit">
    clientSatisfaction?: IntNullableFilter<"Visit"> | number | null
    workerNotes?: StringNullableFilter<"Visit"> | string | null
    supervisorReview?: StringNullableFilter<"Visit"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Visit"> | string | null
    billableTime?: IntNullableFilter<"Visit"> | number | null
    billingRate?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    totalCost?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    invoiceId?: StringNullableFilter<"Visit"> | string | null
    documentationComplete?: BoolFilter<"Visit"> | boolean
    cancellationReason?: StringNullableFilter<"Visit"> | string | null
    rescheduledFrom?: StringNullableFilter<"Visit"> | string | null
    rescheduledTo?: StringNullableFilter<"Visit"> | string | null
    carePlanId?: StringNullableFilter<"Visit"> | string | null
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
    createdBy?: StringNullableFilter<"Visit"> | string | null
    updatedBy?: StringNullableFilter<"Visit"> | string | null
    deletedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    version?: IntFilter<"Visit"> | number
    dataClassification?: EnumDataClassificationFilter<"Visit"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    worker?: XOR<UserRelationFilter, UserWhereInput>
    carePlan?: XOR<CarePlanNullableRelationFilter, CarePlanWhereInput> | null
    expenses?: BudgetExpenseListRelationFilter
  }

  export type VisitOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    scheduledAt?: SortOrder
    scheduledEndAt?: SortOrderInput | SortOrder
    actualStartAt?: SortOrderInput | SortOrder
    actualEndAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    actualDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    visitType?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    privateNotes?: SortOrderInput | SortOrder
    activities?: SortOrder
    plannedActivities?: SortOrder
    medications?: SortOrder
    vitals?: SortOrderInput | SortOrder
    clientSatisfaction?: SortOrderInput | SortOrder
    workerNotes?: SortOrderInput | SortOrder
    supervisorReview?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    billableTime?: SortOrderInput | SortOrder
    billingRate?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    documentationComplete?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    rescheduledFrom?: SortOrderInput | SortOrder
    rescheduledTo?: SortOrderInput | SortOrder
    carePlanId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    client?: UserOrderByWithRelationInput
    worker?: UserOrderByWithRelationInput
    carePlan?: CarePlanOrderByWithRelationInput
    expenses?: BudgetExpenseOrderByRelationAggregateInput
  }

  export type VisitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitWhereInput | VisitWhereInput[]
    OR?: VisitWhereInput[]
    NOT?: VisitWhereInput | VisitWhereInput[]
    clientId?: StringFilter<"Visit"> | string
    workerId?: StringFilter<"Visit"> | string
    scheduledAt?: DateTimeFilter<"Visit"> | Date | string
    scheduledEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualStartAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    duration?: IntNullableFilter<"Visit"> | number | null
    actualDuration?: IntNullableFilter<"Visit"> | number | null
    status?: EnumVisitStatusFilter<"Visit"> | $Enums.VisitStatus
    visitType?: StringNullableFilter<"Visit"> | string | null
    location?: StringNullableFilter<"Visit"> | string | null
    notes?: StringNullableFilter<"Visit"> | string | null
    privateNotes?: StringNullableFilter<"Visit"> | string | null
    activities?: StringNullableListFilter<"Visit">
    plannedActivities?: StringNullableListFilter<"Visit">
    medications?: StringNullableListFilter<"Visit">
    vitals?: JsonNullableFilter<"Visit">
    clientSatisfaction?: IntNullableFilter<"Visit"> | number | null
    workerNotes?: StringNullableFilter<"Visit"> | string | null
    supervisorReview?: StringNullableFilter<"Visit"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Visit"> | string | null
    billableTime?: IntNullableFilter<"Visit"> | number | null
    billingRate?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    totalCost?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    invoiceId?: StringNullableFilter<"Visit"> | string | null
    documentationComplete?: BoolFilter<"Visit"> | boolean
    cancellationReason?: StringNullableFilter<"Visit"> | string | null
    rescheduledFrom?: StringNullableFilter<"Visit"> | string | null
    rescheduledTo?: StringNullableFilter<"Visit"> | string | null
    carePlanId?: StringNullableFilter<"Visit"> | string | null
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
    createdBy?: StringNullableFilter<"Visit"> | string | null
    updatedBy?: StringNullableFilter<"Visit"> | string | null
    deletedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    version?: IntFilter<"Visit"> | number
    dataClassification?: EnumDataClassificationFilter<"Visit"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    worker?: XOR<UserRelationFilter, UserWhereInput>
    carePlan?: XOR<CarePlanNullableRelationFilter, CarePlanWhereInput> | null
    expenses?: BudgetExpenseListRelationFilter
  }, "id">

  export type VisitOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    scheduledAt?: SortOrder
    scheduledEndAt?: SortOrderInput | SortOrder
    actualStartAt?: SortOrderInput | SortOrder
    actualEndAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    actualDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    visitType?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    privateNotes?: SortOrderInput | SortOrder
    activities?: SortOrder
    plannedActivities?: SortOrder
    medications?: SortOrder
    vitals?: SortOrderInput | SortOrder
    clientSatisfaction?: SortOrderInput | SortOrder
    workerNotes?: SortOrderInput | SortOrder
    supervisorReview?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    billableTime?: SortOrderInput | SortOrder
    billingRate?: SortOrderInput | SortOrder
    totalCost?: SortOrderInput | SortOrder
    invoiceId?: SortOrderInput | SortOrder
    documentationComplete?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    rescheduledFrom?: SortOrderInput | SortOrder
    rescheduledTo?: SortOrderInput | SortOrder
    carePlanId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: VisitCountOrderByAggregateInput
    _avg?: VisitAvgOrderByAggregateInput
    _max?: VisitMaxOrderByAggregateInput
    _min?: VisitMinOrderByAggregateInput
    _sum?: VisitSumOrderByAggregateInput
  }

  export type VisitScalarWhereWithAggregatesInput = {
    AND?: VisitScalarWhereWithAggregatesInput | VisitScalarWhereWithAggregatesInput[]
    OR?: VisitScalarWhereWithAggregatesInput[]
    NOT?: VisitScalarWhereWithAggregatesInput | VisitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Visit"> | string
    clientId?: StringWithAggregatesFilter<"Visit"> | string
    workerId?: StringWithAggregatesFilter<"Visit"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
    scheduledEndAt?: DateTimeNullableWithAggregatesFilter<"Visit"> | Date | string | null
    actualStartAt?: DateTimeNullableWithAggregatesFilter<"Visit"> | Date | string | null
    actualEndAt?: DateTimeNullableWithAggregatesFilter<"Visit"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"Visit"> | number | null
    actualDuration?: IntNullableWithAggregatesFilter<"Visit"> | number | null
    status?: EnumVisitStatusWithAggregatesFilter<"Visit"> | $Enums.VisitStatus
    visitType?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    location?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    privateNotes?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    activities?: StringNullableListFilter<"Visit">
    plannedActivities?: StringNullableListFilter<"Visit">
    medications?: StringNullableListFilter<"Visit">
    vitals?: JsonNullableWithAggregatesFilter<"Visit">
    clientSatisfaction?: IntNullableWithAggregatesFilter<"Visit"> | number | null
    workerNotes?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    supervisorReview?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Visit"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    billableTime?: IntNullableWithAggregatesFilter<"Visit"> | number | null
    billingRate?: DecimalNullableWithAggregatesFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    totalCost?: DecimalNullableWithAggregatesFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    invoiceId?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    documentationComplete?: BoolWithAggregatesFilter<"Visit"> | boolean
    cancellationReason?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    rescheduledFrom?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    rescheduledTo?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    carePlanId?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Visit"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Visit"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Visit"> | Date | string | null
    version?: IntWithAggregatesFilter<"Visit"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"Visit"> | $Enums.DataClassification
  }

  export type CarePlanWhereInput = {
    AND?: CarePlanWhereInput | CarePlanWhereInput[]
    OR?: CarePlanWhereInput[]
    NOT?: CarePlanWhereInput | CarePlanWhereInput[]
    id?: StringFilter<"CarePlan"> | string
    clientId?: StringFilter<"CarePlan"> | string
    name?: StringFilter<"CarePlan"> | string
    description?: StringNullableFilter<"CarePlan"> | string | null
    status?: EnumCarePlanStatusFilter<"CarePlan"> | $Enums.CarePlanStatus
    priority?: StringNullableFilter<"CarePlan"> | string | null
    category?: StringNullableFilter<"CarePlan"> | string | null
    goals?: StringNullableListFilter<"CarePlan">
    objectives?: JsonNullableFilter<"CarePlan">
    expectedOutcomes?: StringNullableListFilter<"CarePlan">
    standardActivities?: StringNullableListFilter<"CarePlan">
    specialInstructions?: StringNullableFilter<"CarePlan"> | string | null
    medicationReminders?: StringNullableListFilter<"CarePlan">
    emergencyProtocols?: StringNullableFilter<"CarePlan"> | string | null
    startDate?: DateTimeFilter<"CarePlan"> | Date | string
    endDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    reviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    initialAssessment?: StringNullableFilter<"CarePlan"> | string | null
    progressNotes?: StringNullableListFilter<"CarePlan">
    goalsAchieved?: StringNullableListFilter<"CarePlan">
    challengesFaced?: StringNullableListFilter<"CarePlan">
    diagnosisCodes?: StringNullableListFilter<"CarePlan">
    treatmentPlan?: StringNullableFilter<"CarePlan"> | string | null
    restrictionsLimitations?: StringNullableFilter<"CarePlan"> | string | null
    safetyConsiderations?: StringNullableFilter<"CarePlan"> | string | null
    primaryCaregiver?: StringNullableFilter<"CarePlan"> | string | null
    supervising?: StringNullableFilter<"CarePlan"> | string | null
    familyContacts?: JsonNullableFilter<"CarePlan">
    approvedBy?: StringNullableFilter<"CarePlan"> | string | null
    approvedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    nextReviewBy?: StringNullableFilter<"CarePlan"> | string | null
    createdAt?: DateTimeFilter<"CarePlan"> | Date | string
    updatedAt?: DateTimeFilter<"CarePlan"> | Date | string
    createdBy?: StringNullableFilter<"CarePlan"> | string | null
    updatedBy?: StringNullableFilter<"CarePlan"> | string | null
    deletedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    version?: IntFilter<"CarePlan"> | number
    dataClassification?: EnumDataClassificationFilter<"CarePlan"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    visits?: VisitListRelationFilter
  }

  export type CarePlanOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    goals?: SortOrder
    objectives?: SortOrderInput | SortOrder
    expectedOutcomes?: SortOrder
    standardActivities?: SortOrder
    specialInstructions?: SortOrderInput | SortOrder
    medicationReminders?: SortOrder
    emergencyProtocols?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    reviewDate?: SortOrderInput | SortOrder
    lastReviewDate?: SortOrderInput | SortOrder
    initialAssessment?: SortOrderInput | SortOrder
    progressNotes?: SortOrder
    goalsAchieved?: SortOrder
    challengesFaced?: SortOrder
    diagnosisCodes?: SortOrder
    treatmentPlan?: SortOrderInput | SortOrder
    restrictionsLimitations?: SortOrderInput | SortOrder
    safetyConsiderations?: SortOrderInput | SortOrder
    primaryCaregiver?: SortOrderInput | SortOrder
    supervising?: SortOrderInput | SortOrder
    familyContacts?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    nextReviewBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    client?: UserOrderByWithRelationInput
    visits?: VisitOrderByRelationAggregateInput
  }

  export type CarePlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CarePlanWhereInput | CarePlanWhereInput[]
    OR?: CarePlanWhereInput[]
    NOT?: CarePlanWhereInput | CarePlanWhereInput[]
    clientId?: StringFilter<"CarePlan"> | string
    name?: StringFilter<"CarePlan"> | string
    description?: StringNullableFilter<"CarePlan"> | string | null
    status?: EnumCarePlanStatusFilter<"CarePlan"> | $Enums.CarePlanStatus
    priority?: StringNullableFilter<"CarePlan"> | string | null
    category?: StringNullableFilter<"CarePlan"> | string | null
    goals?: StringNullableListFilter<"CarePlan">
    objectives?: JsonNullableFilter<"CarePlan">
    expectedOutcomes?: StringNullableListFilter<"CarePlan">
    standardActivities?: StringNullableListFilter<"CarePlan">
    specialInstructions?: StringNullableFilter<"CarePlan"> | string | null
    medicationReminders?: StringNullableListFilter<"CarePlan">
    emergencyProtocols?: StringNullableFilter<"CarePlan"> | string | null
    startDate?: DateTimeFilter<"CarePlan"> | Date | string
    endDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    reviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    initialAssessment?: StringNullableFilter<"CarePlan"> | string | null
    progressNotes?: StringNullableListFilter<"CarePlan">
    goalsAchieved?: StringNullableListFilter<"CarePlan">
    challengesFaced?: StringNullableListFilter<"CarePlan">
    diagnosisCodes?: StringNullableListFilter<"CarePlan">
    treatmentPlan?: StringNullableFilter<"CarePlan"> | string | null
    restrictionsLimitations?: StringNullableFilter<"CarePlan"> | string | null
    safetyConsiderations?: StringNullableFilter<"CarePlan"> | string | null
    primaryCaregiver?: StringNullableFilter<"CarePlan"> | string | null
    supervising?: StringNullableFilter<"CarePlan"> | string | null
    familyContacts?: JsonNullableFilter<"CarePlan">
    approvedBy?: StringNullableFilter<"CarePlan"> | string | null
    approvedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    nextReviewBy?: StringNullableFilter<"CarePlan"> | string | null
    createdAt?: DateTimeFilter<"CarePlan"> | Date | string
    updatedAt?: DateTimeFilter<"CarePlan"> | Date | string
    createdBy?: StringNullableFilter<"CarePlan"> | string | null
    updatedBy?: StringNullableFilter<"CarePlan"> | string | null
    deletedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    version?: IntFilter<"CarePlan"> | number
    dataClassification?: EnumDataClassificationFilter<"CarePlan"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    visits?: VisitListRelationFilter
  }, "id">

  export type CarePlanOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    goals?: SortOrder
    objectives?: SortOrderInput | SortOrder
    expectedOutcomes?: SortOrder
    standardActivities?: SortOrder
    specialInstructions?: SortOrderInput | SortOrder
    medicationReminders?: SortOrder
    emergencyProtocols?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    reviewDate?: SortOrderInput | SortOrder
    lastReviewDate?: SortOrderInput | SortOrder
    initialAssessment?: SortOrderInput | SortOrder
    progressNotes?: SortOrder
    goalsAchieved?: SortOrder
    challengesFaced?: SortOrder
    diagnosisCodes?: SortOrder
    treatmentPlan?: SortOrderInput | SortOrder
    restrictionsLimitations?: SortOrderInput | SortOrder
    safetyConsiderations?: SortOrderInput | SortOrder
    primaryCaregiver?: SortOrderInput | SortOrder
    supervising?: SortOrderInput | SortOrder
    familyContacts?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    nextReviewBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: CarePlanCountOrderByAggregateInput
    _avg?: CarePlanAvgOrderByAggregateInput
    _max?: CarePlanMaxOrderByAggregateInput
    _min?: CarePlanMinOrderByAggregateInput
    _sum?: CarePlanSumOrderByAggregateInput
  }

  export type CarePlanScalarWhereWithAggregatesInput = {
    AND?: CarePlanScalarWhereWithAggregatesInput | CarePlanScalarWhereWithAggregatesInput[]
    OR?: CarePlanScalarWhereWithAggregatesInput[]
    NOT?: CarePlanScalarWhereWithAggregatesInput | CarePlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CarePlan"> | string
    clientId?: StringWithAggregatesFilter<"CarePlan"> | string
    name?: StringWithAggregatesFilter<"CarePlan"> | string
    description?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    status?: EnumCarePlanStatusWithAggregatesFilter<"CarePlan"> | $Enums.CarePlanStatus
    priority?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    category?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    goals?: StringNullableListFilter<"CarePlan">
    objectives?: JsonNullableWithAggregatesFilter<"CarePlan">
    expectedOutcomes?: StringNullableListFilter<"CarePlan">
    standardActivities?: StringNullableListFilter<"CarePlan">
    specialInstructions?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    medicationReminders?: StringNullableListFilter<"CarePlan">
    emergencyProtocols?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"CarePlan"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"CarePlan"> | Date | string | null
    reviewDate?: DateTimeNullableWithAggregatesFilter<"CarePlan"> | Date | string | null
    lastReviewDate?: DateTimeNullableWithAggregatesFilter<"CarePlan"> | Date | string | null
    initialAssessment?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    progressNotes?: StringNullableListFilter<"CarePlan">
    goalsAchieved?: StringNullableListFilter<"CarePlan">
    challengesFaced?: StringNullableListFilter<"CarePlan">
    diagnosisCodes?: StringNullableListFilter<"CarePlan">
    treatmentPlan?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    restrictionsLimitations?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    safetyConsiderations?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    primaryCaregiver?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    supervising?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    familyContacts?: JsonNullableWithAggregatesFilter<"CarePlan">
    approvedBy?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"CarePlan"> | Date | string | null
    nextReviewBy?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CarePlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CarePlan"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"CarePlan"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"CarePlan"> | Date | string | null
    version?: IntWithAggregatesFilter<"CarePlan"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"CarePlan"> | $Enums.DataClassification
  }

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    id?: StringFilter<"Budget"> | string
    clientId?: StringFilter<"Budget"> | string
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    status?: EnumBudgetStatusFilter<"Budget"> | $Enums.BudgetStatus
    budgetType?: StringFilter<"Budget"> | string
    totalAllocated?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFilter<"Budget"> | Date | string
    periodEnd?: DateTimeFilter<"Budget"> | Date | string
    fiscalYear?: IntNullableFilter<"Budget"> | number | null
    personalCare?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServices?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportation?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModifications?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    other?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    otherSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    approvedBy?: StringNullableFilter<"Budget"> | string | null
    approvedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    nextReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    autoRenew?: BoolFilter<"Budget"> | boolean
    warningThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFilter<"Budget"> | boolean
    fundingSource?: StringNullableFilter<"Budget"> | string | null
    authorizationNumber?: StringNullableFilter<"Budget"> | string | null
    authorizationExpiry?: DateTimeNullableFilter<"Budget"> | Date | string | null
    notes?: StringNullableFilter<"Budget"> | string | null
    restrictions?: StringNullableFilter<"Budget"> | string | null
    approvalRequired?: BoolFilter<"Budget"> | boolean
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    createdBy?: StringNullableFilter<"Budget"> | string | null
    updatedBy?: StringNullableFilter<"Budget"> | string | null
    deletedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    version?: IntFilter<"Budget"> | number
    dataClassification?: EnumDataClassificationFilter<"Budget"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    expenses?: BudgetExpenseListRelationFilter
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    budgetType?: SortOrder
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    fiscalYear?: SortOrderInput | SortOrder
    personalCare?: SortOrderInput | SortOrder
    medicalServices?: SortOrderInput | SortOrder
    transportation?: SortOrderInput | SortOrder
    homeModifications?: SortOrderInput | SortOrder
    emergencyFund?: SortOrderInput | SortOrder
    other?: SortOrderInput | SortOrder
    personalCareSpent?: SortOrderInput | SortOrder
    medicalServicesSpent?: SortOrderInput | SortOrder
    transportationSpent?: SortOrderInput | SortOrder
    homeModificationsSpent?: SortOrderInput | SortOrder
    emergencyFundSpent?: SortOrderInput | SortOrder
    otherSpent?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    lastReviewDate?: SortOrderInput | SortOrder
    nextReviewDate?: SortOrderInput | SortOrder
    autoRenew?: SortOrder
    warningThreshold?: SortOrderInput | SortOrder
    criticalThreshold?: SortOrderInput | SortOrder
    alertsEnabled?: SortOrder
    fundingSource?: SortOrderInput | SortOrder
    authorizationNumber?: SortOrderInput | SortOrder
    authorizationExpiry?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    restrictions?: SortOrderInput | SortOrder
    approvalRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    client?: UserOrderByWithRelationInput
    expenses?: BudgetExpenseOrderByRelationAggregateInput
  }

  export type BudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientId_periodStart_periodEnd?: BudgetClientIdPeriodStartPeriodEndCompoundUniqueInput
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    clientId?: StringFilter<"Budget"> | string
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    status?: EnumBudgetStatusFilter<"Budget"> | $Enums.BudgetStatus
    budgetType?: StringFilter<"Budget"> | string
    totalAllocated?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFilter<"Budget"> | Date | string
    periodEnd?: DateTimeFilter<"Budget"> | Date | string
    fiscalYear?: IntNullableFilter<"Budget"> | number | null
    personalCare?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServices?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportation?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModifications?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    other?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    otherSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    approvedBy?: StringNullableFilter<"Budget"> | string | null
    approvedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    nextReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    autoRenew?: BoolFilter<"Budget"> | boolean
    warningThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFilter<"Budget"> | boolean
    fundingSource?: StringNullableFilter<"Budget"> | string | null
    authorizationNumber?: StringNullableFilter<"Budget"> | string | null
    authorizationExpiry?: DateTimeNullableFilter<"Budget"> | Date | string | null
    notes?: StringNullableFilter<"Budget"> | string | null
    restrictions?: StringNullableFilter<"Budget"> | string | null
    approvalRequired?: BoolFilter<"Budget"> | boolean
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    createdBy?: StringNullableFilter<"Budget"> | string | null
    updatedBy?: StringNullableFilter<"Budget"> | string | null
    deletedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    version?: IntFilter<"Budget"> | number
    dataClassification?: EnumDataClassificationFilter<"Budget"> | $Enums.DataClassification
    client?: XOR<UserRelationFilter, UserWhereInput>
    expenses?: BudgetExpenseListRelationFilter
  }, "id" | "clientId_periodStart_periodEnd">

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    budgetType?: SortOrder
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    fiscalYear?: SortOrderInput | SortOrder
    personalCare?: SortOrderInput | SortOrder
    medicalServices?: SortOrderInput | SortOrder
    transportation?: SortOrderInput | SortOrder
    homeModifications?: SortOrderInput | SortOrder
    emergencyFund?: SortOrderInput | SortOrder
    other?: SortOrderInput | SortOrder
    personalCareSpent?: SortOrderInput | SortOrder
    medicalServicesSpent?: SortOrderInput | SortOrder
    transportationSpent?: SortOrderInput | SortOrder
    homeModificationsSpent?: SortOrderInput | SortOrder
    emergencyFundSpent?: SortOrderInput | SortOrder
    otherSpent?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    lastReviewDate?: SortOrderInput | SortOrder
    nextReviewDate?: SortOrderInput | SortOrder
    autoRenew?: SortOrder
    warningThreshold?: SortOrderInput | SortOrder
    criticalThreshold?: SortOrderInput | SortOrder
    alertsEnabled?: SortOrder
    fundingSource?: SortOrderInput | SortOrder
    authorizationNumber?: SortOrderInput | SortOrder
    authorizationExpiry?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    restrictions?: SortOrderInput | SortOrder
    approvalRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    OR?: BudgetScalarWhereWithAggregatesInput[]
    NOT?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Budget"> | string
    clientId?: StringWithAggregatesFilter<"Budget"> | string
    name?: StringWithAggregatesFilter<"Budget"> | string
    description?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    status?: EnumBudgetStatusWithAggregatesFilter<"Budget"> | $Enums.BudgetStatus
    budgetType?: StringWithAggregatesFilter<"Budget"> | string
    totalAllocated?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    remaining?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    fiscalYear?: IntNullableWithAggregatesFilter<"Budget"> | number | null
    personalCare?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServices?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportation?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModifications?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    other?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    otherSpent?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    lastReviewDate?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    nextReviewDate?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    autoRenew?: BoolWithAggregatesFilter<"Budget"> | boolean
    warningThreshold?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: DecimalNullableWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolWithAggregatesFilter<"Budget"> | boolean
    fundingSource?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    authorizationNumber?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    authorizationExpiry?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    restrictions?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    approvalRequired?: BoolWithAggregatesFilter<"Budget"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Budget"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Budget"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Budget"> | Date | string | null
    version?: IntWithAggregatesFilter<"Budget"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"Budget"> | $Enums.DataClassification
  }

  export type BudgetExpenseWhereInput = {
    AND?: BudgetExpenseWhereInput | BudgetExpenseWhereInput[]
    OR?: BudgetExpenseWhereInput[]
    NOT?: BudgetExpenseWhereInput | BudgetExpenseWhereInput[]
    id?: StringFilter<"BudgetExpense"> | string
    budgetId?: StringFilter<"BudgetExpense"> | string
    visitId?: StringNullableFilter<"BudgetExpense"> | string | null
    description?: StringFilter<"BudgetExpense"> | string
    category?: StringFilter<"BudgetExpense"> | string
    amount?: DecimalFilter<"BudgetExpense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"BudgetExpense"> | Date | string
    approvedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    approvedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    status?: StringFilter<"BudgetExpense"> | string
    receiptUrl?: StringNullableFilter<"BudgetExpense"> | string | null
    notes?: StringNullableFilter<"BudgetExpense"> | string | null
    createdAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    createdBy?: StringNullableFilter<"BudgetExpense"> | string | null
    updatedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    deletedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    version?: IntFilter<"BudgetExpense"> | number
    dataClassification?: EnumDataClassificationFilter<"BudgetExpense"> | $Enums.DataClassification
    budget?: XOR<BudgetRelationFilter, BudgetWhereInput>
    visit?: XOR<VisitNullableRelationFilter, VisitWhereInput> | null
  }

  export type BudgetExpenseOrderByWithRelationInput = {
    id?: SortOrder
    budgetId?: SortOrder
    visitId?: SortOrderInput | SortOrder
    description?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    budget?: BudgetOrderByWithRelationInput
    visit?: VisitOrderByWithRelationInput
  }

  export type BudgetExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BudgetExpenseWhereInput | BudgetExpenseWhereInput[]
    OR?: BudgetExpenseWhereInput[]
    NOT?: BudgetExpenseWhereInput | BudgetExpenseWhereInput[]
    budgetId?: StringFilter<"BudgetExpense"> | string
    visitId?: StringNullableFilter<"BudgetExpense"> | string | null
    description?: StringFilter<"BudgetExpense"> | string
    category?: StringFilter<"BudgetExpense"> | string
    amount?: DecimalFilter<"BudgetExpense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"BudgetExpense"> | Date | string
    approvedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    approvedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    status?: StringFilter<"BudgetExpense"> | string
    receiptUrl?: StringNullableFilter<"BudgetExpense"> | string | null
    notes?: StringNullableFilter<"BudgetExpense"> | string | null
    createdAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    createdBy?: StringNullableFilter<"BudgetExpense"> | string | null
    updatedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    deletedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    version?: IntFilter<"BudgetExpense"> | number
    dataClassification?: EnumDataClassificationFilter<"BudgetExpense"> | $Enums.DataClassification
    budget?: XOR<BudgetRelationFilter, BudgetWhereInput>
    visit?: XOR<VisitNullableRelationFilter, VisitWhereInput> | null
  }, "id">

  export type BudgetExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    budgetId?: SortOrder
    visitId?: SortOrderInput | SortOrder
    description?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
    _count?: BudgetExpenseCountOrderByAggregateInput
    _avg?: BudgetExpenseAvgOrderByAggregateInput
    _max?: BudgetExpenseMaxOrderByAggregateInput
    _min?: BudgetExpenseMinOrderByAggregateInput
    _sum?: BudgetExpenseSumOrderByAggregateInput
  }

  export type BudgetExpenseScalarWhereWithAggregatesInput = {
    AND?: BudgetExpenseScalarWhereWithAggregatesInput | BudgetExpenseScalarWhereWithAggregatesInput[]
    OR?: BudgetExpenseScalarWhereWithAggregatesInput[]
    NOT?: BudgetExpenseScalarWhereWithAggregatesInput | BudgetExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BudgetExpense"> | string
    budgetId?: StringWithAggregatesFilter<"BudgetExpense"> | string
    visitId?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    description?: StringWithAggregatesFilter<"BudgetExpense"> | string
    category?: StringWithAggregatesFilter<"BudgetExpense"> | string
    amount?: DecimalWithAggregatesFilter<"BudgetExpense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeWithAggregatesFilter<"BudgetExpense"> | Date | string
    approvedBy?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"BudgetExpense"> | Date | string | null
    status?: StringWithAggregatesFilter<"BudgetExpense"> | string
    receiptUrl?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    notes?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BudgetExpense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BudgetExpense"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"BudgetExpense"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"BudgetExpense"> | Date | string | null
    version?: IntWithAggregatesFilter<"BudgetExpense"> | number
    dataClassification?: EnumDataClassificationWithAggregatesFilter<"BudgetExpense"> | $Enums.DataClassification
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    sessionId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    endpoint?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    approvalRequired?: BoolFilter<"AuditLog"> | boolean
    approvedBy?: StringNullableFilter<"AuditLog"> | string | null
    dataAccessed?: EnumDataClassificationNullableFilter<"AuditLog"> | $Enums.DataClassification | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    approvalRequired?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    dataAccessed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    sessionId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    endpoint?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    approvalRequired?: BoolFilter<"AuditLog"> | boolean
    approvedBy?: StringNullableFilter<"AuditLog"> | string | null
    dataAccessed?: EnumDataClassificationNullableFilter<"AuditLog"> | $Enums.DataClassification | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    endpoint?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    approvalRequired?: SortOrder
    approvedBy?: SortOrderInput | SortOrder
    dataAccessed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    requestId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    endpoint?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    reason?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    approvalRequired?: BoolWithAggregatesFilter<"AuditLog"> | boolean
    approvedBy?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    dataAccessed?: EnumDataClassificationNullableWithAggregatesFilter<"AuditLog"> | $Enums.DataClassification | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type ProfileCreateInput = {
    id?: string
    firstName: string
    lastName: string
    middleName?: string | null
    preferredName?: string | null
    phone?: string | null
    alternatePhone?: string | null
    email?: string | null
    streetAddress?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    medicalRecordNumber?: string | null
    insuranceNumber?: string | null
    insuranceProvider?: string | null
    primaryCarePhysician?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    emergencyContactRelation?: string | null
    emergencyContactAddress?: string | null
    allergies?: ProfileCreateallergiesInput | string[]
    medications?: ProfileCreatemedicationsInput | string[]
    medicalConditions?: ProfileCreatemedicalConditionsInput | string[]
    specialNeeds?: string | null
    preferredLanguage?: string | null
    timezone?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    middleName?: string | null
    preferredName?: string | null
    phone?: string | null
    alternatePhone?: string | null
    email?: string | null
    streetAddress?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    medicalRecordNumber?: string | null
    insuranceNumber?: string | null
    insuranceProvider?: string | null
    primaryCarePhysician?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    emergencyContactRelation?: string | null
    emergencyContactAddress?: string | null
    allergies?: ProfileCreateallergiesInput | string[]
    medications?: ProfileCreatemedicationsInput | string[]
    medicalConditions?: ProfileCreatemedicalConditionsInput | string[]
    specialNeeds?: string | null
    preferredLanguage?: string | null
    timezone?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    middleName?: string | null
    preferredName?: string | null
    phone?: string | null
    alternatePhone?: string | null
    email?: string | null
    streetAddress?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    medicalRecordNumber?: string | null
    insuranceNumber?: string | null
    insuranceProvider?: string | null
    primaryCarePhysician?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    emergencyContactRelation?: string | null
    emergencyContactAddress?: string | null
    allergies?: ProfileCreateallergiesInput | string[]
    medications?: ProfileCreatemedicationsInput | string[]
    medicalConditions?: ProfileCreatemedicalConditionsInput | string[]
    specialNeeds?: string | null
    preferredLanguage?: string | null
    timezone?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitCreateInput = {
    id?: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutClientVisitsInput
    worker: UserCreateNestedOneWithoutWorkerVisitsInput
    carePlan?: CarePlanCreateNestedOneWithoutVisitsInput
    expenses?: BudgetExpenseCreateNestedManyWithoutVisitInput
  }

  export type VisitUncheckedCreateInput = {
    id?: string
    clientId: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutVisitInput
  }

  export type VisitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutClientVisitsNestedInput
    worker?: UserUpdateOneRequiredWithoutWorkerVisitsNestedInput
    carePlan?: CarePlanUpdateOneWithoutVisitsNestedInput
    expenses?: BudgetExpenseUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type VisitCreateManyInput = {
    id?: string
    clientId: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type VisitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type CarePlanCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutCarePlansInput
    visits?: VisitCreateNestedManyWithoutCarePlanInput
  }

  export type CarePlanUncheckedCreateInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    visits?: VisitUncheckedCreateNestedManyWithoutCarePlanInput
  }

  export type CarePlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutCarePlansNestedInput
    visits?: VisitUpdateManyWithoutCarePlanNestedInput
  }

  export type CarePlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    visits?: VisitUncheckedUpdateManyWithoutCarePlanNestedInput
  }

  export type CarePlanCreateManyInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type CarePlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type CarePlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutBudgetsInput
    expenses?: BudgetExpenseCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutBudgetsNestedInput
    expenses?: BudgetExpenseUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetCreateManyInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseCreateInput = {
    id?: string
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    budget: BudgetCreateNestedOneWithoutExpensesInput
    visit?: VisitCreateNestedOneWithoutExpensesInput
  }

  export type BudgetExpenseUncheckedCreateInput = {
    id?: string
    budgetId: string
    visitId?: string | null
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    budget?: BudgetUpdateOneRequiredWithoutExpensesNestedInput
    visit?: VisitUpdateOneWithoutExpensesNestedInput
  }

  export type BudgetExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseCreateManyInput = {
    id?: string
    budgetId: string
    visitId?: string | null
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type AuditLogCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumDataClassificationFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    not?: NestedEnumDataClassificationFilter<$PrismaModel> | $Enums.DataClassification
  }

  export type ProfileNullableRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type VisitListRelationFilter = {
    every?: VisitWhereInput
    some?: VisitWhereInput
    none?: VisitWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CarePlanListRelationFilter = {
    every?: CarePlanWhereInput
    some?: CarePlanWhereInput
    none?: CarePlanWhereInput
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VisitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CarePlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    lastLoginAt?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    loginAttempts?: SortOrder
    lockedUntil?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    loginAttempts?: SortOrder
    version?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    lastLoginAt?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    loginAttempts?: SortOrder
    lockedUntil?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    lastLoginAt?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiresAt?: SortOrder
    loginAttempts?: SortOrder
    lockedUntil?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    loginAttempts?: SortOrder
    version?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumDataClassificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    not?: NestedEnumDataClassificationWithAggregatesFilter<$PrismaModel> | $Enums.DataClassification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataClassificationFilter<$PrismaModel>
    _max?: NestedEnumDataClassificationFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    preferredName?: SortOrder
    phone?: SortOrder
    alternatePhone?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    medicalRecordNumber?: SortOrder
    insuranceNumber?: SortOrder
    insuranceProvider?: SortOrder
    primaryCarePhysician?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    emergencyContactRelation?: SortOrder
    emergencyContactAddress?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalConditions?: SortOrder
    specialNeeds?: SortOrder
    preferredLanguage?: SortOrder
    timezone?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    preferredName?: SortOrder
    phone?: SortOrder
    alternatePhone?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    medicalRecordNumber?: SortOrder
    insuranceNumber?: SortOrder
    insuranceProvider?: SortOrder
    primaryCarePhysician?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    emergencyContactRelation?: SortOrder
    emergencyContactAddress?: SortOrder
    specialNeeds?: SortOrder
    preferredLanguage?: SortOrder
    timezone?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    middleName?: SortOrder
    preferredName?: SortOrder
    phone?: SortOrder
    alternatePhone?: SortOrder
    email?: SortOrder
    streetAddress?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    medicalRecordNumber?: SortOrder
    insuranceNumber?: SortOrder
    insuranceProvider?: SortOrder
    primaryCarePhysician?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    emergencyContactRelation?: SortOrder
    emergencyContactAddress?: SortOrder
    specialNeeds?: SortOrder
    preferredLanguage?: SortOrder
    timezone?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumVisitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitStatus | EnumVisitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitStatusFilter<$PrismaModel> | $Enums.VisitStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type CarePlanNullableRelationFilter = {
    is?: CarePlanWhereInput | null
    isNot?: CarePlanWhereInput | null
  }

  export type BudgetExpenseListRelationFilter = {
    every?: BudgetExpenseWhereInput
    some?: BudgetExpenseWhereInput
    none?: BudgetExpenseWhereInput
  }

  export type BudgetExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VisitCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    scheduledAt?: SortOrder
    scheduledEndAt?: SortOrder
    actualStartAt?: SortOrder
    actualEndAt?: SortOrder
    duration?: SortOrder
    actualDuration?: SortOrder
    status?: SortOrder
    visitType?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    privateNotes?: SortOrder
    activities?: SortOrder
    plannedActivities?: SortOrder
    medications?: SortOrder
    vitals?: SortOrder
    clientSatisfaction?: SortOrder
    workerNotes?: SortOrder
    supervisorReview?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    billableTime?: SortOrder
    billingRate?: SortOrder
    totalCost?: SortOrder
    invoiceId?: SortOrder
    documentationComplete?: SortOrder
    cancellationReason?: SortOrder
    rescheduledFrom?: SortOrder
    rescheduledTo?: SortOrder
    carePlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type VisitAvgOrderByAggregateInput = {
    duration?: SortOrder
    actualDuration?: SortOrder
    clientSatisfaction?: SortOrder
    billableTime?: SortOrder
    billingRate?: SortOrder
    totalCost?: SortOrder
    version?: SortOrder
  }

  export type VisitMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    scheduledAt?: SortOrder
    scheduledEndAt?: SortOrder
    actualStartAt?: SortOrder
    actualEndAt?: SortOrder
    duration?: SortOrder
    actualDuration?: SortOrder
    status?: SortOrder
    visitType?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    privateNotes?: SortOrder
    clientSatisfaction?: SortOrder
    workerNotes?: SortOrder
    supervisorReview?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    billableTime?: SortOrder
    billingRate?: SortOrder
    totalCost?: SortOrder
    invoiceId?: SortOrder
    documentationComplete?: SortOrder
    cancellationReason?: SortOrder
    rescheduledFrom?: SortOrder
    rescheduledTo?: SortOrder
    carePlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type VisitMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    scheduledAt?: SortOrder
    scheduledEndAt?: SortOrder
    actualStartAt?: SortOrder
    actualEndAt?: SortOrder
    duration?: SortOrder
    actualDuration?: SortOrder
    status?: SortOrder
    visitType?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    privateNotes?: SortOrder
    clientSatisfaction?: SortOrder
    workerNotes?: SortOrder
    supervisorReview?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    billableTime?: SortOrder
    billingRate?: SortOrder
    totalCost?: SortOrder
    invoiceId?: SortOrder
    documentationComplete?: SortOrder
    cancellationReason?: SortOrder
    rescheduledFrom?: SortOrder
    rescheduledTo?: SortOrder
    carePlanId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type VisitSumOrderByAggregateInput = {
    duration?: SortOrder
    actualDuration?: SortOrder
    clientSatisfaction?: SortOrder
    billableTime?: SortOrder
    billingRate?: SortOrder
    totalCost?: SortOrder
    version?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumVisitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitStatus | EnumVisitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitStatusWithAggregatesFilter<$PrismaModel> | $Enums.VisitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisitStatusFilter<$PrismaModel>
    _max?: NestedEnumVisitStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumCarePlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CarePlanStatus | EnumCarePlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarePlanStatusFilter<$PrismaModel> | $Enums.CarePlanStatus
  }

  export type CarePlanCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    goals?: SortOrder
    objectives?: SortOrder
    expectedOutcomes?: SortOrder
    standardActivities?: SortOrder
    specialInstructions?: SortOrder
    medicationReminders?: SortOrder
    emergencyProtocols?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    reviewDate?: SortOrder
    lastReviewDate?: SortOrder
    initialAssessment?: SortOrder
    progressNotes?: SortOrder
    goalsAchieved?: SortOrder
    challengesFaced?: SortOrder
    diagnosisCodes?: SortOrder
    treatmentPlan?: SortOrder
    restrictionsLimitations?: SortOrder
    safetyConsiderations?: SortOrder
    primaryCaregiver?: SortOrder
    supervising?: SortOrder
    familyContacts?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    nextReviewBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type CarePlanAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type CarePlanMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    specialInstructions?: SortOrder
    emergencyProtocols?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    reviewDate?: SortOrder
    lastReviewDate?: SortOrder
    initialAssessment?: SortOrder
    treatmentPlan?: SortOrder
    restrictionsLimitations?: SortOrder
    safetyConsiderations?: SortOrder
    primaryCaregiver?: SortOrder
    supervising?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    nextReviewBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type CarePlanMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    category?: SortOrder
    specialInstructions?: SortOrder
    emergencyProtocols?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    reviewDate?: SortOrder
    lastReviewDate?: SortOrder
    initialAssessment?: SortOrder
    treatmentPlan?: SortOrder
    restrictionsLimitations?: SortOrder
    safetyConsiderations?: SortOrder
    primaryCaregiver?: SortOrder
    supervising?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    nextReviewBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type CarePlanSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumCarePlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarePlanStatus | EnumCarePlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarePlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.CarePlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarePlanStatusFilter<$PrismaModel>
    _max?: NestedEnumCarePlanStatusFilter<$PrismaModel>
  }

  export type EnumBudgetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusFilter<$PrismaModel> | $Enums.BudgetStatus
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BudgetClientIdPeriodStartPeriodEndCompoundUniqueInput = {
    clientId: string
    periodStart: Date | string
    periodEnd: Date | string
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budgetType?: SortOrder
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    fiscalYear?: SortOrder
    personalCare?: SortOrder
    medicalServices?: SortOrder
    transportation?: SortOrder
    homeModifications?: SortOrder
    emergencyFund?: SortOrder
    other?: SortOrder
    personalCareSpent?: SortOrder
    medicalServicesSpent?: SortOrder
    transportationSpent?: SortOrder
    homeModificationsSpent?: SortOrder
    emergencyFundSpent?: SortOrder
    otherSpent?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    lastReviewDate?: SortOrder
    nextReviewDate?: SortOrder
    autoRenew?: SortOrder
    warningThreshold?: SortOrder
    criticalThreshold?: SortOrder
    alertsEnabled?: SortOrder
    fundingSource?: SortOrder
    authorizationNumber?: SortOrder
    authorizationExpiry?: SortOrder
    notes?: SortOrder
    restrictions?: SortOrder
    approvalRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetAvgOrderByAggregateInput = {
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    fiscalYear?: SortOrder
    personalCare?: SortOrder
    medicalServices?: SortOrder
    transportation?: SortOrder
    homeModifications?: SortOrder
    emergencyFund?: SortOrder
    other?: SortOrder
    personalCareSpent?: SortOrder
    medicalServicesSpent?: SortOrder
    transportationSpent?: SortOrder
    homeModificationsSpent?: SortOrder
    emergencyFundSpent?: SortOrder
    otherSpent?: SortOrder
    warningThreshold?: SortOrder
    criticalThreshold?: SortOrder
    version?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budgetType?: SortOrder
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    fiscalYear?: SortOrder
    personalCare?: SortOrder
    medicalServices?: SortOrder
    transportation?: SortOrder
    homeModifications?: SortOrder
    emergencyFund?: SortOrder
    other?: SortOrder
    personalCareSpent?: SortOrder
    medicalServicesSpent?: SortOrder
    transportationSpent?: SortOrder
    homeModificationsSpent?: SortOrder
    emergencyFundSpent?: SortOrder
    otherSpent?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    lastReviewDate?: SortOrder
    nextReviewDate?: SortOrder
    autoRenew?: SortOrder
    warningThreshold?: SortOrder
    criticalThreshold?: SortOrder
    alertsEnabled?: SortOrder
    fundingSource?: SortOrder
    authorizationNumber?: SortOrder
    authorizationExpiry?: SortOrder
    notes?: SortOrder
    restrictions?: SortOrder
    approvalRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    budgetType?: SortOrder
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    fiscalYear?: SortOrder
    personalCare?: SortOrder
    medicalServices?: SortOrder
    transportation?: SortOrder
    homeModifications?: SortOrder
    emergencyFund?: SortOrder
    other?: SortOrder
    personalCareSpent?: SortOrder
    medicalServicesSpent?: SortOrder
    transportationSpent?: SortOrder
    homeModificationsSpent?: SortOrder
    emergencyFundSpent?: SortOrder
    otherSpent?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    lastReviewDate?: SortOrder
    nextReviewDate?: SortOrder
    autoRenew?: SortOrder
    warningThreshold?: SortOrder
    criticalThreshold?: SortOrder
    alertsEnabled?: SortOrder
    fundingSource?: SortOrder
    authorizationNumber?: SortOrder
    authorizationExpiry?: SortOrder
    notes?: SortOrder
    restrictions?: SortOrder
    approvalRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetSumOrderByAggregateInput = {
    totalAllocated?: SortOrder
    totalSpent?: SortOrder
    totalCommitted?: SortOrder
    remaining?: SortOrder
    fiscalYear?: SortOrder
    personalCare?: SortOrder
    medicalServices?: SortOrder
    transportation?: SortOrder
    homeModifications?: SortOrder
    emergencyFund?: SortOrder
    other?: SortOrder
    personalCareSpent?: SortOrder
    medicalServicesSpent?: SortOrder
    transportationSpent?: SortOrder
    homeModificationsSpent?: SortOrder
    emergencyFundSpent?: SortOrder
    otherSpent?: SortOrder
    warningThreshold?: SortOrder
    criticalThreshold?: SortOrder
    version?: SortOrder
  }

  export type EnumBudgetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BudgetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetStatusFilter<$PrismaModel>
    _max?: NestedEnumBudgetStatusFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BudgetRelationFilter = {
    is?: BudgetWhereInput
    isNot?: BudgetWhereInput
  }

  export type VisitNullableRelationFilter = {
    is?: VisitWhereInput | null
    isNot?: VisitWhereInput | null
  }

  export type BudgetExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    visitId?: SortOrder
    description?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
    version?: SortOrder
  }

  export type BudgetExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    visitId?: SortOrder
    description?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    budgetId?: SortOrder
    visitId?: SortOrder
    description?: SortOrder
    category?: SortOrder
    amount?: SortOrder
    expenseDate?: SortOrder
    approvedBy?: SortOrder
    approvedAt?: SortOrder
    status?: SortOrder
    receiptUrl?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedAt?: SortOrder
    version?: SortOrder
    dataClassification?: SortOrder
  }

  export type BudgetExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
    version?: SortOrder
  }

  export type EnumDataClassificationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel> | null
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDataClassificationNullableFilter<$PrismaModel> | $Enums.DataClassification | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    endpoint?: SortOrder
    reason?: SortOrder
    approvalRequired?: SortOrder
    approvedBy?: SortOrder
    dataAccessed?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    endpoint?: SortOrder
    reason?: SortOrder
    approvalRequired?: SortOrder
    approvedBy?: SortOrder
    dataAccessed?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    endpoint?: SortOrder
    reason?: SortOrder
    approvalRequired?: SortOrder
    approvedBy?: SortOrder
    dataAccessed?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumDataClassificationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel> | null
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDataClassificationNullableWithAggregatesFilter<$PrismaModel> | $Enums.DataClassification | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDataClassificationNullableFilter<$PrismaModel>
    _max?: NestedEnumDataClassificationNullableFilter<$PrismaModel>
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type VisitCreateNestedManyWithoutClientInput = {
    create?: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput> | VisitCreateWithoutClientInput[] | VisitUncheckedCreateWithoutClientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutClientInput | VisitCreateOrConnectWithoutClientInput[]
    createMany?: VisitCreateManyClientInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type VisitCreateNestedManyWithoutWorkerInput = {
    create?: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput> | VisitCreateWithoutWorkerInput[] | VisitUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutWorkerInput | VisitCreateOrConnectWithoutWorkerInput[]
    createMany?: VisitCreateManyWorkerInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSupervisedWorkersInput = {
    create?: XOR<UserCreateWithoutSupervisedWorkersInput, UserUncheckedCreateWithoutSupervisedWorkersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupervisedWorkersInput
    connect?: UserWhereUniqueInput
  }

  export type CarePlanCreateNestedManyWithoutClientInput = {
    create?: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput> | CarePlanCreateWithoutClientInput[] | CarePlanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CarePlanCreateOrConnectWithoutClientInput | CarePlanCreateOrConnectWithoutClientInput[]
    createMany?: CarePlanCreateManyClientInputEnvelope
    connect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
  }

  export type BudgetCreateNestedManyWithoutClientInput = {
    create?: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput> | BudgetCreateWithoutClientInput[] | BudgetUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutClientInput | BudgetCreateOrConnectWithoutClientInput[]
    createMany?: BudgetCreateManyClientInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type VisitUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput> | VisitCreateWithoutClientInput[] | VisitUncheckedCreateWithoutClientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutClientInput | VisitCreateOrConnectWithoutClientInput[]
    createMany?: VisitCreateManyClientInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type VisitUncheckedCreateNestedManyWithoutWorkerInput = {
    create?: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput> | VisitCreateWithoutWorkerInput[] | VisitUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutWorkerInput | VisitCreateOrConnectWithoutWorkerInput[]
    createMany?: VisitCreateManyWorkerInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CarePlanUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput> | CarePlanCreateWithoutClientInput[] | CarePlanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CarePlanCreateOrConnectWithoutClientInput | CarePlanCreateOrConnectWithoutClientInput[]
    createMany?: CarePlanCreateManyClientInputEnvelope
    connect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
  }

  export type BudgetUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput> | BudgetCreateWithoutClientInput[] | BudgetUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutClientInput | BudgetCreateOrConnectWithoutClientInput[]
    createMany?: BudgetCreateManyClientInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumDataClassificationFieldUpdateOperationsInput = {
    set?: $Enums.DataClassification
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type VisitUpdateManyWithoutClientNestedInput = {
    create?: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput> | VisitCreateWithoutClientInput[] | VisitUncheckedCreateWithoutClientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutClientInput | VisitCreateOrConnectWithoutClientInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutClientInput | VisitUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: VisitCreateManyClientInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutClientInput | VisitUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutClientInput | VisitUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type VisitUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput> | VisitCreateWithoutWorkerInput[] | VisitUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutWorkerInput | VisitCreateOrConnectWithoutWorkerInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutWorkerInput | VisitUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: VisitCreateManyWorkerInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutWorkerInput | VisitUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutWorkerInput | VisitUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type UserUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSupervisorInput | UserUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSupervisorInput | UserUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSupervisorInput | UserUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateOneWithoutSupervisedWorkersNestedInput = {
    create?: XOR<UserCreateWithoutSupervisedWorkersInput, UserUncheckedCreateWithoutSupervisedWorkersInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupervisedWorkersInput
    upsert?: UserUpsertWithoutSupervisedWorkersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupervisedWorkersInput, UserUpdateWithoutSupervisedWorkersInput>, UserUncheckedUpdateWithoutSupervisedWorkersInput>
  }

  export type CarePlanUpdateManyWithoutClientNestedInput = {
    create?: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput> | CarePlanCreateWithoutClientInput[] | CarePlanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CarePlanCreateOrConnectWithoutClientInput | CarePlanCreateOrConnectWithoutClientInput[]
    upsert?: CarePlanUpsertWithWhereUniqueWithoutClientInput | CarePlanUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: CarePlanCreateManyClientInputEnvelope
    set?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    disconnect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    delete?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    connect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    update?: CarePlanUpdateWithWhereUniqueWithoutClientInput | CarePlanUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: CarePlanUpdateManyWithWhereWithoutClientInput | CarePlanUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: CarePlanScalarWhereInput | CarePlanScalarWhereInput[]
  }

  export type BudgetUpdateManyWithoutClientNestedInput = {
    create?: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput> | BudgetCreateWithoutClientInput[] | BudgetUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutClientInput | BudgetCreateOrConnectWithoutClientInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutClientInput | BudgetUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BudgetCreateManyClientInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutClientInput | BudgetUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutClientInput | BudgetUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type VisitUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput> | VisitCreateWithoutClientInput[] | VisitUncheckedCreateWithoutClientInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutClientInput | VisitCreateOrConnectWithoutClientInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutClientInput | VisitUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: VisitCreateManyClientInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutClientInput | VisitUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutClientInput | VisitUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type VisitUncheckedUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput> | VisitCreateWithoutWorkerInput[] | VisitUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutWorkerInput | VisitCreateOrConnectWithoutWorkerInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutWorkerInput | VisitUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: VisitCreateManyWorkerInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutWorkerInput | VisitUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutWorkerInput | VisitUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSupervisorInput | UserUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSupervisorInput | UserUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSupervisorInput | UserUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CarePlanUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput> | CarePlanCreateWithoutClientInput[] | CarePlanUncheckedCreateWithoutClientInput[]
    connectOrCreate?: CarePlanCreateOrConnectWithoutClientInput | CarePlanCreateOrConnectWithoutClientInput[]
    upsert?: CarePlanUpsertWithWhereUniqueWithoutClientInput | CarePlanUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: CarePlanCreateManyClientInputEnvelope
    set?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    disconnect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    delete?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    connect?: CarePlanWhereUniqueInput | CarePlanWhereUniqueInput[]
    update?: CarePlanUpdateWithWhereUniqueWithoutClientInput | CarePlanUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: CarePlanUpdateManyWithWhereWithoutClientInput | CarePlanUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: CarePlanScalarWhereInput | CarePlanScalarWhereInput[]
  }

  export type BudgetUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput> | BudgetCreateWithoutClientInput[] | BudgetUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutClientInput | BudgetCreateOrConnectWithoutClientInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutClientInput | BudgetUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BudgetCreateManyClientInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutClientInput | BudgetUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutClientInput | BudgetUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProfileCreateallergiesInput = {
    set: string[]
  }

  export type ProfileCreatemedicationsInput = {
    set: string[]
  }

  export type ProfileCreatemedicalConditionsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ProfileUpdateallergiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProfileUpdatemedicationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProfileUpdatemedicalConditionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type VisitCreateactivitiesInput = {
    set: string[]
  }

  export type VisitCreateplannedActivitiesInput = {
    set: string[]
  }

  export type VisitCreatemedicationsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutClientVisitsInput = {
    create?: XOR<UserCreateWithoutClientVisitsInput, UserUncheckedCreateWithoutClientVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientVisitsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkerVisitsInput = {
    create?: XOR<UserCreateWithoutWorkerVisitsInput, UserUncheckedCreateWithoutWorkerVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkerVisitsInput
    connect?: UserWhereUniqueInput
  }

  export type CarePlanCreateNestedOneWithoutVisitsInput = {
    create?: XOR<CarePlanCreateWithoutVisitsInput, CarePlanUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: CarePlanCreateOrConnectWithoutVisitsInput
    connect?: CarePlanWhereUniqueInput
  }

  export type BudgetExpenseCreateNestedManyWithoutVisitInput = {
    create?: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput> | BudgetExpenseCreateWithoutVisitInput[] | BudgetExpenseUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutVisitInput | BudgetExpenseCreateOrConnectWithoutVisitInput[]
    createMany?: BudgetExpenseCreateManyVisitInputEnvelope
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
  }

  export type BudgetExpenseUncheckedCreateNestedManyWithoutVisitInput = {
    create?: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput> | BudgetExpenseCreateWithoutVisitInput[] | BudgetExpenseUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutVisitInput | BudgetExpenseCreateOrConnectWithoutVisitInput[]
    createMany?: BudgetExpenseCreateManyVisitInputEnvelope
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumVisitStatusFieldUpdateOperationsInput = {
    set?: $Enums.VisitStatus
  }

  export type VisitUpdateactivitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VisitUpdateplannedActivitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VisitUpdatemedicationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutClientVisitsNestedInput = {
    create?: XOR<UserCreateWithoutClientVisitsInput, UserUncheckedCreateWithoutClientVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientVisitsInput
    upsert?: UserUpsertWithoutClientVisitsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientVisitsInput, UserUpdateWithoutClientVisitsInput>, UserUncheckedUpdateWithoutClientVisitsInput>
  }

  export type UserUpdateOneRequiredWithoutWorkerVisitsNestedInput = {
    create?: XOR<UserCreateWithoutWorkerVisitsInput, UserUncheckedCreateWithoutWorkerVisitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkerVisitsInput
    upsert?: UserUpsertWithoutWorkerVisitsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkerVisitsInput, UserUpdateWithoutWorkerVisitsInput>, UserUncheckedUpdateWithoutWorkerVisitsInput>
  }

  export type CarePlanUpdateOneWithoutVisitsNestedInput = {
    create?: XOR<CarePlanCreateWithoutVisitsInput, CarePlanUncheckedCreateWithoutVisitsInput>
    connectOrCreate?: CarePlanCreateOrConnectWithoutVisitsInput
    upsert?: CarePlanUpsertWithoutVisitsInput
    disconnect?: CarePlanWhereInput | boolean
    delete?: CarePlanWhereInput | boolean
    connect?: CarePlanWhereUniqueInput
    update?: XOR<XOR<CarePlanUpdateToOneWithWhereWithoutVisitsInput, CarePlanUpdateWithoutVisitsInput>, CarePlanUncheckedUpdateWithoutVisitsInput>
  }

  export type BudgetExpenseUpdateManyWithoutVisitNestedInput = {
    create?: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput> | BudgetExpenseCreateWithoutVisitInput[] | BudgetExpenseUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutVisitInput | BudgetExpenseCreateOrConnectWithoutVisitInput[]
    upsert?: BudgetExpenseUpsertWithWhereUniqueWithoutVisitInput | BudgetExpenseUpsertWithWhereUniqueWithoutVisitInput[]
    createMany?: BudgetExpenseCreateManyVisitInputEnvelope
    set?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    disconnect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    delete?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    update?: BudgetExpenseUpdateWithWhereUniqueWithoutVisitInput | BudgetExpenseUpdateWithWhereUniqueWithoutVisitInput[]
    updateMany?: BudgetExpenseUpdateManyWithWhereWithoutVisitInput | BudgetExpenseUpdateManyWithWhereWithoutVisitInput[]
    deleteMany?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
  }

  export type BudgetExpenseUncheckedUpdateManyWithoutVisitNestedInput = {
    create?: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput> | BudgetExpenseCreateWithoutVisitInput[] | BudgetExpenseUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutVisitInput | BudgetExpenseCreateOrConnectWithoutVisitInput[]
    upsert?: BudgetExpenseUpsertWithWhereUniqueWithoutVisitInput | BudgetExpenseUpsertWithWhereUniqueWithoutVisitInput[]
    createMany?: BudgetExpenseCreateManyVisitInputEnvelope
    set?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    disconnect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    delete?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    update?: BudgetExpenseUpdateWithWhereUniqueWithoutVisitInput | BudgetExpenseUpdateWithWhereUniqueWithoutVisitInput[]
    updateMany?: BudgetExpenseUpdateManyWithWhereWithoutVisitInput | BudgetExpenseUpdateManyWithWhereWithoutVisitInput[]
    deleteMany?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
  }

  export type CarePlanCreategoalsInput = {
    set: string[]
  }

  export type CarePlanCreateexpectedOutcomesInput = {
    set: string[]
  }

  export type CarePlanCreatestandardActivitiesInput = {
    set: string[]
  }

  export type CarePlanCreatemedicationRemindersInput = {
    set: string[]
  }

  export type CarePlanCreateprogressNotesInput = {
    set: string[]
  }

  export type CarePlanCreategoalsAchievedInput = {
    set: string[]
  }

  export type CarePlanCreatechallengesFacedInput = {
    set: string[]
  }

  export type CarePlanCreatediagnosisCodesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCarePlansInput = {
    create?: XOR<UserCreateWithoutCarePlansInput, UserUncheckedCreateWithoutCarePlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarePlansInput
    connect?: UserWhereUniqueInput
  }

  export type VisitCreateNestedManyWithoutCarePlanInput = {
    create?: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput> | VisitCreateWithoutCarePlanInput[] | VisitUncheckedCreateWithoutCarePlanInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutCarePlanInput | VisitCreateOrConnectWithoutCarePlanInput[]
    createMany?: VisitCreateManyCarePlanInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type VisitUncheckedCreateNestedManyWithoutCarePlanInput = {
    create?: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput> | VisitCreateWithoutCarePlanInput[] | VisitUncheckedCreateWithoutCarePlanInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutCarePlanInput | VisitCreateOrConnectWithoutCarePlanInput[]
    createMany?: VisitCreateManyCarePlanInputEnvelope
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
  }

  export type EnumCarePlanStatusFieldUpdateOperationsInput = {
    set?: $Enums.CarePlanStatus
  }

  export type CarePlanUpdategoalsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdateexpectedOutcomesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdatestandardActivitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdatemedicationRemindersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdateprogressNotesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdategoalsAchievedInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdatechallengesFacedInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CarePlanUpdatediagnosisCodesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCarePlansNestedInput = {
    create?: XOR<UserCreateWithoutCarePlansInput, UserUncheckedCreateWithoutCarePlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarePlansInput
    upsert?: UserUpsertWithoutCarePlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCarePlansInput, UserUpdateWithoutCarePlansInput>, UserUncheckedUpdateWithoutCarePlansInput>
  }

  export type VisitUpdateManyWithoutCarePlanNestedInput = {
    create?: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput> | VisitCreateWithoutCarePlanInput[] | VisitUncheckedCreateWithoutCarePlanInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutCarePlanInput | VisitCreateOrConnectWithoutCarePlanInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutCarePlanInput | VisitUpsertWithWhereUniqueWithoutCarePlanInput[]
    createMany?: VisitCreateManyCarePlanInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutCarePlanInput | VisitUpdateWithWhereUniqueWithoutCarePlanInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutCarePlanInput | VisitUpdateManyWithWhereWithoutCarePlanInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type VisitUncheckedUpdateManyWithoutCarePlanNestedInput = {
    create?: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput> | VisitCreateWithoutCarePlanInput[] | VisitUncheckedCreateWithoutCarePlanInput[]
    connectOrCreate?: VisitCreateOrConnectWithoutCarePlanInput | VisitCreateOrConnectWithoutCarePlanInput[]
    upsert?: VisitUpsertWithWhereUniqueWithoutCarePlanInput | VisitUpsertWithWhereUniqueWithoutCarePlanInput[]
    createMany?: VisitCreateManyCarePlanInputEnvelope
    set?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    disconnect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    delete?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    connect?: VisitWhereUniqueInput | VisitWhereUniqueInput[]
    update?: VisitUpdateWithWhereUniqueWithoutCarePlanInput | VisitUpdateWithWhereUniqueWithoutCarePlanInput[]
    updateMany?: VisitUpdateManyWithWhereWithoutCarePlanInput | VisitUpdateManyWithWhereWithoutCarePlanInput[]
    deleteMany?: VisitScalarWhereInput | VisitScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    connect?: UserWhereUniqueInput
  }

  export type BudgetExpenseCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput> | BudgetExpenseCreateWithoutBudgetInput[] | BudgetExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutBudgetInput | BudgetExpenseCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetExpenseCreateManyBudgetInputEnvelope
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
  }

  export type BudgetExpenseUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput> | BudgetExpenseCreateWithoutBudgetInput[] | BudgetExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutBudgetInput | BudgetExpenseCreateOrConnectWithoutBudgetInput[]
    createMany?: BudgetExpenseCreateManyBudgetInputEnvelope
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
  }

  export type EnumBudgetStatusFieldUpdateOperationsInput = {
    set?: $Enums.BudgetStatus
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    upsert?: UserUpsertWithoutBudgetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBudgetsInput, UserUpdateWithoutBudgetsInput>, UserUncheckedUpdateWithoutBudgetsInput>
  }

  export type BudgetExpenseUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput> | BudgetExpenseCreateWithoutBudgetInput[] | BudgetExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutBudgetInput | BudgetExpenseCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetExpenseUpsertWithWhereUniqueWithoutBudgetInput | BudgetExpenseUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetExpenseCreateManyBudgetInputEnvelope
    set?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    disconnect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    delete?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    update?: BudgetExpenseUpdateWithWhereUniqueWithoutBudgetInput | BudgetExpenseUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetExpenseUpdateManyWithWhereWithoutBudgetInput | BudgetExpenseUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
  }

  export type BudgetExpenseUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput> | BudgetExpenseCreateWithoutBudgetInput[] | BudgetExpenseUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: BudgetExpenseCreateOrConnectWithoutBudgetInput | BudgetExpenseCreateOrConnectWithoutBudgetInput[]
    upsert?: BudgetExpenseUpsertWithWhereUniqueWithoutBudgetInput | BudgetExpenseUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: BudgetExpenseCreateManyBudgetInputEnvelope
    set?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    disconnect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    delete?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    connect?: BudgetExpenseWhereUniqueInput | BudgetExpenseWhereUniqueInput[]
    update?: BudgetExpenseUpdateWithWhereUniqueWithoutBudgetInput | BudgetExpenseUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: BudgetExpenseUpdateManyWithWhereWithoutBudgetInput | BudgetExpenseUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
  }

  export type BudgetCreateNestedOneWithoutExpensesInput = {
    create?: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutExpensesInput
    connect?: BudgetWhereUniqueInput
  }

  export type VisitCreateNestedOneWithoutExpensesInput = {
    create?: XOR<VisitCreateWithoutExpensesInput, VisitUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: VisitCreateOrConnectWithoutExpensesInput
    connect?: VisitWhereUniqueInput
  }

  export type BudgetUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutExpensesInput
    upsert?: BudgetUpsertWithoutExpensesInput
    connect?: BudgetWhereUniqueInput
    update?: XOR<XOR<BudgetUpdateToOneWithWhereWithoutExpensesInput, BudgetUpdateWithoutExpensesInput>, BudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type VisitUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<VisitCreateWithoutExpensesInput, VisitUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: VisitCreateOrConnectWithoutExpensesInput
    upsert?: VisitUpsertWithoutExpensesInput
    disconnect?: VisitWhereInput | boolean
    delete?: VisitWhereInput | boolean
    connect?: VisitWhereUniqueInput
    update?: XOR<XOR<VisitUpdateToOneWithWhereWithoutExpensesInput, VisitUpdateWithoutExpensesInput>, VisitUncheckedUpdateWithoutExpensesInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableEnumDataClassificationFieldUpdateOperationsInput = {
    set?: $Enums.DataClassification | null
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumDataClassificationFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    not?: NestedEnumDataClassificationFilter<$PrismaModel> | $Enums.DataClassification
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDataClassificationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel>
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel>
    not?: NestedEnumDataClassificationWithAggregatesFilter<$PrismaModel> | $Enums.DataClassification
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataClassificationFilter<$PrismaModel>
    _max?: NestedEnumDataClassificationFilter<$PrismaModel>
  }

  export type NestedEnumVisitStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitStatus | EnumVisitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitStatusFilter<$PrismaModel> | $Enums.VisitStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumVisitStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisitStatus | EnumVisitStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisitStatus[] | ListEnumVisitStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisitStatusWithAggregatesFilter<$PrismaModel> | $Enums.VisitStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisitStatusFilter<$PrismaModel>
    _max?: NestedEnumVisitStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumCarePlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CarePlanStatus | EnumCarePlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarePlanStatusFilter<$PrismaModel> | $Enums.CarePlanStatus
  }

  export type NestedEnumCarePlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarePlanStatus | EnumCarePlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarePlanStatus[] | ListEnumCarePlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarePlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.CarePlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarePlanStatusFilter<$PrismaModel>
    _max?: NestedEnumCarePlanStatusFilter<$PrismaModel>
  }

  export type NestedEnumBudgetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusFilter<$PrismaModel> | $Enums.BudgetStatus
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BudgetStatus | EnumBudgetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BudgetStatus[] | ListEnumBudgetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBudgetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BudgetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBudgetStatusFilter<$PrismaModel>
    _max?: NestedEnumBudgetStatusFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumDataClassificationNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel> | null
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDataClassificationNullableFilter<$PrismaModel> | $Enums.DataClassification | null
  }

  export type NestedEnumDataClassificationNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataClassification | EnumDataClassificationFieldRefInput<$PrismaModel> | null
    in?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DataClassification[] | ListEnumDataClassificationFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDataClassificationNullableWithAggregatesFilter<$PrismaModel> | $Enums.DataClassification | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDataClassificationNullableFilter<$PrismaModel>
    _max?: NestedEnumDataClassificationNullableFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    middleName?: string | null
    preferredName?: string | null
    phone?: string | null
    alternatePhone?: string | null
    email?: string | null
    streetAddress?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    medicalRecordNumber?: string | null
    insuranceNumber?: string | null
    insuranceProvider?: string | null
    primaryCarePhysician?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    emergencyContactRelation?: string | null
    emergencyContactAddress?: string | null
    allergies?: ProfileCreateallergiesInput | string[]
    medications?: ProfileCreatemedicationsInput | string[]
    medicalConditions?: ProfileCreatemedicalConditionsInput | string[]
    specialNeeds?: string | null
    preferredLanguage?: string | null
    timezone?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    middleName?: string | null
    preferredName?: string | null
    phone?: string | null
    alternatePhone?: string | null
    email?: string | null
    streetAddress?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    medicalRecordNumber?: string | null
    insuranceNumber?: string | null
    insuranceProvider?: string | null
    primaryCarePhysician?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    emergencyContactRelation?: string | null
    emergencyContactAddress?: string | null
    allergies?: ProfileCreateallergiesInput | string[]
    medications?: ProfileCreatemedicationsInput | string[]
    medicalConditions?: ProfileCreatemedicalConditionsInput | string[]
    specialNeeds?: string | null
    preferredLanguage?: string | null
    timezone?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type VisitCreateWithoutClientInput = {
    id?: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    worker: UserCreateNestedOneWithoutWorkerVisitsInput
    carePlan?: CarePlanCreateNestedOneWithoutVisitsInput
    expenses?: BudgetExpenseCreateNestedManyWithoutVisitInput
  }

  export type VisitUncheckedCreateWithoutClientInput = {
    id?: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutVisitInput
  }

  export type VisitCreateOrConnectWithoutClientInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput>
  }

  export type VisitCreateManyClientInputEnvelope = {
    data: VisitCreateManyClientInput | VisitCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type VisitCreateWithoutWorkerInput = {
    id?: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutClientVisitsInput
    carePlan?: CarePlanCreateNestedOneWithoutVisitsInput
    expenses?: BudgetExpenseCreateNestedManyWithoutVisitInput
  }

  export type VisitUncheckedCreateWithoutWorkerInput = {
    id?: string
    clientId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutVisitInput
  }

  export type VisitCreateOrConnectWithoutWorkerInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput>
  }

  export type VisitCreateManyWorkerInputEnvelope = {
    data: VisitCreateManyWorkerInput | VisitCreateManyWorkerInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSupervisorInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSupervisorInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput>
  }

  export type UserCreateManySupervisorInputEnvelope = {
    data: UserCreateManySupervisorInput | UserCreateManySupervisorInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSupervisedWorkersInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSupervisedWorkersInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSupervisedWorkersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupervisedWorkersInput, UserUncheckedCreateWithoutSupervisedWorkersInput>
  }

  export type CarePlanCreateWithoutClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    visits?: VisitCreateNestedManyWithoutCarePlanInput
  }

  export type CarePlanUncheckedCreateWithoutClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    visits?: VisitUncheckedCreateNestedManyWithoutCarePlanInput
  }

  export type CarePlanCreateOrConnectWithoutClientInput = {
    where: CarePlanWhereUniqueInput
    create: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput>
  }

  export type CarePlanCreateManyClientInputEnvelope = {
    data: CarePlanCreateManyClientInput | CarePlanCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type BudgetCreateWithoutClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutClientInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput>
  }

  export type BudgetCreateManyClientInputEnvelope = {
    data: BudgetCreateManyClientInput | BudgetCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    preferredName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    streetAddress?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    medicalRecordNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCarePhysician?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactRelation?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactAddress?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: ProfileUpdateallergiesInput | string[]
    medications?: ProfileUpdatemedicationsInput | string[]
    medicalConditions?: ProfileUpdatemedicalConditionsInput | string[]
    specialNeeds?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitUpsertWithWhereUniqueWithoutClientInput = {
    where: VisitWhereUniqueInput
    update: XOR<VisitUpdateWithoutClientInput, VisitUncheckedUpdateWithoutClientInput>
    create: XOR<VisitCreateWithoutClientInput, VisitUncheckedCreateWithoutClientInput>
  }

  export type VisitUpdateWithWhereUniqueWithoutClientInput = {
    where: VisitWhereUniqueInput
    data: XOR<VisitUpdateWithoutClientInput, VisitUncheckedUpdateWithoutClientInput>
  }

  export type VisitUpdateManyWithWhereWithoutClientInput = {
    where: VisitScalarWhereInput
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyWithoutClientInput>
  }

  export type VisitScalarWhereInput = {
    AND?: VisitScalarWhereInput | VisitScalarWhereInput[]
    OR?: VisitScalarWhereInput[]
    NOT?: VisitScalarWhereInput | VisitScalarWhereInput[]
    id?: StringFilter<"Visit"> | string
    clientId?: StringFilter<"Visit"> | string
    workerId?: StringFilter<"Visit"> | string
    scheduledAt?: DateTimeFilter<"Visit"> | Date | string
    scheduledEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualStartAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    actualEndAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    duration?: IntNullableFilter<"Visit"> | number | null
    actualDuration?: IntNullableFilter<"Visit"> | number | null
    status?: EnumVisitStatusFilter<"Visit"> | $Enums.VisitStatus
    visitType?: StringNullableFilter<"Visit"> | string | null
    location?: StringNullableFilter<"Visit"> | string | null
    notes?: StringNullableFilter<"Visit"> | string | null
    privateNotes?: StringNullableFilter<"Visit"> | string | null
    activities?: StringNullableListFilter<"Visit">
    plannedActivities?: StringNullableListFilter<"Visit">
    medications?: StringNullableListFilter<"Visit">
    vitals?: JsonNullableFilter<"Visit">
    clientSatisfaction?: IntNullableFilter<"Visit"> | number | null
    workerNotes?: StringNullableFilter<"Visit"> | string | null
    supervisorReview?: StringNullableFilter<"Visit"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    reviewedBy?: StringNullableFilter<"Visit"> | string | null
    billableTime?: IntNullableFilter<"Visit"> | number | null
    billingRate?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    totalCost?: DecimalNullableFilter<"Visit"> | Decimal | DecimalJsLike | number | string | null
    invoiceId?: StringNullableFilter<"Visit"> | string | null
    documentationComplete?: BoolFilter<"Visit"> | boolean
    cancellationReason?: StringNullableFilter<"Visit"> | string | null
    rescheduledFrom?: StringNullableFilter<"Visit"> | string | null
    rescheduledTo?: StringNullableFilter<"Visit"> | string | null
    carePlanId?: StringNullableFilter<"Visit"> | string | null
    createdAt?: DateTimeFilter<"Visit"> | Date | string
    updatedAt?: DateTimeFilter<"Visit"> | Date | string
    createdBy?: StringNullableFilter<"Visit"> | string | null
    updatedBy?: StringNullableFilter<"Visit"> | string | null
    deletedAt?: DateTimeNullableFilter<"Visit"> | Date | string | null
    version?: IntFilter<"Visit"> | number
    dataClassification?: EnumDataClassificationFilter<"Visit"> | $Enums.DataClassification
  }

  export type VisitUpsertWithWhereUniqueWithoutWorkerInput = {
    where: VisitWhereUniqueInput
    update: XOR<VisitUpdateWithoutWorkerInput, VisitUncheckedUpdateWithoutWorkerInput>
    create: XOR<VisitCreateWithoutWorkerInput, VisitUncheckedCreateWithoutWorkerInput>
  }

  export type VisitUpdateWithWhereUniqueWithoutWorkerInput = {
    where: VisitWhereUniqueInput
    data: XOR<VisitUpdateWithoutWorkerInput, VisitUncheckedUpdateWithoutWorkerInput>
  }

  export type VisitUpdateManyWithWhereWithoutWorkerInput = {
    where: VisitScalarWhereInput
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyWithoutWorkerInput>
  }

  export type UserUpsertWithWhereUniqueWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSupervisorInput, UserUncheckedUpdateWithoutSupervisorInput>
    create: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSupervisorInput, UserUncheckedUpdateWithoutSupervisorInput>
  }

  export type UserUpdateManyWithWhereWithoutSupervisorInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSupervisorInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    loginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    supervisorId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdBy?: StringNullableFilter<"User"> | string | null
    updatedBy?: StringNullableFilter<"User"> | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    version?: IntFilter<"User"> | number
    dataClassification?: EnumDataClassificationFilter<"User"> | $Enums.DataClassification
  }

  export type UserUpsertWithoutSupervisedWorkersInput = {
    update: XOR<UserUpdateWithoutSupervisedWorkersInput, UserUncheckedUpdateWithoutSupervisedWorkersInput>
    create: XOR<UserCreateWithoutSupervisedWorkersInput, UserUncheckedCreateWithoutSupervisedWorkersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupervisedWorkersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupervisedWorkersInput, UserUncheckedUpdateWithoutSupervisedWorkersInput>
  }

  export type UserUpdateWithoutSupervisedWorkersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSupervisedWorkersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CarePlanUpsertWithWhereUniqueWithoutClientInput = {
    where: CarePlanWhereUniqueInput
    update: XOR<CarePlanUpdateWithoutClientInput, CarePlanUncheckedUpdateWithoutClientInput>
    create: XOR<CarePlanCreateWithoutClientInput, CarePlanUncheckedCreateWithoutClientInput>
  }

  export type CarePlanUpdateWithWhereUniqueWithoutClientInput = {
    where: CarePlanWhereUniqueInput
    data: XOR<CarePlanUpdateWithoutClientInput, CarePlanUncheckedUpdateWithoutClientInput>
  }

  export type CarePlanUpdateManyWithWhereWithoutClientInput = {
    where: CarePlanScalarWhereInput
    data: XOR<CarePlanUpdateManyMutationInput, CarePlanUncheckedUpdateManyWithoutClientInput>
  }

  export type CarePlanScalarWhereInput = {
    AND?: CarePlanScalarWhereInput | CarePlanScalarWhereInput[]
    OR?: CarePlanScalarWhereInput[]
    NOT?: CarePlanScalarWhereInput | CarePlanScalarWhereInput[]
    id?: StringFilter<"CarePlan"> | string
    clientId?: StringFilter<"CarePlan"> | string
    name?: StringFilter<"CarePlan"> | string
    description?: StringNullableFilter<"CarePlan"> | string | null
    status?: EnumCarePlanStatusFilter<"CarePlan"> | $Enums.CarePlanStatus
    priority?: StringNullableFilter<"CarePlan"> | string | null
    category?: StringNullableFilter<"CarePlan"> | string | null
    goals?: StringNullableListFilter<"CarePlan">
    objectives?: JsonNullableFilter<"CarePlan">
    expectedOutcomes?: StringNullableListFilter<"CarePlan">
    standardActivities?: StringNullableListFilter<"CarePlan">
    specialInstructions?: StringNullableFilter<"CarePlan"> | string | null
    medicationReminders?: StringNullableListFilter<"CarePlan">
    emergencyProtocols?: StringNullableFilter<"CarePlan"> | string | null
    startDate?: DateTimeFilter<"CarePlan"> | Date | string
    endDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    reviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    initialAssessment?: StringNullableFilter<"CarePlan"> | string | null
    progressNotes?: StringNullableListFilter<"CarePlan">
    goalsAchieved?: StringNullableListFilter<"CarePlan">
    challengesFaced?: StringNullableListFilter<"CarePlan">
    diagnosisCodes?: StringNullableListFilter<"CarePlan">
    treatmentPlan?: StringNullableFilter<"CarePlan"> | string | null
    restrictionsLimitations?: StringNullableFilter<"CarePlan"> | string | null
    safetyConsiderations?: StringNullableFilter<"CarePlan"> | string | null
    primaryCaregiver?: StringNullableFilter<"CarePlan"> | string | null
    supervising?: StringNullableFilter<"CarePlan"> | string | null
    familyContacts?: JsonNullableFilter<"CarePlan">
    approvedBy?: StringNullableFilter<"CarePlan"> | string | null
    approvedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    nextReviewBy?: StringNullableFilter<"CarePlan"> | string | null
    createdAt?: DateTimeFilter<"CarePlan"> | Date | string
    updatedAt?: DateTimeFilter<"CarePlan"> | Date | string
    createdBy?: StringNullableFilter<"CarePlan"> | string | null
    updatedBy?: StringNullableFilter<"CarePlan"> | string | null
    deletedAt?: DateTimeNullableFilter<"CarePlan"> | Date | string | null
    version?: IntFilter<"CarePlan"> | number
    dataClassification?: EnumDataClassificationFilter<"CarePlan"> | $Enums.DataClassification
  }

  export type BudgetUpsertWithWhereUniqueWithoutClientInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutClientInput, BudgetUncheckedUpdateWithoutClientInput>
    create: XOR<BudgetCreateWithoutClientInput, BudgetUncheckedCreateWithoutClientInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutClientInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutClientInput, BudgetUncheckedUpdateWithoutClientInput>
  }

  export type BudgetUpdateManyWithWhereWithoutClientInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutClientInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    OR?: BudgetScalarWhereInput[]
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    id?: StringFilter<"Budget"> | string
    clientId?: StringFilter<"Budget"> | string
    name?: StringFilter<"Budget"> | string
    description?: StringNullableFilter<"Budget"> | string | null
    status?: EnumBudgetStatusFilter<"Budget"> | $Enums.BudgetStatus
    budgetType?: StringFilter<"Budget"> | string
    totalAllocated?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFilter<"Budget"> | Date | string
    periodEnd?: DateTimeFilter<"Budget"> | Date | string
    fiscalYear?: IntNullableFilter<"Budget"> | number | null
    personalCare?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServices?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportation?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModifications?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    other?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    otherSpent?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    approvedBy?: StringNullableFilter<"Budget"> | string | null
    approvedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    lastReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    nextReviewDate?: DateTimeNullableFilter<"Budget"> | Date | string | null
    autoRenew?: BoolFilter<"Budget"> | boolean
    warningThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: DecimalNullableFilter<"Budget"> | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFilter<"Budget"> | boolean
    fundingSource?: StringNullableFilter<"Budget"> | string | null
    authorizationNumber?: StringNullableFilter<"Budget"> | string | null
    authorizationExpiry?: DateTimeNullableFilter<"Budget"> | Date | string | null
    notes?: StringNullableFilter<"Budget"> | string | null
    restrictions?: StringNullableFilter<"Budget"> | string | null
    approvalRequired?: BoolFilter<"Budget"> | boolean
    createdAt?: DateTimeFilter<"Budget"> | Date | string
    updatedAt?: DateTimeFilter<"Budget"> | Date | string
    createdBy?: StringNullableFilter<"Budget"> | string | null
    updatedBy?: StringNullableFilter<"Budget"> | string | null
    deletedAt?: DateTimeNullableFilter<"Budget"> | Date | string | null
    version?: IntFilter<"Budget"> | number
    dataClassification?: EnumDataClassificationFilter<"Budget"> | $Enums.DataClassification
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    sessionId?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    endpoint?: StringNullableFilter<"AuditLog"> | string | null
    reason?: StringNullableFilter<"AuditLog"> | string | null
    approvalRequired?: BoolFilter<"AuditLog"> | boolean
    approvedBy?: StringNullableFilter<"AuditLog"> | string | null
    dataAccessed?: EnumDataClassificationNullableFilter<"AuditLog"> | $Enums.DataClassification | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutClientVisitsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientVisitsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientVisitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientVisitsInput, UserUncheckedCreateWithoutClientVisitsInput>
  }

  export type UserCreateWithoutWorkerVisitsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkerVisitsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkerVisitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkerVisitsInput, UserUncheckedCreateWithoutWorkerVisitsInput>
  }

  export type CarePlanCreateWithoutVisitsInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutCarePlansInput
  }

  export type CarePlanUncheckedCreateWithoutVisitsInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type CarePlanCreateOrConnectWithoutVisitsInput = {
    where: CarePlanWhereUniqueInput
    create: XOR<CarePlanCreateWithoutVisitsInput, CarePlanUncheckedCreateWithoutVisitsInput>
  }

  export type BudgetExpenseCreateWithoutVisitInput = {
    id?: string
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    budget: BudgetCreateNestedOneWithoutExpensesInput
  }

  export type BudgetExpenseUncheckedCreateWithoutVisitInput = {
    id?: string
    budgetId: string
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseCreateOrConnectWithoutVisitInput = {
    where: BudgetExpenseWhereUniqueInput
    create: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput>
  }

  export type BudgetExpenseCreateManyVisitInputEnvelope = {
    data: BudgetExpenseCreateManyVisitInput | BudgetExpenseCreateManyVisitInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClientVisitsInput = {
    update: XOR<UserUpdateWithoutClientVisitsInput, UserUncheckedUpdateWithoutClientVisitsInput>
    create: XOR<UserCreateWithoutClientVisitsInput, UserUncheckedCreateWithoutClientVisitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientVisitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientVisitsInput, UserUncheckedUpdateWithoutClientVisitsInput>
  }

  export type UserUpdateWithoutClientVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutWorkerVisitsInput = {
    update: XOR<UserUpdateWithoutWorkerVisitsInput, UserUncheckedUpdateWithoutWorkerVisitsInput>
    create: XOR<UserCreateWithoutWorkerVisitsInput, UserUncheckedCreateWithoutWorkerVisitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkerVisitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkerVisitsInput, UserUncheckedUpdateWithoutWorkerVisitsInput>
  }

  export type UserUpdateWithoutWorkerVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkerVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CarePlanUpsertWithoutVisitsInput = {
    update: XOR<CarePlanUpdateWithoutVisitsInput, CarePlanUncheckedUpdateWithoutVisitsInput>
    create: XOR<CarePlanCreateWithoutVisitsInput, CarePlanUncheckedCreateWithoutVisitsInput>
    where?: CarePlanWhereInput
  }

  export type CarePlanUpdateToOneWithWhereWithoutVisitsInput = {
    where?: CarePlanWhereInput
    data: XOR<CarePlanUpdateWithoutVisitsInput, CarePlanUncheckedUpdateWithoutVisitsInput>
  }

  export type CarePlanUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutCarePlansNestedInput
  }

  export type CarePlanUncheckedUpdateWithoutVisitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseUpsertWithWhereUniqueWithoutVisitInput = {
    where: BudgetExpenseWhereUniqueInput
    update: XOR<BudgetExpenseUpdateWithoutVisitInput, BudgetExpenseUncheckedUpdateWithoutVisitInput>
    create: XOR<BudgetExpenseCreateWithoutVisitInput, BudgetExpenseUncheckedCreateWithoutVisitInput>
  }

  export type BudgetExpenseUpdateWithWhereUniqueWithoutVisitInput = {
    where: BudgetExpenseWhereUniqueInput
    data: XOR<BudgetExpenseUpdateWithoutVisitInput, BudgetExpenseUncheckedUpdateWithoutVisitInput>
  }

  export type BudgetExpenseUpdateManyWithWhereWithoutVisitInput = {
    where: BudgetExpenseScalarWhereInput
    data: XOR<BudgetExpenseUpdateManyMutationInput, BudgetExpenseUncheckedUpdateManyWithoutVisitInput>
  }

  export type BudgetExpenseScalarWhereInput = {
    AND?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
    OR?: BudgetExpenseScalarWhereInput[]
    NOT?: BudgetExpenseScalarWhereInput | BudgetExpenseScalarWhereInput[]
    id?: StringFilter<"BudgetExpense"> | string
    budgetId?: StringFilter<"BudgetExpense"> | string
    visitId?: StringNullableFilter<"BudgetExpense"> | string | null
    description?: StringFilter<"BudgetExpense"> | string
    category?: StringFilter<"BudgetExpense"> | string
    amount?: DecimalFilter<"BudgetExpense"> | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFilter<"BudgetExpense"> | Date | string
    approvedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    approvedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    status?: StringFilter<"BudgetExpense"> | string
    receiptUrl?: StringNullableFilter<"BudgetExpense"> | string | null
    notes?: StringNullableFilter<"BudgetExpense"> | string | null
    createdAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    updatedAt?: DateTimeFilter<"BudgetExpense"> | Date | string
    createdBy?: StringNullableFilter<"BudgetExpense"> | string | null
    updatedBy?: StringNullableFilter<"BudgetExpense"> | string | null
    deletedAt?: DateTimeNullableFilter<"BudgetExpense"> | Date | string | null
    version?: IntFilter<"BudgetExpense"> | number
    dataClassification?: EnumDataClassificationFilter<"BudgetExpense"> | $Enums.DataClassification
  }

  export type UserCreateWithoutCarePlansInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCarePlansInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCarePlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCarePlansInput, UserUncheckedCreateWithoutCarePlansInput>
  }

  export type VisitCreateWithoutCarePlanInput = {
    id?: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutClientVisitsInput
    worker: UserCreateNestedOneWithoutWorkerVisitsInput
    expenses?: BudgetExpenseCreateNestedManyWithoutVisitInput
  }

  export type VisitUncheckedCreateWithoutCarePlanInput = {
    id?: string
    clientId: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedCreateNestedManyWithoutVisitInput
  }

  export type VisitCreateOrConnectWithoutCarePlanInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput>
  }

  export type VisitCreateManyCarePlanInputEnvelope = {
    data: VisitCreateManyCarePlanInput | VisitCreateManyCarePlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCarePlansInput = {
    update: XOR<UserUpdateWithoutCarePlansInput, UserUncheckedUpdateWithoutCarePlansInput>
    create: XOR<UserCreateWithoutCarePlansInput, UserUncheckedCreateWithoutCarePlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCarePlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCarePlansInput, UserUncheckedUpdateWithoutCarePlansInput>
  }

  export type UserUpdateWithoutCarePlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCarePlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VisitUpsertWithWhereUniqueWithoutCarePlanInput = {
    where: VisitWhereUniqueInput
    update: XOR<VisitUpdateWithoutCarePlanInput, VisitUncheckedUpdateWithoutCarePlanInput>
    create: XOR<VisitCreateWithoutCarePlanInput, VisitUncheckedCreateWithoutCarePlanInput>
  }

  export type VisitUpdateWithWhereUniqueWithoutCarePlanInput = {
    where: VisitWhereUniqueInput
    data: XOR<VisitUpdateWithoutCarePlanInput, VisitUncheckedUpdateWithoutCarePlanInput>
  }

  export type VisitUpdateManyWithWhereWithoutCarePlanInput = {
    where: VisitScalarWhereInput
    data: XOR<VisitUpdateManyMutationInput, VisitUncheckedUpdateManyWithoutCarePlanInput>
  }

  export type UserCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBudgetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  export type BudgetExpenseCreateWithoutBudgetInput = {
    id?: string
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    visit?: VisitCreateNestedOneWithoutExpensesInput
  }

  export type BudgetExpenseUncheckedCreateWithoutBudgetInput = {
    id?: string
    visitId?: string | null
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseCreateOrConnectWithoutBudgetInput = {
    where: BudgetExpenseWhereUniqueInput
    create: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetExpenseCreateManyBudgetInputEnvelope = {
    data: BudgetExpenseCreateManyBudgetInput | BudgetExpenseCreateManyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBudgetsInput = {
    update: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
  }

  export type UserUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BudgetExpenseUpsertWithWhereUniqueWithoutBudgetInput = {
    where: BudgetExpenseWhereUniqueInput
    update: XOR<BudgetExpenseUpdateWithoutBudgetInput, BudgetExpenseUncheckedUpdateWithoutBudgetInput>
    create: XOR<BudgetExpenseCreateWithoutBudgetInput, BudgetExpenseUncheckedCreateWithoutBudgetInput>
  }

  export type BudgetExpenseUpdateWithWhereUniqueWithoutBudgetInput = {
    where: BudgetExpenseWhereUniqueInput
    data: XOR<BudgetExpenseUpdateWithoutBudgetInput, BudgetExpenseUncheckedUpdateWithoutBudgetInput>
  }

  export type BudgetExpenseUpdateManyWithWhereWithoutBudgetInput = {
    where: BudgetExpenseScalarWhereInput
    data: XOR<BudgetExpenseUpdateManyMutationInput, BudgetExpenseUncheckedUpdateManyWithoutBudgetInput>
  }

  export type BudgetCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutExpensesInput = {
    id?: string
    clientId: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetCreateOrConnectWithoutExpensesInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
  }

  export type VisitCreateWithoutExpensesInput = {
    id?: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    client: UserCreateNestedOneWithoutClientVisitsInput
    worker: UserCreateNestedOneWithoutWorkerVisitsInput
    carePlan?: CarePlanCreateNestedOneWithoutVisitsInput
  }

  export type VisitUncheckedCreateWithoutExpensesInput = {
    id?: string
    clientId: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type VisitCreateOrConnectWithoutExpensesInput = {
    where: VisitWhereUniqueInput
    create: XOR<VisitCreateWithoutExpensesInput, VisitUncheckedCreateWithoutExpensesInput>
  }

  export type BudgetUpsertWithoutExpensesInput = {
    update: XOR<BudgetUpdateWithoutExpensesInput, BudgetUncheckedUpdateWithoutExpensesInput>
    create: XOR<BudgetCreateWithoutExpensesInput, BudgetUncheckedCreateWithoutExpensesInput>
    where?: BudgetWhereInput
  }

  export type BudgetUpdateToOneWithWhereWithoutExpensesInput = {
    where?: BudgetWhereInput
    data: XOR<BudgetUpdateWithoutExpensesInput, BudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type BudgetUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitUpsertWithoutExpensesInput = {
    update: XOR<VisitUpdateWithoutExpensesInput, VisitUncheckedUpdateWithoutExpensesInput>
    create: XOR<VisitCreateWithoutExpensesInput, VisitUncheckedCreateWithoutExpensesInput>
    where?: VisitWhereInput
  }

  export type VisitUpdateToOneWithWhereWithoutExpensesInput = {
    where?: VisitWhereInput
    data: XOR<VisitUpdateWithoutExpensesInput, VisitUncheckedUpdateWithoutExpensesInput>
  }

  export type VisitUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutClientVisitsNestedInput
    worker?: UserUpdateOneRequiredWithoutWorkerVisitsNestedInput
    carePlan?: CarePlanUpdateOneWithoutVisitsNestedInput
  }

  export type VisitUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileCreateNestedOneWithoutUserInput
    clientVisits?: VisitCreateNestedManyWithoutClientInput
    workerVisits?: VisitCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserCreateNestedManyWithoutSupervisorInput
    supervisor?: UserCreateNestedOneWithoutSupervisedWorkersInput
    carePlans?: CarePlanCreateNestedManyWithoutClientInput
    budgets?: BudgetCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    supervisorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    clientVisits?: VisitUncheckedCreateNestedManyWithoutClientInput
    workerVisits?: VisitUncheckedCreateNestedManyWithoutWorkerInput
    supervisedWorkers?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    carePlans?: CarePlanUncheckedCreateNestedManyWithoutClientInput
    budgets?: BudgetUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    supervisor?: UserUpdateOneWithoutSupervisedWorkersNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supervisorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
  }

  export type VisitCreateManyClientInput = {
    id?: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type VisitCreateManyWorkerInput = {
    id?: string
    clientId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    carePlanId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type UserCreateManySupervisorInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    isActive?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    lastLoginAt?: Date | string | null
    refreshToken?: string | null
    refreshTokenExpiresAt?: Date | string | null
    passwordResetToken?: string | null
    passwordResetExpiresAt?: Date | string | null
    loginAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type CarePlanCreateManyClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.CarePlanStatus
    priority?: string | null
    category?: string | null
    goals?: CarePlanCreategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanCreateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanCreatestandardActivitiesInput | string[]
    specialInstructions?: string | null
    medicationReminders?: CarePlanCreatemedicationRemindersInput | string[]
    emergencyProtocols?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    reviewDate?: Date | string | null
    lastReviewDate?: Date | string | null
    initialAssessment?: string | null
    progressNotes?: CarePlanCreateprogressNotesInput | string[]
    goalsAchieved?: CarePlanCreategoalsAchievedInput | string[]
    challengesFaced?: CarePlanCreatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanCreatediagnosisCodesInput | string[]
    treatmentPlan?: string | null
    restrictionsLimitations?: string | null
    safetyConsiderations?: string | null
    primaryCaregiver?: string | null
    supervising?: string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: string | null
    approvedAt?: Date | string | null
    nextReviewBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetCreateManyClientInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BudgetStatus
    budgetType?: string
    totalAllocated: Decimal | DecimalJsLike | number | string
    totalSpent?: Decimal | DecimalJsLike | number | string
    totalCommitted?: Decimal | DecimalJsLike | number | string
    remaining?: Decimal | DecimalJsLike | number | string
    periodStart: Date | string
    periodEnd: Date | string
    fiscalYear?: number | null
    personalCare?: Decimal | DecimalJsLike | number | string | null
    medicalServices?: Decimal | DecimalJsLike | number | string | null
    transportation?: Decimal | DecimalJsLike | number | string | null
    homeModifications?: Decimal | DecimalJsLike | number | string | null
    emergencyFund?: Decimal | DecimalJsLike | number | string | null
    other?: Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: Decimal | DecimalJsLike | number | string | null
    transportationSpent?: Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: Decimal | DecimalJsLike | number | string | null
    otherSpent?: Decimal | DecimalJsLike | number | string | null
    approvedBy?: string | null
    approvedAt?: Date | string | null
    lastReviewDate?: Date | string | null
    nextReviewDate?: Date | string | null
    autoRenew?: boolean
    warningThreshold?: Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: boolean
    fundingSource?: string | null
    authorizationNumber?: string | null
    authorizationExpiry?: Date | string | null
    notes?: string | null
    restrictions?: string | null
    approvalRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    sessionId?: string | null
    requestId?: string | null
    endpoint?: string | null
    reason?: string | null
    approvalRequired?: boolean
    approvedBy?: string | null
    dataAccessed?: $Enums.DataClassification | null
    createdAt?: Date | string
  }

  export type VisitUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    worker?: UserUpdateOneRequiredWithoutWorkerVisitsNestedInput
    carePlan?: CarePlanUpdateOneWithoutVisitsNestedInput
    expenses?: BudgetExpenseUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutClientVisitsNestedInput
    carePlan?: CarePlanUpdateOneWithoutVisitsNestedInput
    expenses?: BudgetExpenseUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateManyWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    carePlanId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type UserUpdateWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUpdateManyWithoutClientNestedInput
    budgets?: BudgetUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    clientVisits?: VisitUncheckedUpdateManyWithoutClientNestedInput
    workerVisits?: VisitUncheckedUpdateManyWithoutWorkerNestedInput
    supervisedWorkers?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    carePlans?: CarePlanUncheckedUpdateManyWithoutClientNestedInput
    budgets?: BudgetUncheckedUpdateManyWithoutClientNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSupervisorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type CarePlanUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    visits?: VisitUpdateManyWithoutCarePlanNestedInput
  }

  export type CarePlanUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    visits?: VisitUncheckedUpdateManyWithoutCarePlanNestedInput
  }

  export type CarePlanUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCarePlanStatusFieldUpdateOperationsInput | $Enums.CarePlanStatus
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    goals?: CarePlanUpdategoalsInput | string[]
    objectives?: NullableJsonNullValueInput | InputJsonValue
    expectedOutcomes?: CarePlanUpdateexpectedOutcomesInput | string[]
    standardActivities?: CarePlanUpdatestandardActivitiesInput | string[]
    specialInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    medicationReminders?: CarePlanUpdatemedicationRemindersInput | string[]
    emergencyProtocols?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    initialAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    progressNotes?: CarePlanUpdateprogressNotesInput | string[]
    goalsAchieved?: CarePlanUpdategoalsAchievedInput | string[]
    challengesFaced?: CarePlanUpdatechallengesFacedInput | string[]
    diagnosisCodes?: CarePlanUpdatediagnosisCodesInput | string[]
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    restrictionsLimitations?: NullableStringFieldUpdateOperationsInput | string | null
    safetyConsiderations?: NullableStringFieldUpdateOperationsInput | string | null
    primaryCaregiver?: NullableStringFieldUpdateOperationsInput | string | null
    supervising?: NullableStringFieldUpdateOperationsInput | string | null
    familyContacts?: NullableJsonNullValueInput | InputJsonValue
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBudgetStatusFieldUpdateOperationsInput | $Enums.BudgetStatus
    budgetType?: StringFieldUpdateOperationsInput | string
    totalAllocated?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalSpent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalCommitted?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    fiscalYear?: NullableIntFieldUpdateOperationsInput | number | null
    personalCare?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServices?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportation?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModifications?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFund?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    other?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    personalCareSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    medicalServicesSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transportationSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    homeModificationsSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    emergencyFundSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    otherSpent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextReviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    autoRenew?: BoolFieldUpdateOperationsInput | boolean
    warningThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    criticalThreshold?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    alertsEnabled?: BoolFieldUpdateOperationsInput | boolean
    fundingSource?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    restrictions?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: NullableStringFieldUpdateOperationsInput | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRequired?: BoolFieldUpdateOperationsInput | boolean
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessed?: NullableEnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetExpenseCreateManyVisitInput = {
    id?: string
    budgetId: string
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseUpdateWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    budget?: BudgetUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type BudgetExpenseUncheckedUpdateWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseUncheckedUpdateManyWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    budgetId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type VisitCreateManyCarePlanInput = {
    id?: string
    clientId: string
    workerId: string
    scheduledAt: Date | string
    scheduledEndAt?: Date | string | null
    actualStartAt?: Date | string | null
    actualEndAt?: Date | string | null
    duration?: number | null
    actualDuration?: number | null
    status?: $Enums.VisitStatus
    visitType?: string | null
    location?: string | null
    notes?: string | null
    privateNotes?: string | null
    activities?: VisitCreateactivitiesInput | string[]
    plannedActivities?: VisitCreateplannedActivitiesInput | string[]
    medications?: VisitCreatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: number | null
    workerNotes?: string | null
    supervisorReview?: string | null
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    billableTime?: number | null
    billingRate?: Decimal | DecimalJsLike | number | string | null
    totalCost?: Decimal | DecimalJsLike | number | string | null
    invoiceId?: string | null
    documentationComplete?: boolean
    cancellationReason?: string | null
    rescheduledFrom?: string | null
    rescheduledTo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type VisitUpdateWithoutCarePlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    client?: UserUpdateOneRequiredWithoutClientVisitsNestedInput
    worker?: UserUpdateOneRequiredWithoutWorkerVisitsNestedInput
    expenses?: BudgetExpenseUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateWithoutCarePlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    expenses?: BudgetExpenseUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type VisitUncheckedUpdateManyWithoutCarePlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    actualDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumVisitStatusFieldUpdateOperationsInput | $Enums.VisitStatus
    visitType?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    privateNotes?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: VisitUpdateactivitiesInput | string[]
    plannedActivities?: VisitUpdateplannedActivitiesInput | string[]
    medications?: VisitUpdatemedicationsInput | string[]
    vitals?: NullableJsonNullValueInput | InputJsonValue
    clientSatisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    workerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    supervisorReview?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    billableTime?: NullableIntFieldUpdateOperationsInput | number | null
    billingRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    documentationComplete?: BoolFieldUpdateOperationsInput | boolean
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledFrom?: NullableStringFieldUpdateOperationsInput | string | null
    rescheduledTo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseCreateManyBudgetInput = {
    id?: string
    visitId?: string | null
    description: string
    category: string
    amount: Decimal | DecimalJsLike | number | string
    expenseDate: Date | string
    approvedBy?: string | null
    approvedAt?: Date | string | null
    status?: string
    receiptUrl?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
    deletedAt?: Date | string | null
    version?: number
    dataClassification?: $Enums.DataClassification
  }

  export type BudgetExpenseUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
    visit?: VisitUpdateOneWithoutExpensesNestedInput
  }

  export type BudgetExpenseUncheckedUpdateWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }

  export type BudgetExpenseUncheckedUpdateManyWithoutBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    version?: IntFieldUpdateOperationsInput | number
    dataClassification?: EnumDataClassificationFieldUpdateOperationsInput | $Enums.DataClassification
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitCountOutputTypeDefaultArgs instead
     */
    export type VisitCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CarePlanCountOutputTypeDefaultArgs instead
     */
    export type CarePlanCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CarePlanCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BudgetCountOutputTypeDefaultArgs instead
     */
    export type BudgetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BudgetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProfileDefaultArgs instead
     */
    export type ProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitDefaultArgs instead
     */
    export type VisitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CarePlanDefaultArgs instead
     */
    export type CarePlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CarePlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BudgetDefaultArgs instead
     */
    export type BudgetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BudgetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BudgetExpenseDefaultArgs instead
     */
    export type BudgetExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BudgetExpenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}