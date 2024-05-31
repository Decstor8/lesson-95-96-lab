import { Router as createRouter } from "express";
import CocktailModel from "../models/Cocktail";
import { imageUpload as multerMiddleware } from "../multer";
import authMiddleware, { RequestWithUser } from "../middleware/auth";
import mongoose, { Types } from "mongoose";
import permitMiddleware from "../middleware/permit";

const router = createRouter();

router.get('/', async (_req, res, next) => {
    try {
        const cocktailList = await CocktailModel.find();
        return res.json(cocktailList);
    } catch (error) {
        return next(error);
    }
});

router.get('/userCocktails', authMiddleware, async (req: RequestWithUser, res, next) => {
    try {
        const { user: userIdQuery } = req.query;

        if (userIdQuery !== req.user?._id.toString()) {
            return res.status(403).json({ error: 'Доступ запрещен..' });
        }

        const userCocktails = await CocktailModel.find({ user: req.user?._id });
        return res.json(userCocktails);
    } catch (error) {
        return next(error);
    }
});

router.post('/', authMiddleware, multerMiddleware.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const newCocktail = new CocktailModel({
            user: req.user?._id,
            name: req.body.name,
            recipe: req.body.recipe,
            isPublished: req.body.isPublished,
            ingredients: req.body.ingredients,
            image: req.file ? req.file.filename : null,
        });

        await newCocktail.save();
        return res.json(newCocktail);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(422).json(error);
        }
        return next(error);
    }
});

router.delete('/:id', authMiddleware, permitMiddleware('admin'), async (req, res, next) => {
    try {
        const { id: cocktailId } = req.params;
        const objectId = new Types.ObjectId(cocktailId);

        const deletedCocktail = await CocktailModel.findByIdAndDelete(objectId);

        if (!deletedCocktail) {
            return res.status(403).json({ error: 'Коктейль не найден' });
        }

        return res.json({ message: 'Коктейль удален' });
    } catch (error) {
        return next(error);
    }
});

router.patch('/:id/togglePublished', authMiddleware, permitMiddleware('admin'), async (req, res, next) => {
    try {
        const { id: cocktailId } = req.params;
        const objectId = new Types.ObjectId(cocktailId);

        const cocktailToUpdate = await CocktailModel.findById(objectId);

        if (!cocktailToUpdate) {
            return res.status(403).json({ error: 'Коктейль не найден' });
        }

        await cocktailToUpdate.updateOne({ isPublished: !cocktailToUpdate.isPublished });
        await cocktailToUpdate.save();

        return res.json(cocktailToUpdate);
    } catch (error) {
        return next(error);
    }
});

export default router;
