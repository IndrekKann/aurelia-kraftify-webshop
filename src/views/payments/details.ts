import { IndexResources } from "../../lang/IndexResources";
import { autoinject, LogManager } from "aurelia-framework";
import { ShoppingCartService } from "services/shoppingcart-service";
import { IState } from "../../state/state";
import { connectTo } from "aurelia-store";
import { AppState } from "../../state/app-state";
import { IProductInList } from "../../domain/IProductInList";
import { ProductInListService } from "../../services/productinlist-service";
import { OrderService } from "../../services/order-service";
import { PaymentService } from "../../services/payment-service";
import { NavigationInstruction, RouteConfig } from "aurelia-router";
import { IPayment } from "../../domain/IPayment";

export const log = LogManager.getLogger("app.HomeIndex");

@connectTo()
@autoinject
export class PaymentsDetail {
    public state!: IState;
    payment?: IPayment;
    private products: IProductInList[] = [];
    private langResources = IndexResources;
    private cartTotal = 0;

    constructor(
        private shoppingCartService: ShoppingCartService,
        private productInListService: ProductInListService,
        private orderService: OrderService,
        private paymentService: PaymentService,
        private appState: AppState
    ) {}

    activate(
        params: any,
        routeConfig: RouteConfig,
        navigationInstruction: NavigationInstruction
    ) {
        if (params.id && typeof params.id == "string") {
            this.paymentService.getPayment(params.id).then((response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    this.payment = response.data!;
                } else {
                    this.payment = undefined;
                }
            });
            this.orderService
                .getProductsForOrder(params.id, params.culture)
                .then((response) => {
                    if (response.data) {
                        this.products = response.data;
                        this.products.forEach(
                            (a) => (this.cartTotal += a.totalCost)
                        );
                    }
                });
        }
    }

    attached() {}
}
