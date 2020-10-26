import { autoinject } from "aurelia-framework";
import { BaseService } from "./base-service";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { ICulture } from "domain/ICulture";

@autoinject
export class CultureService extends BaseService<ICulture> {
    constructor(protected httpClient: HttpClient) {
        super("Cultures", httpClient);
    }

    async getAll(): Promise<IFetchResponse<ICulture[]>> {
        try {
            const response = await this.httpClient.fetch(this.apiEndpointUrl, {
                cache: "no-store",
            });
            if (response.ok) {
                const data = (await response.json()) as ICulture[];
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
