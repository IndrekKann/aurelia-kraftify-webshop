import { autoinject } from "aurelia-framework";
import { AppState } from "state/app-state";
import { BaseService } from "./base-service";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { IProductInList } from "../domain/IProductInList";
import { IProductInListCreate } from "../domain/IProductInListCreate";

@autoinject
export class ProductInListService extends BaseService<IProductInList> {
    constructor(private appState: AppState, protected httpClient: HttpClient) {
        super("ProductInLists", httpClient);
    }

    async addProductToShoppingCart(
        connection: IProductInListCreate
    ): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.post(
                this.appState.baseUrl + "ProductInLists",
                JSON.stringify(connection),
                {
                    cache: "no-store",
                    headers: {
                        authorization: "Bearer " + this.appState.jwt,
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                console.log("response", response);
                return {
                    statusCode: response.status,
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

    async removeFromShoppingCart(
        connectionId: string
    ): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.delete(
                this.appState.baseUrl + "ProductInLists/" + connectionId,
                null,
                {
                    cache: "no-store",
                    headers: {
                        authorization: "Bearer " + this.appState.jwt,
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
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

    async decreaseProductQuantity(
        connection: IProductInList
    ): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.put(
                this.appState.baseUrl + "ProductInLists/" + connection.id,
                JSON.stringify(connection),
                {
                    cache: "no-store",
                    headers: {
                        authorization: "Bearer " + this.appState.jwt,
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
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
