import { IndexResources } from "../../lang/IndexResources";
import { ProductService } from "services/product-service";
import { ProductInListService } from "services/productinlist-service";
import { ShoppingCartService } from "services/shoppingcart-service";
import { autoinject, LogManager } from "aurelia-framework";
import { connectTo } from "aurelia-store";
import { IState } from "state/state";
import { AppState } from "../../state/app-state";
import { PaymentService } from "../../services/payment-service";
import { IPayment } from "../../domain/IPayment";
import DateTimeFormat = Intl.DateTimeFormat;

export const log = LogManager.getLogger("app.HomeIndex");

@connectTo()
@autoinject
export class ProductsIndex {
    public state!: IState;
    payments: IPayment[] = [];

    private userId = this.appState.userId;

    private langResources = IndexResources;

    constructor(
        private productService: ProductService,
        private paymentsService: PaymentService,
        private productInListService: ProductInListService,
        private shoppingCartService: ShoppingCartService,
        private appState: AppState
    ) {}

    attached() {
        if (this.appState.jwt != null) {
            this.paymentsService.getAllPayments().then((response) => {
                if (response.data) {
                    this.payments = response.data;
                    this.payments.forEach(
                        (d) =>
                            (d.date =
                                d.date.substring(8, 10) +
                                "." +
                                d.date.substring(5, 7) +
                                "." +
                                d.date.substring(0, 4) +
                                " " +
                                d.date.substring(11, 19).toString())
                    );
                }
            });
        }
    }
}
