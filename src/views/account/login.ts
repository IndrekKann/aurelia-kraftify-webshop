import { IndexResources } from "../../lang/IndexResources";
import { Router } from "aurelia-router";
import { AppState } from "../../state/app-state";
import { autoinject } from "aurelia-framework";
import { AccountsService } from "services/accounts-service";

@autoinject
export class AccountLogin {
    private langResources = IndexResources;

    private _email: string = "";
    private _password: string = "";
    private _errorMessage: string | null = null;

    constructor(
        private accountsService: AccountsService,
        private appState: AppState,
        private router: Router
    ) {}

    onSubmit(event: Event) {
        event.preventDefault();

        this.accountsService
            .login(this._email, this._password)
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
