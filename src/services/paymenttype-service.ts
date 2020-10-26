import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { IPaymentType } from "../domain/IPaymentType";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";

@autoinject
export class PaymentTypeService extends BaseService<IPaymentType> {
    constructor(protected httpClient: HttpClient) {
        super("PaymentTypes", httpClient);
    }

    async getAllPaymentTypes(): Promise<IFetchResponse<IPaymentType[]>> {
        try {
            const response = await this.httpClient.fetch(this.apiEndpointUrl, {
                cache: "no-store",
            });
            if (response.ok) {
                const data = (await response.json()) as IPaymentType[];
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
