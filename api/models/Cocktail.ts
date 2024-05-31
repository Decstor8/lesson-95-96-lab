import {Schema, model, Types} from "mongoose";
import User from "./User";

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const artist = await User.findById(value);
                return Boolean(artist);
            },
            message: 'Пользователь не существует',
        }
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients: {
        type: [{
            ingredientName: String,
            quantity: String,
        }],
        required: true,
    }
});

const Cocktail = model('Cocktail', CocktailSchema);
export default Cocktail;