const crypto = require("crypto");

function generateId()
{
    const bytes = crypto.getRandomBytes(8);
    const id = Array.from(bytes, byte => (byte % 36).toString(36)).join('');
    return id;
}

function generateUserId()
{
    return "usr_" + generateId();
}

function generateSessionId()
{
    return "sess_" + generateId();
}

module.exports = {generateUserId, generateSessionId};