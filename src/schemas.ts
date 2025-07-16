import { z } from 'zod';

export const bopCarEntrySchema = z.object({
	car_model: z.number(),
	car_name: z.string(),
	car_year: z.number(),
	ballast: z.number().optional(),
	ballast_change: z.number().optional(),
	restrictor: z.number().optional()
});

export const bopCarCategorySchema = z.object({
	GT3: z.array(bopCarEntrySchema).optional(),
	GT4: z.array(bopCarEntrySchema).optional()
});

export const bopTrackSchema = z.object({
	track_name: z.string(),
	bop: bopCarCategorySchema,
	bop_version: z.number(),
	active_since: z.string()
});

export const bopDataSchema = z.array(bopTrackSchema);

export type BopCarEntry = z.infer<typeof bopCarEntrySchema>;
export type BopCarCategory = z.infer<typeof bopCarCategorySchema>;
export type BopTrack = z.infer<typeof bopTrackSchema>;
export type BopData = z.infer<typeof bopDataSchema>;
