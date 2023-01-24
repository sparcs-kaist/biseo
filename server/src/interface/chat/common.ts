import { z } from "zod";

export const Message = z.object({
	id: z.number(),
	user: z.object({
		id: z.number(),
		nickname: z.string(),
	}),
	type: z.string(),
	message: z.string(),
	createdAt: z.string(),
});
export type Message = z.infer<typeof Message>;

