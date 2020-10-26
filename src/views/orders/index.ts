import { IndexResources } from "../../lang/IndexResources";
import { autoinject, LogManager } from "aurelia-framework";
import { IShoppingCart } from "../../domain/IShoppingCart";
import { ShoppingCartService } from "services/shoppingcart-service";
import { IState } from "../../state/state";
import { connectTo } from "aurelia-store";
import { AppState } from "../../state/app-state";
import { IProductInList } from "../../domain/IProductInList";
import { PaymentTypeService } from "../../services/paymenttype-service";
import { DestinationService } from "../../services/destination-service";
import { IPaymentType } from "../../domain/IPaymentType";
import { IDestination } from "../../domain/IDestination";
import { OrderService } from "../../services/order-service";
import { PaymentService } from "../../services/payment-service";

export const log = LogManager.getLogger("app.HomeIndex");

@connectTo()
@autoinject
export class OrdersIndex {
    public state!: IState;

    private langResources = IndexResources;

    _paymentTypes: IPaymentType[] = [];
    _destinations: IDestination[] = [];

    _paymentTypeId = "";
    _destinationId = "";

    private products: IProductInList[] = [];
    private userId = this.appState.userId;
    private scId?: string;
    private cartTotal = 0;

    constructor(
        private paymentTypeService: PaymentTypeService,
        private destinationService: DestinationService,
        private shoppingCartService: ShoppingCartService,
        private orderService: OrderService,
        private paymentService: PaymentService,
        private appState: AppState
    ) {}

    attached() {
        this.paymentTypeService.getAllPaymentTypes().then((response) => {
            if (response.data) {
                this._paymentTypes = response.data;
            }
        });

        this.destinationService.getAllDestinations().then((response) => {
            if (response.data) {
                this._destinations = response.data;
            }
        });
        this.shoppingCartService
            .getShoppingCartByAppId(this.userId)
            .then((response) => {
                if (response.data) {
                    this.scId = response.data.id;

                    this.shoppingCartService
                        .getProductsForShoppingCart(
                            this.scId,
                            this.state.selectedCulture.code
                        )
                        .then((response) => {
                            if (response.data) {
                                this.products = response.data;
                                this.products.forEach(
                                    (a) => (this.cartTotal += a.totalCost)
                                );
                            }
                        });
                }
            });
    }

    onSubmit(event: Event) {
        let payment = this.paymentService.makePayment({
            appUserId: this.userId!,
            paymentTypeId: this._paymentTypeId,
            destinationId: this._destinationId,
            shoppingCartId: this.scId!,
        });

        event.preventDefault();
    }
}
