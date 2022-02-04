/**
 * XHR - stores the response from a third party in a variable. (Default variable name is 'data')
 * @param name - the variable name to use. Defaults to 'data'
 * @param url - the url of the API to call. Can be relative or absolute. If absolute we depend on a magic relay defined in ghost (`/api/fetch?url=`)
 * @param alt - the fallback url to use if the primary url isn't avaialble. This is useful if want to ensure that at some value is set
 *
 * To call this utility in your application use an `<esi:eval src="'/xhr.html?url=/myapi.json'">`
 * or in js2esi syntax: `eval(src="/xhr.html?url=/myapi.json");`
 *
 * For example, if you normally would use `fetch` to set a variable `data` and call your function `myfunction` with code something like:
 * ```
 * fetch("/myapi.json")
 *   .then(resp => resp.text())
 *   .then(data => { myfunction(data) }
 * ```
 *
 * You can accomplish the same with:
 * ```
 * eval("/xhr.html?url=/myapi.txt&name=data", dca="esi");
 * myfunction(data);
 * ```
 *
 * NB: you will need to specify dca="esi" when calling to ensure that the double esi chain happens and ensure that
 * your variable is set with the value you expect.
 *
 * == How it works
 * This script uses a relay defined in ghost metdata to request 3rd parties. Otherwise it will make the call directly.
 * The flow of the request is:
 * 1) generate ESI decorators for esi:assign
 * 2) include the destination resource
 * 3) when esi->esi the calling esi will have a variable with the value of the source
 *
 * This is a little bit of an ESI hack. We are using ESI to generate ESI and as such require a total of 2 esi:includes from
 * the quota. We do depend on the dca="esi->esi" chaining but since ghost will by default be applying esi on one layer, we only
 * need to add one more esi processing
 */

let name = QUERY_STRING['name'] || 'data';
let srcUrl = QUERY_STRING['url'] || '/default.json';
let altUrl = QUERY_STRING['alt'] || '/default.json';

if (srcUrl.startsWith('http')) {
    srcUrl =  '/api/fetch?url=' + url_encode(replace(srcUrl, '//', '/'));
}
printraw("<esi:text><esi:assign name=\"</esi:text><esi:vars>$(name)</esi:vars><esi:text>\">'</esi:text>");
include(src=url, alt=altUrl, dca="none", onError="continue");
printraw("<esi:text>'</esi:assign></esi:text>");