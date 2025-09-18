import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["CLIENT", "WORKER", "ADMIN"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    role: "CLIENT" | "WORKER" | "ADMIN";
}, {
    id: string;
    email: string;
    role: "CLIENT" | "WORKER" | "ADMIN";
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const visitSchema: z.ZodObject<{
    id: z.ZodString;
    clientId: z.ZodString;
    workerId: z.ZodString;
    scheduledAt: z.ZodString;
    status: z.ZodEnum<["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    clientId: string;
    workerId: string;
    scheduledAt: string;
}, {
    id: string;
    status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    clientId: string;
    workerId: string;
    scheduledAt: string;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
//# sourceMappingURL=schemas.d.ts.map