import { Router, Request, Response } from 'express';
import { ProcessImageRouter } from './process_image/routes/process.image.router';

const router: Router = Router();

router.use('/filteredimage', ProcessImageRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;