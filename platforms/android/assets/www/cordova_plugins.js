cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.a42.cordova.googleplaygame/www/google-play-game.js",
        "id": "com.a42.cordova.googleplaygame.GooglePlayGame",
        "clobbers": [
            "googleplaygame"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.a42.cordova.googleplaygame": "2.0.4",
    "com.google.playservices": "21.0.0",
    "android.support.v4": "21.0.1"
}
// BOTTOM OF METADATA
});