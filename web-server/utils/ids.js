function generateId(prefix)
{
    let id;

    if(typeof crypto != "undefined" && crypto.getRandomValues)
    {
        const array = new Uint8Array(8);
        crypto.getRandomValues(array);

        id = Array.from(array, byte => (byte % 36).toString(36)).join('');
    }

    else
    {
        id = Math.random().toString(36).slice(2, 10);
    }

    return prefix + id;
}