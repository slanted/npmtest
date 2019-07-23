let ft = require("feature-toggles");
let toggles = {
    newFeature: false
}

ft.load(toggles);

console.log("In testlib1. changed. New dev change");
console.log("Final release. Going to 1.1.0");
console.log("1st dev change for prerelease 1.2.0-SNAPSHOT");
console.log("2nd dev change for prerelease 1.2.0-SNAPSHOT");
console.log("Final release. Going to 1.2.0");

if (ft.isFeatureEnabled('newFeature')) {
    console.log("1st dev change for 1.3.0-SNAPSHOT")
    console.log("2nd dev change for 1.3.0-SNAPSHOT")
    console.log("3rd dev change for 1.3.0-SNAPSHOT")
}