import { IndexResources } from '../../lang/IndexResources';
import { autoinject, LogManager } from 'aurelia-framework';
import { IShoppingCart } from '../../domain/IShoppingCart';
import { ShoppingCartService } from 'services/shoppingcart-service';
import { IState } from "../../state/state";
import { connectTo } from "aurelia-store";
import { AppState } from "../../state/app-state";
import { IProductInList } from "../../domain/IProductInList";
import { ProductInListService } from "../../services/productinlist-service";
import { OrderService } from "../../services/order-service";

export const log = LogManager.getLogger('app.HomeIndex');

@connectTo()
@autoinject
export class ShoppingCartsIndex {
    public state!: IState;

    private shoppingCart?: IShoppingCart;
    private products: IProductInList[] = [];

    private langResources = IndexResources;

    private userId = this.appState.userId;
    private scId?: string;
    private cartTotal = 0;

    constructor(private shoppingCartService: ShoppingCartService, private productInListService: ProductInListService,
                private orderService: OrderService, private appState: AppState) {

    }

    attached() {
        this.getInitialData();
    }

    getInitialData(): void {
        this.shoppingCartService.getShoppingCartByAppId(this.userId).then(
            response => {
                if (response.data) {
                    this.shoppingCart = response.data;
                    this.scId = response.data.id;

                    this.shoppingCartService.getProductsForShoppingCart(this.scId!, this.state.selectedCulture.code).then(
                        response => {
                            if (response.data) {
                                this.products = response.data;
                                this.products.forEach(a => this.cartTotal += a.totalCost);
                            }
                        }
                    );
                }
            }
        );
    }

    async reloadShoppingCart() {
        await this.shoppingCartService.getProductsForShoppingCart(this.scId!, this.state.selectedCulture.code).then(
            response => {
                if (response.data) {
                    this.products = response.data;
                    this.cartTotal = 0;
                    this.products.forEach(a => this.cartTotal += a.totalCost)
                }
            }
        );
    }

    async removeFromShoppingCart(connectionId: string) {
        let removed = await this.productInListService.removeFromShoppingCart(connectionId)
        await this.reloadShoppingCart();
    }

    placeOrder(): void {
        let placedOrder = this.orderService.placeOrder({ shoppingCartId: this.scId!, appUserId: this.userId! });
    }

    async increaseQuantity(productId: string) {
        let added = await this.productInListService.addProductToShoppingCart({
            productId: productId!,
            shoppingCartId: this.scId!,
            quantity: 1,
            totalCost: 0
        });
        await this.reloadShoppingCart();
    }

    async decreaseQuantity(product: IProductInList) {
        let removed = await this.productInListService.decreaseProductQuantity({
            id: product.id,
            productId: product.productId,
            shoppingCartId: this.scId!,
            quantity: product.quantity--,
            totalCost: product.totalCost
        });
        await this.reloadShoppingCart();
    }


}
