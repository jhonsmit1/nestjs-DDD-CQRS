
// type LogMeta = Record<string, unknown>;

export abstract class Logger {
    abstract info(message: string, meta?: unknown): void;
    abstract warn(message: string, meta?: unknown): void;
    abstract error(message: string, meta?: unknown): void;
}
