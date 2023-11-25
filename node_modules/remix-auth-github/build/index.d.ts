import type { StrategyVerifyCallback } from "remix-auth";
import { OAuth2Profile, OAuth2Strategy, OAuth2StrategyVerifyParams } from "remix-auth-oauth2";
export interface GitHubStrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: GitHubScope[] | string;
    allowSignup?: boolean;
    userAgent?: string;
    authorizationURL?: string;
    tokenURL?: string;
    userInfoURL?: string;
    userEmailsURL?: string;
}
/**
 * @see https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes
 */
export declare type GitHubScope = "repo" | "repo:status" | "repo_deployment" | "public_repo" | "repo:invite" | "security_events" | "admin:repo_hook" | "write:repo_hook" | "read:repo_hook" | "admin:org" | "write:org" | "read:org" | "admin:public_key" | "write:public_key" | "read:public_key" | "admin:org_hook" | "gist" | "notifications" | "user" | "read:user" | "user:email" | "user:follow" | "delete_repo" | "write:discussion" | "read:discussion" | "write:packages" | "read:packages" | "delete:packages" | "admin:gpg_key" | "write:gpg_key" | "read:gpg_key" | "codespace" | "workflow";
export declare type GitHubEmails = NonNullable<OAuth2Profile["emails"]>;
export declare type GitHubEmailsResponse = {
    email: string;
    verified: boolean;
    primary: boolean;
    visibility: string | null;
}[];
export interface GitHubProfile extends OAuth2Profile {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
        middleName: string;
    };
    emails: GitHubEmails;
    photos: [{
        value: string;
    }];
    _json: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        name: string;
        company: string;
        blog: string;
        location: string;
        email: string;
        hireable: boolean;
        bio: string;
        twitter_username: string;
        public_repos: number;
        public_gists: number;
        followers: number;
        following: number;
        created_at: string;
        updated_at: string;
        private_gists: number;
        total_private_repos: number;
        owned_private_repos: number;
        disk_usage: number;
        collaborators: number;
        two_factor_authentication: boolean;
        plan: {
            name: string;
            space: number;
            private_repos: number;
            collaborators: number;
        };
    };
}
export interface GitHubExtraParams extends Record<string, string | number | null> {
    tokenType: string;
    accessTokenExpiresIn: number | null;
    refreshTokenExpiresIn: number | null;
}
export declare const GitHubStrategyDefaultName = "github";
export declare const GitHubStrategyDefaultScope: GitHubScope;
export declare const GitHubStrategyScopeSeperator = " ";
export declare class GitHubStrategy<User> extends OAuth2Strategy<User, GitHubProfile, GitHubExtraParams> {
    name: string;
    private scope;
    private allowSignup;
    private userAgent;
    private userInfoURL;
    private userEmailsURL;
    constructor({ clientID, clientSecret, callbackURL, scope, allowSignup, userAgent, userInfoURL, userEmailsURL, authorizationURL, tokenURL, }: GitHubStrategyOptions, verify: StrategyVerifyCallback<User, OAuth2StrategyVerifyParams<GitHubProfile, GitHubExtraParams>>);
    private getScope;
    protected authorizationParams(): URLSearchParams;
    protected userEmails(accessToken: string): Promise<GitHubEmails>;
    protected userProfile(accessToken: string): Promise<GitHubProfile>;
    protected getAccessToken(response: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        extraParams: GitHubExtraParams;
    }>;
}
