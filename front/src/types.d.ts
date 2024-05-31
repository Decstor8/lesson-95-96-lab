export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    image: string | null;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface UserTypes {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string | null;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        },
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: UserTypes;
}

export interface MainError {
    error: string;
}

export interface CocktailTypes {
    _id: string
    user: string;
    name: string;
    image: string | null;
    recipe: string;
    isPublished: boolean;
    ingredients: [{
        _id: string;
        ingredientName: string;
        quantity: string;
    }]
}

export interface NewCocktails {
    name: string;
    image: string | null;
    recipe: string;
    ingredients: {
        ingredientName: string;
        quantity: string;
    }[]
}