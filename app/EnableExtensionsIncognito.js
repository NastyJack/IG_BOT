const puppeteer = require("puppeteer");
const Email = require("../helpers/Email");


let enableExtension = {
    start: async function () {
        try {

            await puppeteer.launch({
                args: [
                    "--load-extension=" + __dirname.replace("app","")+"/extensions/Inssist/",
                    "--disable-extensions-except=" +
                    __dirname.replace("app","")+"/extensions/Inssist/",
                   ],
                headless: true,
                executablePath: "/usr/bin/chromium-browser",
              });
            
console.log("Preparing pupetteer");
const extensionsPage = await browser.newPage();
console.log("Enabling extension");
await extensionsPage.goto( 'chrome://extensions/' );

// https://github.com/GoogleChrome/puppeteer/issues/858
// https://github.com/GoogleChrome/puppeteer/issues/4171
const extensionCount = await extensionsPage.evaluate( `
    document
        .querySelector( 'extensions-manager' )
        .shadowRoot
        .querySelector( 'extensions-item-list' )
        .shadowRoot
        .querySelectorAll( 'extensions-item' )
        .length
` );
// if ( extensionCount !== 2 ) {
//     throw new Error( 'Could not find extensions on extensions page!' );
// }

console.log("extensionCount=",extensionCount);

for ( let i = 0; i < extensionCount; i++ ) {
    const detailsButton = await extensionsPage.evaluateHandle( `
        document
            .querySelector( 'extensions-manager' )
            .shadowRoot
            .querySelector( 'extensions-item-list' )
            .shadowRoot
            .querySelectorAll( 'extensions-item' )[ ${ i } ]
            .shadowRoot
            .querySelector( 'paper-button#detailsButton' )
    ` );
    await detailsButton.click();
    await new Promise( resolve => setTimeout( resolve, 1000 ) );
    const incognitoToggle = await extensionsPage.evaluateHandle( `
        document
            .querySelector( 'extensions-manager' )
            .shadowRoot
            .querySelector( 'extensions-detail-view' )
            .shadowRoot
            .querySelector( 'extensions-toggle-row#allow-incognito' )
            .shadowRoot
            .querySelector( '#crToggle' )
    ` );
    
    await extensionsPage.screenshot({
    path: screenshotPath,
  });
  Email.Mail(e, "performSetup");
    await incognitoToggle.click();
    await new Promise( resolve => setTimeout( resolve, 1000 ) );
    const closeDetailsButton = await extensionsPage.evaluateHandle( `
        document
            .querySelector( 'extensions-manager' )
            .shadowRoot
            .querySelector( 'extensions-detail-view' )
            .shadowRoot
            .querySelector( '#closeButton' )
    ` );
    await closeDetailsButton.click();
    await new Promise( resolve => setTimeout( resolve, 1000 ) );
    console.log("enabled Extension no.",i)
}


await extensionsPage.close();
        }catch(e){
            console.log("Caught error at enableExtension",e)
            await extensionsPage.screenshot({
                path: screenshotPath,
              });
              Email.Mail(e, "performSetup");
        }
    }
}


module.exports = { enableExtension };