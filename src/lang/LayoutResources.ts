export interface ILayoutResourceStrings {
    language: string;
    home: string;
    products: string;
    shoppingCart: string;
    payments: string;
    privacy: string;
    register: string;
    login: string;
    logout: string;
    hello: string;
}
export interface ILayoutResources {
    "en-GB": ILayoutResourceStrings;
    "et-EE": ILayoutResourceStrings;
}
export const LayoutResources: ILayoutResources = {
    "en-GB": {
        language: "Language",
        home: "Home",
        products: "Products",
        shoppingCart: "Shopping cart",
        payments: "Active orders",
        privacy: "Privacy",
        register: "Register",
        login: "Login",
        logout: "Logout",
        hello: "Hello",
    },
    "et-EE": {
        language: "Keel",
        home: "Avaleht",
        products: "Tooted",
        shoppingCart: "Ostukorv",
        payments: "Aktiivsed tellimused",
        privacy: "Privaatsus",
        register: "Registreeri",
        login: "Logi sisse",
        logout: "Logi välja",
        hello: "Tere",
    },
};
