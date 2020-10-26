import { autoinject } from "aurelia-framework";
import { AppState } from "state/app-state";
import { BaseService } from "./base-service";
import { IProduct } from "../domain/IProduct";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { IProductCreate } from "../domain/IProductCreate";

@autoinject
export class ProductService extends BaseService<IProduct> {
    constructor(protected httpClient: HttpClient, private appState: AppState) {
        super("Products", httpClient);
    }

    async getAllProducts(
        search: string,
        searchType: string,
        order: string,
        limit: string,
        page: string,
        cultureCode: string
    ): Promise<IFetchResponse<IProduct[]>> {
        let url = this.apiEndpointUrl;
        url =
            url +
            "?search=" +
            search +
            "&searchType=" +
            searchType +
            "&order=" +
            order +
            "&limit=" +
            limit +
            "&page=" +
            page +
            "&culture=" +
            cultureCode;
        try {
            const response = await this.httpClient.fetch(url, {
                cache: "no-store",
            });
            if (response.ok) {
                const data = (await response.json()) as IProduct[];
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

    async getProduct(id: string): Promise<IFetchResponse<IProduct>> {
        try {
            const response = await this.httpClient.fetch(
                this.apiEndpointUrl + "/" + id,
                {
                    cache: "no-store",
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as IProduct;
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

    async createProduct(
        product: IProductCreate
    ): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.post(
                this.apiEndpointUrl,
                JSON.stringify(product),
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

    /*
    getPagesAmount(limit: number): number {
        return 1;
    }

*/
    getPagination(amount: number, limit: number): number[] {
        let pagesAmount = Math.ceil(amount / limit);
        let pagination = [];
        for (let i = 1; i <= pagesAmount; i++) {
            pagination.push(i);
        }
        return pagination;
    }
}
