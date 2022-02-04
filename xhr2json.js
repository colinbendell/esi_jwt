/**
 * XHR2JSON - stores an JSON API response in a variable. (Default variable name is 'jsonData')
 * @param name - the variable name to use. Defaults to 'jsonData'
 * @param url - the url of the API to call. Can be relative or absolute. If absolute we depend on xhr.js to use a magic relay
 * @param alt - the fallback url to use if the API call isn't available. This is useful if want to ensure that at some value is set
 *
 * To call this utility in your application use an `<esi:eval src="'/xhr2json.html?url=/myapi.json'">`
 * or in js2esi syntax: `eval(src="/xhr2json.html?url=/myapi.json");`
 *
 * For example, if you normally would use `fetch` to set a variable `data` and call your function `myfunction` with code something like:
 * ```
 * fetch("/myapi.json")
 *   .then(resp => resp.json())
 *   .then(data => { myfunction(data) }
 * ```
 *
 * You can accomplish the same with:
 * ```
 * eval("/xhr2json.html?url=/myapi.json&name=data");
 * myfunction(data);
 * ```
 *
 * == How it works
 * This script is a relay to xhr.js which does the first bit of heavy lifting to make the http request and store it in a
 * valid ESI variable. The flow is:
 * 1) Call xhr.js to retrieve the 3rd (or 1st) party url and store it in a variable called `jsonVal`
 * 2) Convert all `"` characters to "'" in the variable `jsonVal`
 * 3) generate ESI that will force re-coersion of the variable into a dictionary and make it available to the calling tool
 *
 * This is a little bit of an ESI hack. We are using ESI to generate ESI and as such require a total of 4 esi:include from
 * the quota. both xhr2json.js and xhr.js use the same technique whereby we require the output to be esi-processes
 * which is the equivelant to dca='esi->esi' (remember that ghost will by default be applying esi on one layer, so we only
 * need to add one more esi processing to the chain and change the default from `dca='None'` to `dca='esi'`
 *
 * We must use an esi:eval to call out to xhr.js because we need the variable value to be avaailble in this namespace
 */

let name = QUERY_STRING['name'] || 'jsonData';
let url = QUERY_STRING['url'] || '/default.json';
let alt = QUERY_STRING['alt'] || '/default.json';
//TODO: the `jsonVal` should be randomly generated at compile time to avoid collissions
let xhrUrl = 'http://' + HTTP_HOST + 'xhr.html?name=jsonVal&url=' + url_encode(url) + '&alt=' + url_encode(alt);

printraw('<esi:text><esi:assign name="</esi:text><esi:vars>$(name)</esi:vars><esi:text>"></esi:text>');
eval(src=xhrUrl, dca="esi", onError="continue");
printv(replace(jsonVal, '"', "'"));
printraw("<esi:text></esi:assign></esi:text>");