import { Request, Response, Router } from "express";
import Song from "../../models/Song";
import { check, validationResult } from "express-validator";

const router: Router = Router();


// @route   GET api/song
// @desc    returns list of songs
// @access  restricted
router.get('/', async (req: Request, res: Response) => {

    const songs = await Song.find({});

    return res.status(200).json(songs);
});


// @route   GET api/song/:id
// @desc    returns song object of given id
// @access  restricted
router.get('/:id', async (req: Request, res: Response) => {

    const song = await Song.findById(req.params.id);

    if(song === null) return res.status(404).json();

    return res.status(200).json(song);
});


// @route   POST api/song
// @desc    Creates new song
// @access  restricted
router.post('/', 
    [
        check("title", "Please include a valid title").notEmpty(),
        check("artist", "Please include a valid artist").notEmpty(),
        check("album", "Please include a valid album").notEmpty(),
        check("genre", "Please include a valid genre").notEmpty()
    ],

    async (req: Request, res: Response) => {

        try {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) return res.status(400).json(errors);

            const newSong = new Song({...req.body});
            const insertedSong = await newSong.save();

            return res.status(201).json(insertedSong);
        } catch(error) {

            console.log(error);
        };
});


// @route   PUT api/song/:id
// @desc    updates song by given id with details
// @access  restricted
router.put('/:id', 
    [
        check("title", "Please include a valid title").notEmpty(),
        check("artist", "Please include a valid artist").notEmpty(),
        check("album", "Please include a valid album").notEmpty(),
        check("genre", "Please include a valid genre").notEmpty()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) return res.status(400).json(errors);

        console.log({...req.body, _id: null});
        const thisSong = await Song.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json(req.body);
});


// @route   DELETE api/song/:id
// @desc    Permanently deletes song by given id
// @access  restricted
router.delete('/:id', async (req: Request, res: Response) => {

    try {
        const thisSong = await Song.findByIdAndDelete(req.params.id);
        
        return res.status(201).json(req.params.id);
    } catch (error) {
        
        return res.status(400).json(error);
    }

});


export default router;