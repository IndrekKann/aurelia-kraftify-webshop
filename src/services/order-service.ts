import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { IOrder } from "../domain/IOrder";
import { IOrderCreate } from "../domain/IOrderCreate";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { AppState } from "../state/app-state";
import { IProductInList } from "../domain/IProductInList";

@autoinject
export class OrderService extends BaseService<IOrder> {
    constructor(protected httpClient: HttpClient, private appState: AppState) {
        super("Orders", httpClient);
    }

    async placeOrder(order: IOrderCreate): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.post(
                this.appState.baseUrl + "Orders",
                JSON.stringify(order),
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

    async getProductsForOrder(
        id: string,
        cultureCode: string
    ): Promise<IFetchResponse<IProductInList[]>> {
        try {
            const response = await this.httpClient.fetch(
                this.apiEndpointUrl + "/" + id + "?culture=" + cultureCode,
                {
                    cache: "no-store",
                }
            );
            if (response.ok) {
                const data = (await response.json()) as IProductInList[];
                console.log(data);
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
