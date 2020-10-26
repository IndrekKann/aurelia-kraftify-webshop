import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { IPayment } from "../domain/IPayment";
import { IPaymentCreate } from "../domain/IPaymentCreate";
import { AppState } from "../state/app-state";

@autoinject
export class PaymentService extends BaseService<IPayment> {
    constructor(protected httpClient: HttpClient, private appState: AppState) {
        super("Payments", httpClient);
    }

    async getAllPayments(): Promise<IFetchResponse<IPayment[]>> {
        try {
            const response = await this.httpClient.fetch(this.apiEndpointUrl, {
                cache: "no-store",
                headers: {
                    authorization: "Bearer " + this.appState.jwt,
                },
            });
            if (response.ok) {
                const data = (await response.json()) as IPayment[];
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

    async getPayment(id: string): Promise<IFetchResponse<IPayment>> {
        try {
            const response = await this.httpClient.fetch(
                this.apiEndpointUrl + "/" + id,
                {
                    cache: "no-store",
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as IPayment;
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

    async makePayment(
        paymentCreate: IPaymentCreate
    ): Promise<IFetchResponse<string>> {
        try {
            const response = await this.httpClient.post(
                this.appState.baseUrl + "Payments",
                JSON.stringify(paymentCreate),
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
}
