
export const createID = function( keys ){
    let random = "";
    do{
        random = Math.random().toString( 36 ).substring( 2, 7 );
    }while( random == "" || keys.indexOf( random ) != -1 );
    return random;
}
