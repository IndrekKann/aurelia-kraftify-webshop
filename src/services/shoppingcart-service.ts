import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { IShoppingCart } from "../domain/IShoppingCart";
import { IProductInList } from "../domain/IProductInList";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";

@autoinject
export class ShoppingCartService extends BaseService<IShoppingCart> {
    constructor(protected httpClient: HttpClient) {
        super("ProductInLists", httpClient);
    }

    async getShoppingCartByAppId(
        userId: string | undefined
    ): Promise<IFetchResponse<IShoppingCart>> {
        try {
            const response = await this.httpClient.fetch(
                "shoppingcart/" + userId,
                {
                    cache: "no-store",
                }
            );
            if (response.ok) {
                const data = (await response.json()) as IShoppingCart;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async getProductsForShoppingCart(
        scId: string | undefined,
        cultureCode: string
    ): Promise<IFetchResponse<IProductInList[]>> {
        try {
            const response = await this.httpClient.fetch(
                this.apiEndpointUrl + "/" + scId + "?culture=" + cultureCode,
                {
                    cache: "no-store",
                }
            );
            if (response.ok) {
                const data = (await response.json()) as IProductInList[];
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
