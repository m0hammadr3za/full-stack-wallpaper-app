import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';

const handlePostCollection = catchAsync(async (req: Request, res: Response) => {
  return res.json({ ok: true });
});

export { handlePostCollection };