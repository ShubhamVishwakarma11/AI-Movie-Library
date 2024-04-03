export {};

declare global {
  namespace Express {
    export interface Request {
      locals: {
        _id: string;
      };
    }
  }
}
