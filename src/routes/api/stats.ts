import { Request, Response, Router } from "express";
import { getStats } from "../../services/song";


const router: Router = Router();


// @route   GET api/stats
// @desc    returns basic stats about songs dataset
// @access  restricted
router.get('/', async (req: Request, res: Response) => {

    const docs = await getStats();


    return res.json(docs);
});



export default router;