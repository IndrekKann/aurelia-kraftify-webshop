import { ProductService } from "services/product-service";
import { ProductTypeService } from "services/producttype-service";
import { PriceService } from "services/price-service";
import { autoinject } from "aurelia-framework";
import { RouteConfig, NavigationInstruction, Router } from "aurelia-router";
import { IProductType } from "../../domain/IProductType";
import { IPrice } from "../../domain/IPrice";
import { IndexResources } from "../../lang/IndexResources";
import { IState } from "../../state/state";

@autoinject
export class ProductsCreate {
    public state!: IState;

    _productTypeId = "";
    _productTypes: IProductType[] = [];
    _priceId = "";
    _prices: IPrice[] = [];
    _name = "";
    _description = "";
    _image = "placeholder.png";

    private langResources = IndexResources;

    constructor(
        private productService: ProductService,
        private router: Router,
        private productTypeService: ProductTypeService,
        private priceService: PriceService
    ) {}

    attached() {
        this.productTypeService.getAllProductTypes("et-EE").then((response) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                this._productTypes = response.data!;
            }
        });
        this.priceService.getPrices().then((response) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                this._prices = response.data!;
            }
        });
    }

    activate(
        params: any,
        routeConfig: RouteConfig,
        navigationInstruction: NavigationInstruction
    ) {}

    onSubmit(event: Event) {
        this.productService
            .createProduct({
                name: this._name,
                description: this._description,
                productTypeId: this._productTypeId,
                priceId: this._priceId,
                image: this._image,
            })
            .then((response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    this.router.navigateToRoute("products-index", {});
                }
            });

        event.preventDefault();
    }
}
