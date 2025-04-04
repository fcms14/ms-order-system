import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

export const envSchema = z.object({
    POSTGRES_HOST: z.string().nonempty({ message: 'POSTGRES_HOST is required' }),
    POSTGRES_PORT: z.preprocess((val) => Number(val), z.number().default(5432)),
    POSTGRES_USERNAME: z.string().nonempty({ message: 'POSTGRES_USERNAME is required' }),
    POSTGRES_PASSWORD: z.string().nonempty({ message: 'POSTGRES_PASSWORD is required' }),
    POSTGRES_NAME: z.string().nonempty({ message: 'POSTGRES_NAME is required' }),

    RABBITMQ_URI: z.string().nonempty({ message: 'RABBITMQ_URI is required' }),

    GATEWAY_PORT: z.preprocess((val) => Number(val), z.number().default(3000)),

    ORDER_ALLOCATOR_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3001)),
    ORDER_ALLOCATOR_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3101)),
    ORDER_DISPATCHER_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3002)),
    ORDER_DISPATCHER_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3102)),
    ORDER_FISCAL_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3003)),
    ORDER_FISCAL_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3103)),
    ORDER_FRAIGHT_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3004)),
    ORDER_FRAIGHT_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3104)),
    ORDER_INTEGRATE_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3005)),
    ORDER_INTEGRATE_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3105)),
    ORDER_ITINERARY_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3006)),
    ORDER_ITINERARY_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3106)),
    ORDER_NOTIFIER_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3007)),
    ORDER_NOTIFIER_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3107)),
    ORDER_PAYMENT_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3008)),
    ORDER_PAYMENT_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3108)),
    ORDER_PRINTER_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3009)),
    ORDER_PRINTER_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3109)),
    ORDER_REVIEW_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3010)),
    ORDER_REVIEW_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3110)),
    ORDER_STOCK_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3011)),
    ORDER_STOCK_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3111)),
    ORDER_TRACKER_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3012)),
    ORDER_TRACKER_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3112)),
    FRONTLINE_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3014)),
    FRONTLINE_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3114)),
    WHOLESALER_HTTP_PORT: z.preprocess((val) => Number(val), z.number().default(3015)),
    WHOLESALER_TCP_PORT: z.preprocess((val) => Number(val), z.number().default(3115)),

    ORDER_STOCK_DATABASE: z.string().nonempty({ message: 'ORDER_STOCK_DATABASE is required' }),
    FRONTLINE_DATABASE: z.string().nonempty({ message: 'FRONTLINE_DATABASE is required' }),
    WHOLESALER_DATABASE: z.string().nonempty({ message: 'WHOLESALER_DATABASE is required' }),
});

export const env = envSchema.parse(process.env);

export type EnvVars = z.infer<typeof envSchema>;
