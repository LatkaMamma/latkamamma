export type AddPayload<T extends {
    id: string,
    updatedAt: Date,
    createdAt: Date
}> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;