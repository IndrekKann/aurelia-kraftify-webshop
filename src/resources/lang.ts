import { autoinject } from "aurelia-framework";

interface ILangStrings {
    name: string;
    description: string;
    language: string;
    login: string;
    logout: string;
    register: string;
    categories: string;
    order: string;
    productsPerPage: string;
    search: string;
    addToShoppingCart: string;
    homePage: string;
    products: string;
    shoppingCart: string;
    privacy: string;
    hello: string;
    image: string;
    price: string;
    quantity: string;
    total: string;
    remove: string;
    continueShopping: string;
    checkout: string;
    phone: string;
    destination: string;
    bank: string;
    backToOrders: string;
    createNew: string;
    from: string;
    to: string;
    filter: string;
    edit: string;
    save: string;
    delete: string;
}

interface ILangResources {
    "et-EE": ILangStrings;
    "en-GB": ILangStrings;
    [propName: string]: ILangStrings;
}

const LangResources: ILangResources = {
    "et-EE": {
        name: "Nimi",
        description: "Kirjeldus",
        language: "Keel",
        login: "Logi sisse",
        logout: "Logi välja",
        register: "Registreeri",
        categories: "Kategooriad",
        order: "Järjesta",
        productsPerPage: "Toodet lehel",
        search: "Otsi",
        addToShoppingCart: "Lisa ostukorvi",
        homePage: "Avaleht",
        products: "Tooted",
        shoppingCart: "Ostukorv",
        privacy: "Privaatsus",
        hello: "Tere",
        image: "Pilt",
        price: "Hind",
        quantity: "Kogus",
        total: "Kokku",
        remove: "Eemalda?",
        continueShopping: "Jätka poodlemist",
        checkout: "VORMISTA OST",
        phone: "Telefon",
        destination: "Asukoht (Omniva)",
        bank: "Pank",
        backToOrders: "Tagasi tellimuste juurde",
        createNew: "Loo uus",
        from: "Alates",
        to: "Kuni",
        filter: "Filtreeri",
        edit: "Muuda",
        save: "Salvesta",
        delete: "Kustuta",
    },
    "en-GB": {
        name: "Name",
        description: "Description",
        language: "Language",
        login: "Login",
        logout: "Logout",
        register: "Register",
        categories: "Categories",
        order: "Order by",
        productsPerPage: "Products per page",
        search: "Search",
        addToShoppingCart: "Add to shopping cart",
        homePage: "Home",
        products: "Products",
        shoppingCart: "Shopping cart",
        privacy: "Privacy",
        hello: "Hello",
        image: "Image",
        price: "Price",
        quantity: "Quantity",
        total: "Total cost",
        remove: "Remove?",
        continueShopping: "Continue shopping",
        checkout: "CHECKOUT",
        phone: "Phone",
        destination: "Destination (Omniva)",
        bank: "Bank",
        backToOrders: "Back to orders",
        createNew: "Create new",
        from: "From",
        to: "To",
        filter: "Filter",
        edit: "Edit",
        save: "Save",
        delete: "Delete",
    },
};

@autoinject
export default class LangStrings {
    /*
    selected: ILangStrings;
    constructor(private appState: AppState) {
        this.selected = LangResources[this.appState.culture?.code || 'en-GB'];
    }

    setLang(lang = 'en-GB'): void {
        this.selected = LangResources[lang];
    }
    */
}
