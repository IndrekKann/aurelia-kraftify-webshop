import { IndexResources } from "../../lang/IndexResources";
import { IProduct } from "domain/IProduct";
import { IProductType } from "domain/IProductType";
import { ProductService } from "services/product-service";
import { ProductTypeService } from "services/producttype-service";
import { PLATFORM } from "aurelia-pal";
import { autoinject, LogManager, View, observable } from "aurelia-framework";
import { Store, connectTo } from "aurelia-store";
import { IState } from "state/state";

export const log = LogManager.getLogger("app.HomeIndex");

@connectTo()
@autoinject
export class ProductsDetail {
    public state!: IState;

    product?: IProduct;
    productTypes: IProductType[] = [];

    private langResources = IndexResources;

    constructor(
        private productService: ProductService,
        private productTypeService: ProductTypeService
    ) {}

    activate(params: any) {
        if (params.id && typeof params.id == "string") {
            this.productService
                .getProduct(params.id + "?culture=" + params.culture)
                .then((response) => {
                    if (
                        response.statusCode >= 200 &&
                        response.statusCode < 300
                    ) {
                        this.product = response.data!;
                    } else {
                        this.product = undefined;
                    }
                });
        }
    }

    attached() {}
}
