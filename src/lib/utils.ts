function deepCompare( x, y ) : boolean {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    if ((x instanceof Array) && (y instanceof Array)) {
        if (x.length != y.length) return false;
        for (let i = 0; i < x.length; i++) {
            if (!deepCompare(x[i], y[i])) return false;
        }
        return true;
    }

    for ( let p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;

        if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

        if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if ( ! deepCompare( x[ p ],  y[ p ] ) ) return false;
        // Objects and Arrays must be tested recursively
    }
    return true;
}

function base64encode(buffer) : string {
    return buffer.toString('base64')
        .replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_') // Convert '/' to '_'
        .replace(/=+$/, ''); // Remove ending '='
}

function runSerial(tasks: Array<any>) : Promise<any> {
    let result: Promise<any> = Promise.resolve();
    tasks.forEach(task => {
        result = result.then(task);
    });
    return result;
}

export { deepCompare, base64encode, runSerial }