import * as JwtDecode from "jwt-decode";

export class AppState {
    public readonly baseUrl = "http://localhost:5000/api/v1.0/";

    get jwt(): string | null {
        return localStorage.getItem("jwt");
    }

    set jwt(value: string | null) {
        if (value) {
            localStorage.setItem("jwt", value);
        } else {
            localStorage.removeItem("jwt");
        }
    }

    get userId() {
        let value = localStorage.getItem("jwt");
        if (value != null) {
            const decoded = JwtDecode<Record<string, string>>(value);
            return decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
        }
    }

    get getUserRole() {
        let value = localStorage.getItem("jwt");
        if (value != null) {
            const decoded = JwtDecode<Record<string, string>>(value);
            return decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
        }
    }

    get userFirstName() {
        let value = localStorage.getItem("jwt");
        if (value != null) {
            const decoded = JwtDecode<Record<string, string>>(value);
            return decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
            ];
        }
    }
}
