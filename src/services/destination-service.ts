import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { IDestination } from "../domain/IDestination";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";

@autoinject
export class DestinationService extends BaseService<IDestination> {
    constructor(protected httpClient: HttpClient) {
        super("Destinations", httpClient);
    }

    async getAllDestinations(): Promise<IFetchResponse<IDestination[]>> {
        try {
            const response = await this.httpClient.fetch(this.apiEndpointUrl, {
                cache: "no-store",
            });
            if (response.ok) {
                const data = (await response.json()) as IDestination[];
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
