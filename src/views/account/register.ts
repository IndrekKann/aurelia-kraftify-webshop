import { IndexResources } from "../../lang/IndexResources";
import { Router } from "aurelia-router";
import { AppState } from "../../state/app-state";
import { autoinject } from "aurelia-framework";
import { AccountsService } from "services/accounts-service";

@autoinject
export class AccountRegister {
    private langResources = IndexResources;

    private _email: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _phone: string = "";
    private _password: string = "";
    private _confirmPassword: string = "";
    private _errorMessage: string | null = null;

    constructor(
        private accountsService: AccountsService,
        private appState: AppState,
        private router: Router
    ) {}

    onSubmit(event: Event) {
        event.preventDefault();

        if (this._password != this._confirmPassword) {
            this._errorMessage = "Passwords do no match!";
        } else {
            this.accountsService
                .register(
                    this._firstName,
                    this._lastName,
                    this._email,
                    this._phone,
                    this._password
                )
                .then((response) => {
                    if (response.statusCode == 200) {
                        this.appState.jwt = response.data!.token;
                        this.router!.navigateToRoute("home");
                    } else {
                        this._errorMessage =
                            response.statusCode.toString() +
                            " " +
                            response.errorMessage!;
                    }
                });
        }
    }
}
