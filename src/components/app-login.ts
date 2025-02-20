import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-login')
export class AppLogin extends LitElement {
    @state() displayName: string = '';

    static styles = [
        css`
            :host {
                display: block;
            }

            fluent-button {
                animation: quickSlideFromLeft 0.3s;
                app-region: no-drag;
                height: 90%;
            }

            fluent-button::part(control) {
                background: #ffffff0f;
            }

            fluent-button img {
                margin-top: 6px;
                width: 24px;
                height: 24px;
            }

            fluent-button {
                font-size: 12px;
            }

            #block p {
                background: #ffffff0f;
                padding: 8px;
                border-radius: 8px;
                font-size: 12px;
                width: max-content;
            }
        `
    ];

    async firstUpdated() {
        setTimeout(async () => {
            const { getUserProfile } = await import('../services/auth/auth');
            const profile: any = await getUserProfile(localStorage.getItem('accessToken')!);
            console.log("profile info", profile)

            this.displayName = profile.displayName;
        }, 1000);
    }

    async doSignIn() {
        console.log('Sign in with Microsoft');

        const { signIn } = await import('../services/auth/auth');
        await signIn();

    }

    async doLogOut() {
        console.log('Log out');

        const { logOut } = await import('../services/auth/auth');
        await logOut();
    }

    render() {
        return html`
          <div id="block">
            ${this.displayName ? html`<fluent-button size="small" @click="${() => this.doLogOut()}">Logout</fluent-button>` : html`
            <fluent-button size="small" @click="${() => this.doSignIn()}"/>Connect to Microsoft 365</fluent-button>
            `
            }
    </div>
        `;
    }
}
