import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { IProductType } from "../domain/IProductType";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";

@autoinject
export class ProductTypeService extends BaseService<IProductType> {
    constructor(protected httpClient: HttpClient) {
        super("ProductTypes", httpClient);
    }

    async getAllProductTypes(
        cultureCode: string
    ): Promise<IFetchResponse<IProductType[]>> {
        try {
            const response = await this.httpClient.fetch(
                this.apiEndpointUrl + "?culture=" + cultureCode,
                {
                    cache: "no-store",
                }
            );
            if (response.ok) {
                const data = (await response.json()) as IProductType[];
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
