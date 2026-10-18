import {createRemoteJWKSet, jwtVerify} from 'jose';

// Cloudflare Access lets a request to the admin through only after the person has signed in, and
// adds a signed token to it. Checking that token here as well means the admin API stays closed
// even if the Access rule is ever changed or the site is reached another way (e.g. *.workers.dev)

let keys = null;
let keysTeamDomain = null;

const isLocalhost = (request) => ['localhost', '127.0.0.1'].includes(new URL(request.url).hostname);

// Returns {email} of the signed-in person, or null when the request is not signed in
export const verifyAccess = async (request, env) => {
    // Only for `wrangler dev` on this computer, where there is no Access in front of the Worker
    if (env.ACCESS_DISABLED_FOR_LOCAL_DEV === 'true' && isLocalhost(request)) {
        return {email: 'local-dev'};
    }

    const token = request.headers.get('cf-access-jwt-assertion');
    if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
        return null;
    }

    const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
    if (keysTeamDomain !== issuer) {
        keys = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
        keysTeamDomain = issuer;
    }

    try {
        const {payload} = await jwtVerify(token, keys, {issuer, audience: env.ACCESS_AUD});
        return {email: payload.email || 'unknown'};
    } catch {
        return null;
    }
};
