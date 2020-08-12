
export const createObjID = function( keys ){
  let random = "";
  do {
    random = Math.random().toString(36).substring(2, 7);
  } while(random == "" || keys.indexOf(random) != -1);
  return random;
}

let sid = 0
export const createAutoID = function (keys) {
  sid++
  return sid
}