import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { AppState } from "state/app-state";
import { IFetchResponse } from "types/IFetchResponse";
import { IPrice } from "domain/IPrice";
import { BaseService } from "./base-service";

@autoinject
export class PriceService extends BaseService<IPrice> {
    constructor(protected httpClient: HttpClient, private appState: AppState) {
        super("Prices", httpClient);
    }

    async getPrices(): Promise<IFetchResponse<IPrice[]>> {
        try {
            const response = await this.httpClient.fetch(this.apiEndpointUrl, {
                cache: "no-store",
                headers: {
                    authorization: "Bearer " + this.appState.jwt,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as IPrice[];
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
