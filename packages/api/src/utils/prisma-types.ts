/**
 * Prisma Type Integration Utilities
 *
 * Handles exactOptionalPropertyTypes compatibility between our internal types
 * and Prisma-generated types by properly filtering undefined values.
 */

/**
 * Removes undefined values from an object to make it compatible with Prisma types
 * that don't accept undefined for optional properties with exactOptionalPropertyTypes: true
 */
export function filterUndefinedValues<T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  )
}

/**
 * Converts readonly arrays to mutable arrays for Prisma compatibility
 */
export function makeMutable<T>(arr: readonly T[]): T[] {
  return [...arr]
}

/**
 * Creates a Prisma-compatible date value that accepts null but not undefined
 */
export function toPrismaDate(date: Date | undefined): Date | null {
  return date ?? null
}

/**
 * Creates a Prisma-compatible string value that accepts null but not undefined
 */
export function toPrismaString(value: string | undefined): string | null {
  return value ?? null
}

/**
 * Creates a Prisma-compatible array value that accepts null but not undefined
 */
export function toPrismaArray<T>(arr: readonly T[] | undefined): T[] | null {
  return arr ? makeMutable(arr) : null
}

/**
 * Conditional object builder for exactOptionalPropertyTypes compatibility
 * Only includes properties that have defined values
 */
export function buildConditionalObject<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>
}