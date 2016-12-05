const appKey = 'kid_BykT85ZQx';
const appSecret = 'ca246b15f1a648e19f05adffcefc0401';
let auth = new Authentication(appKey, appSecret);
let requester = new Requester(`https://baas.kinvey.com/appdata/${appKey}`)
let model = new MovieModel(requester, auth);