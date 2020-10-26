import { autoinject } from "aurelia-framework";
import { AppState } from "state/app-state";
import { HttpClient } from "aurelia-fetch-client";
import { IFetchResponse } from "types/IFetchResponse";
import { ILoginResponse } from "domain/ILoginResponse";

@autoinject
export class AccountsService {
    constructor(private appState: AppState, private httpClient: HttpClient) {
        this.httpClient.baseUrl = this.appState.baseUrl;
    }

    async login(
        email: string,
        password: string
    ): Promise<IFetchResponse<ILoginResponse>> {
        try {
            const response = await this.httpClient.post(
                "account/login",
                JSON.stringify({
                    email: email,
                    password: password,
                }),
                {
                    cache: "no-store",
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as ILoginResponse;
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

    async register(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        password: string
    ): Promise<IFetchResponse<ILoginResponse>> {
        try {
            const response = await this.httpClient.post(
                "account/register",
                JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    password: password,
                }),
                {
                    cache: "no-store",
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const data = (await response.json()) as ILoginResponse;
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
