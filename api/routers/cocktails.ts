import {Router} from "express";
import Cocktail from "../models/Cocktail";
import {imageUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose, {Types} from "mongoose";
import permit from "../middleware/permit";
const cocktailsRouter = Router();

cocktailsRouter.get('/', async (_req, res, next) => {
    try {
        const cocktails = await Cocktail.find();

        return res.send(cocktails);
    } catch (err) {
        return next();
    }
});

cocktailsRouter.get('/userCocktails', auth, async (req: RequestWithUser, res, next) => {
    try {
        const userIdParam = req.query.user as string;

        if (userIdParam !== req.user?._id.toString()) {
            return res.status(403).send({error: 'Access denied!!'});
        }

        const result = await Cocktail.find({user: req.user?._id});

        return res.send(result);
    } catch (err) {
        return next(err);
    }
});

cocktailsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const cocktail = new Cocktail({
            user: req.user?._id,
            name: req.body.name,
            recipe: req.body.recipe,
            isPublished: req.body.isPublished,
            ingredients: JSON.parse(req.body.ingredients),
            image: req.file ? req.file.filename : null,
        });

        await cocktail.save();

        return res.send(cocktail);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(err);
        }

        return next(err);
    }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(422).send({error: 'Wrong objectId!'});
        }

        const cocktail = await Cocktail.findByIdAndDelete(_id);

        if (!cocktail) {
            return res.status(403).send({error: `cocktail not found!`});
        }

        return res.send({message: 'Cocktail deleted!'});
    } catch (err) {
        return next(err);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(422).send({error: 'Wrong objectId!'});
        }

        const cocktail = await Cocktail.findById(_id);

        if (!cocktail) {
            return res.status(403).send({error: `Cocktail not found!`});
        }

        await cocktail.updateOne({isPublished: !cocktail.isPublished});
        await cocktail.save();

        return res.send(cocktail);

    } catch (err) {
        return next(err);
    }
});

export default cocktailsRouter;