import { IndexResources } from "../../lang/IndexResources";
import { IProduct } from "domain/IProduct";
import { IProductType } from "domain/IProductType";
import { ProductService } from "services/product-service";
import { ProductInListService } from "services/productinlist-service";
import { ShoppingCartService } from "services/shoppingcart-service";
import { ProductTypeService } from "services/producttype-service";
import { autoinject, LogManager } from "aurelia-framework";
import { Store, connectTo } from "aurelia-store";
import { IState } from "state/state";
import { AppState } from "../../state/app-state";

export const log = LogManager.getLogger("app.HomeIndex");

@connectTo()
@autoinject
export class ProductsIndex {
    public state!: IState;

    private userId = this.appState.userId;
    private userRole = this.appState.getUserRole;
    private scId?: string | undefined;

    products: IProduct[] = [];
    productTypes: IProductType[] = [];
    productsAmount: number = 0;
    pagination: number[] = [];

    search: string = "";
    searchType: string = "";
    order: string = "";
    limit: string = "18";
    page: number = 1;

    private langResources = IndexResources;

    constructor(
        private productService: ProductService,
        private productTypeService: ProductTypeService,
        private productInListService: ProductInListService,
        private shoppingCartService: ShoppingCartService,
        private appState: AppState
    ) {}

    attached() {
        if (this.appState.jwt != null) {
            this.shoppingCartService
                .getShoppingCartByAppId(this.userId)
                .then((response) => {
                    if (response.data) {
                        this.scId = response.data.id;
                    }
                });
        }

        this.reloadProducts();
    }

    reloadProducts(): void {
        this.productService
            .getAllProducts(
                this.search,
                this.searchType,
                this.order,
                this.limit,
                this.page.toString(),
                this.state.selectedCulture.code
            )
            .then((response) => {
                if (response.data) {
                    this.products = response.data;
                    this.pagination = this.productService.getPagination(
                        this.getTotalAmountOfProducts(),
                        parseInt(this.limit)
                    );
                }
            });

        this.productTypeService
            .getAllProductTypes(this.state.selectedCulture.code)
            .then((response) => {
                if (response.data) {
                    this.productTypes = response.data;
                }
            });
    }

    getTotalAmountOfProducts(): number {
        this.productService
            .getAllProducts(
                this.search,
                this.searchType,
                this.order,
                "1024",
                this.page.toString(),
                this.state.selectedCulture.code
            )
            .then((response) => {
                if (response.data) {
                    return response.data.length;
                }
            });
        return 24;
    }

    previousPage(): void {
        if (this.page > 1) {
            this.page--;
            this.reloadProducts();
        }
    }

    nextPage(): void {
        if (this.page < this.pagination.length) {
            this.page++;
            this.reloadProducts();
        }
    }

    pageChosen(page: string): void {
        this.page = parseInt(page);
        this.reloadProducts();
    }

    searchProducts(): void {
        this.reloadProducts();
    }

    changeSearchType(searchTypeId: string): void {
        this.search = "";
        this.searchType = searchTypeId;
        this.reloadProducts();
    }

    resetFilters(): void {
        this.search = "";
        this.searchType = "";
        this.limit = "18";
        this.order = "";
        this.page = 1;
        this.reloadProducts();
    }

    addToShoppingCart(productId: string) {
        if (typeof productId !== "undefined") {
            let added = this.productInListService.addProductToShoppingCart({
                productId: productId!,
                shoppingCartId: this.scId!,
                quantity: 1,
                totalCost: 0,
            });
        }
    }
}
