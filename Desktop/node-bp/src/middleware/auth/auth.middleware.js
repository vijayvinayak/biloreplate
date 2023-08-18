const axios = require('axios');
const getPem = require('rsa-pem-from-mod-exp');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const { authOptions } = require('../../../config/conf');
const { UnauthorizedError } = require('../../errors');

/**
 * @param {string} kid
 * @param {string} modulus
 * @param {string} exponent
 * @description Convert public key.
 * @returns {{kid: string, publicKey: string}}
 */
function convertPublicKey(kid, modulus, exponent) {
  return {
    kid,
    publicKey: getPem(modulus, exponent),
  };
}

/**
 * @param {Object} payload
 * @param {string} [payload.email]
 * @param {string} [payload.given_name]
 * @param {string} [payload.family_name]
 * @description Get user data from token payload.
 * @return {{ email: string, first_name: string, last_name: string, name: string }}
 */
function getUserData(payload) {
  const data = {
    email: payload.email,
    first_name: payload.given_name,
    last_name: payload.family_name,
  };

  Object.keys(payload).forEach((key) => {
    const keyName = key.toLowerCase();

    if (keyName.includes('email') && !data.email) {
      data.email = payload[key];
    } else if (keyName.includes('first') && !data.first_name) {
      data.first_name = payload[key];
    } else if (keyName.includes('last') && !data.last_name) {
      data.last_name = payload[key];
    }
  });

  if (!data.email) {
    throw new UnauthorizedError('Missing email parameter.');
  }

  data.name = `${data.first_name} ${data.last_name}`;
  data.email = data.email.toLowerCase();

  return data;
}

/**
 * @description Fetch public keys, find corresponding key for the token with kid.
 */
async function fetchKeys() {
  const { publicKeyUri } = authOptions;

  const response = await axios.get(publicKeyUri);
  // eslint-disable-next-line prefer-const
  let { keys, primary, secondary } = response && response.data;

  if (!keys && primary && secondary) {
    keys = [primary, secondary];
  }

  if (!keys || !keys.length) {
    throw new Error('Public keys were not found.');
  }

  return keys.map((elem) => convertPublicKey(elem.kid, elem.n, elem.e).publicKey);
}

/**
 * @param {string} accessToken
 * @param {string} idToken
 * @description Decode token with public keys.
 */
async function decodeToken(accessToken, idToken) {
  const publicKeys = await fetchKeys();
  let parsedToken = false;

  await Promise.map(publicKeys, async (publicKey, index) => {
    // token was verified successfully, no need to verify with other public keys
    if (parsedToken) {
      return;
    }

    try {
      await verifyToken(accessToken, publicKey);
      parsedToken = true;
    } catch (error) {
      // token verification failed for all keys
      if (index === publicKeys.length - 1 && !parsedToken) {
        throw new UnauthorizedError(`Verification failed: ${error.message}`);
      }
    }
  });
  // now for testing idToken is the same token (access token)
  return jwt.decode(idToken, { complete: true });
}

/**
 * @param {string} token
 * @param {string} publicKey
 * @description Verify token with public key.
 */
async function verifyToken(token, publicKey) {
  const { algorithms, issuer } = authOptions;

  return new Promise((resolve, reject) => {
    return jwt.verify(token, publicKey, { algorithms, issuer }, (error, decoded) => {
      if (error) {
        return reject(error);
      }

      return resolve(decoded);
    });
  });
}

/**
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @description Validate authorization token from headers, if auth is enabled.
 */
async function authorize(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError('Missing Authorization header.');
    }

    const segments = authorization.split(' ');

    if (!segments.length || segments[0] !== 'Bearer') {
      throw new UnauthorizedError('Invalid format of Authorization header.');
    }

    const accessToken = segments[1];

    if (segments[1] && !segments[2]) {
      segments.push(accessToken);
    }

    const decodedToken = await decodeToken(segments[1], segments[2]);
    const tokenExpTime = decodedToken.payload ? decodedToken.payload.exp : 0;
    const now = Date.now() / 1000;

    if (tokenExpTime < now) {
      throw new UnauthorizedError('Token is not valid.');
    }

    const userData = getUserData(decodedToken.payload);

    req.user = userData;
    return next();
  } catch (error) {
    return next(new UnauthorizedError(error.message));
  }
}

function skipExcludedUrls(middleware, excludedUrls) {
  return (req, res, next) => {
    if (excludedUrls.includes(req.originalUrl)) {
      return next();
    }
    return middleware(req, res, next);
  };
}

module.exports = { authorize, skipExcludedUrls };
