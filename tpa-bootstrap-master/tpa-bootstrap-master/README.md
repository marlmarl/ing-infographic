[![Build Status](https://travis-ci.org/ING-Group/tpa-bootstrap.svg?branch=master)](https://travis-ci.org/ING-Group/tpa-bootstrap)

![](http://www.ing.com/static/ingdotcompresentation/static/img/logos/logo.hd.png)
## ING TPA Bootstrap with Polymer Starter Kit

> A starting point for building ING web applications with Polymer 1.0 and TPA components

TPA Bootstrap is a clone from [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit/tree/v1.3.0)

### Included out of the box:

* [Material Design](http://www.google.com/design/spec/material-design/introduction.html) using ING Style & Theme
* Routing with [app-route](https://github.com/PolymerElements/app-route)
* Unit testing with [Web Component Tester](https://github.com/Polymer/web-component-tester) with code coverage with [Istanbul](https://github.com/thedeeno/web-component-tester-istanbul)
* Offline setup through [Platinum](https://elements.polymer-project.org/browse?package=platinum-elements) Service Worker elements
* Lazy Loading via [Polymer CLI](https://github.com/Polymer/polymer-cli) build task
* End-to-end Build Tooling (including CSP Compliance with [Crisper](https://github.com/PolymerLabs/crisper))
* API Blueprint hosting via [Drakov](https://github.com/Aconex/drakov/) and [Proxy Middleware](https://github.com/chimurai/http-proxy-middleware/) to work with [Browsersync](https://www.npmjs.com/package/browser-sync)


### Demo

[Application](http://www.tpabootstrap.net/#/home) with mock endpoints

### Tutorials

#### Polymer
If you have not used Polymer before, you can find a variety of tutorials online as long as they are with Polymer 1.x

* [Polymer Project](https://www.polymer-project.org/1.0/start/index) - Building an element
* [Pluralsight](https://www.pluralsight.com/courses/building-web-application-polymer-material-design) - Web Applications using Polymer and Material Design
* [LevelUpTuts](https://www.youtube.com/playlist?list=PLLnpHn493BHGhoGAb2PRKzv4Zw3QoatK-) - Polymer 1.0 tutorials
* [Google Developers](https://www.youtube.com/playlist?list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN) - Polycasts with Rob Dodson


#### Polymer Starter Kit

As the bootstrap application shares it's core with the Polymer Starter Kit, you can check out their tutorials on [polymer-project.org](https://www.polymer-project.org).

* [Set up the PSK](https://www.polymer-project.org/1.0/docs/start/psk/set-up.html)
* [Create a page](https://www.polymer-project.org/1.0/docs/start/psk/create-a-page.html)


## Getting Started

You need to:

1. Get a copy of the code
2. Install the dependencies
3. Modify the application to your liking
4. Deploy your code to production.

### Get the code

You can either

* `git clone https://github.com/ING-Group/tpa-bootstrap.git` into a directory you want to work
* [Download](https://github.com/ING-Group/tpa-bootstrap/) and extract the code where you want to work.

:warning: **Important**: Contains dotfiles (files starting with a `.`). If you're copying the contents of the Bootstrap to a new location make sure you bring along these dotfiles as well! On Mac, [enable showing hidden files](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/), then try extracting/copying Bootstrap again. This time the dotfiles needed should be visible so you can copy them over without issues.


### Install dependencies

#### Quick-start (for experienced users)

With Node.js installed, run the following one liner from the root of your download:

```sh
npm install -g gulp bower web-component-tester web-component-tester-istanbul polymer-cli 
npm install && bower install
```

#### Prerequisites (for everyone)

The full starter kit requires the following major dependencies:

* Node.js : Used to run JavaScript applications and tooling from the command line.
* npm : node package manager, which is used to install development dependencies via packages.
* bower : a Node.js-based package manager used to install front-end packages (like Polymer).
* gulp : a Node.js-based task runner used primarily for building and hosting the application

**To install dependencies:**

1)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 4.x.x.

2)  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

3)  Install `gulp` and `bower` globally.

```sh
npm install -g gulp bower
```

This lets you run `gulp` and `bower` from the command line.

4)  Install the bootstrap's local `npm` and `bower` dependencies.

```sh
cd tpa-bootstrap && npm install && bower install
```

5)  To build the application, there is a dependency on the [polymer-cli](https://github.com/Polymer/polymer-cli) tool.

```sh
npm install -g polymer-cli
```

This is the finall step required to build and serve apps.

#### Troubleshooting

To see a list of globally installed dependencies

```sh
npm list -g --depth=0
```

### Adding a business page/component

A business component is one that composes of elements from within the [tpa-retail-banking-elements](https://github.com/ing-group/tpa-retail-banking-elements) catalog

These components will have their own page and navigation within the bootstrap.

#### Setup

1) Install the dependencies using bower

```sh
bower install --save-dev tpa-new-element
```

This will update the `bower.json` file with something like the following

```json
    "tpa-new-element": "ING-Group/tpa-new-element",
```

You can explicity set which version/branch of the component, see [bower documentation](http://bower.io/#getting-started)

2) Add a new composable element to `app/tpa-pages` to act as a host

`app/tpa-pages/tpa-new-page.html`
```html
<link rel="import" href="../../bower_components/polymer/polymer.html">
<link rel="import" href="../../bower_components/paper-material/paper-material.html">
<link rel="import" href="../../bower_components/tpa-new-element/tpa-new-element.html">

<dom-module id="tpa-new-page">
    <template>      
      <tpa-new-element></tpa-new-element>
    </template>
    <script>
        Polymer({
            is: "tpa-new-page"
        })
    </script>
</dom-module>

```

3) Register the new page for lazy-loading with service works in `app/polymer.json`

```json
"elements/tpa-pages/tpa-new-page.html"
```

As part of the build process, the polymer-cli will build each element individually. This allows lazy loading of pages within the application to improve the user experience via loading times.

4) Register the new page for navigation with app-route in the `app/index.html`

```html
<section data-route="new">
    <template is="dom-if" if="{{isSelected(data.pageName, 'new')}}">
        <link rel="import" href="elements/tpa-pages/tpa-new-page.html">
        <tpa-new-page></tpa-new-page>
    </template>
</section>
```

5) Implement navigation using a link

```html
<a href="/#/new" class="link">New Page</a>
```

Alternatively, you can add to the navigation bar.

There is API with under the following address `/api/bootstrap` that can be extended to include the new page

An API Blueprint file exists within the [tpa-nav-bar](https://github.com/ING-Group/tpa-nav-bar) demonstrating the convention required


6) Register for any static content. By default only the vulcanized content from the pages will by copied. Any non-vulcanized content will need to be manually copied.

Below is the gulp file content within the `gulp copy` task. Add your content within the `{..}`

```js
var bower = gulp.src([
  'app/bower_components/{webcomponentsjs,platinum-sw,sw-toolbox,promise-polyfill,tpa-font,tpa-feedback}/**/*'
]).pipe(gulp.dest(dist('bower_components')));
```


### Development workflow

#### Serve / watch

```sh
gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

#### Run tests

```sh
gulp test:local
```

This runs the unit tests defined in the `app/test` directory through [web-component-tester](https://github.com/Polymer/web-component-tester).

To run tests Java 7 or higher is required. To update Java go to http://www.oracle.com/technetwork/java/javase/downloads/index.html and download ***JDK*** and install it.

#### Build & Vulcanize

```sh
gulp
```

Build and optimize the current project, ready for deployment. This includes vulcanization, crisper, image, script, stylesheet and HTML optimization and minification.

## Application Theming & Styling

Polymer 1.0 introduces a shim for CSS custom properties. We take advantage of this in [app-theme.html](https://github.com/ING-Group/tpa-styles). 
You can also find our presets for Material Design breakpoints in this file.

[Read more](https://www.polymer-project.org/1.0/docs/devguide/styling.html) about CSS custom properties.

### Styling
1. ***app-theme.html*** - to provide theming for your application. You can also find our presets for Material Design breakpoints in this file.
2. ***shared-styles.html*** - to share styles between elements and index.html.
3. ***element styles only*** - styles specific to element. These styles should be inside the `<style></style>` inside `template`.

  ```HTML
  <dom-module id="my-list">
    <template>
      <style>
        :host {
          display: block;
          background-color: yellow;
        }
      </style>
      <ul>
        <template is="dom-repeat" items="{{items}}">
          <li><span class="paper-font-body1">{{item}}</span></li>
        </template>
      </ul>
    </template>
  </dom-module>
  ```

These style files are located in the [styles folder](app/styles/).

## Unit Testing

Web apps built with Polymer Starter Kit come configured with support for [Web Component Tester](https://github.com/Polymer/web-component-tester) - Polymer's preferred tool for authoring and running unit tests. This makes testing your element based applications a pleasant experience.

[Read more](https://github.com/Polymer/web-component-tester#html-suites) about using Web Component tester.

Code Coverage is provided by [Istanbul](https://github.com/thedeeno/web-component-tester-istanbul)

## Dependency Management

Polymer uses [Bower](http://bower.io) for package management. This makes it easy to keep your elements up to date and versioned. For tooling, we use npm to manage Node.js-based dependencies.

Components installed by Bower live in the `app/bower_components` directory. This location is specified by the `.bowerrc` file. Many projects which follow Yeoman conventions place the `bower_components` directory outside of the `app` directory and then mount it using a server. This causes problems for tools like [Vulcanize](https://github.com/polymer/vulcanize) and [web-component-shards](https://github.com/PolymerLabs/web-component-shards) which rely on relative paths. We've chosen to simplify things and have `bower_components` live inside of `app` to resolve these issues.

## Deploy

### Github Pages

TPA has enabled Github Pages. 

Visit the site here : https://ING-Group.github.io/tpa-bootstrap/

You can perform a manual deployment from the command line by running `gulp build-deploy-gh-pages`, although this is not recommended unless for debugging purposes.

[See more details](/docs/deploy-to-github-pages.md/)

### API Endpoint

There is an API endpoint setting inside Travis CI, GH_PAGES_API, that gets pushed in upon build. This allows us to easily change the endpoints for testing purposes.

## Service Worker

TPA Bootstrap has enabled the  offline experience thanks to Service Worker and the [Platinum Service Worker elements](https://github.com/PolymerElements/platinum-sw). New to Service Worker? Read the following [introduction](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) to understand how it works.

#### Filing bugs in the right place

If you experience an issue with Service Worker support in your application, check the origin of the issue and use the appropriate issue tracker:

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/issues)
* [platinum-sw](https://github.com/PolymerElements/platinum-sw/issues)
* [platinum-push-notifications-manager](https://github.com/PolymerElements/platinum-push-messaging)
* For all other issues, feel free to file them [here](https://github.com/ING-Group/tpa-bootstrap/issues).

#### I get an error message about "Only secure origins are allowed"

Service Workers are only available to "secure origins" (HTTPS sites, basically) in line with a policy to prefer secure origins for powerful new features. However http://localhost is also considered a secure origin, so if you can, developing on localhost is an easy way to avoid this error. For production, your site will need to support HTTPS.

#### How do I debug Service Worker?

If you need to debug the event listener wire-up use `chrome://serviceworker-internals`.

#### What are those buttons on chrome://serviceworker-internals?

This page shows your registered workers and provides some basic operations.

* Unregister: Unregisters the worker.
* Start: Starts the worker. This would happen automatically when you navigate to a page in the worker's scope.
* Stop: Stops the worker.
* Sync: Dispatches a 'sync' event to the worker. If you don't handle this event, nothing will happen.
* Push: Dispatches a 'push' event to the worker. If you don't handle this event, nothing will happen.
* Inspect: Opens the worker in the Inspector.

#### Development flow

In order to guarantee that the latest version of your Service Worker script is being used, follow these instructions:

* After you made changes to your service worker script, close all but one of the tabs pointing to your web application
* Hit shift-reload to bypass the service worker as to ensure that the remaining tab isn't under the control of a service worker
* Hit reload to let the newer version of the Service Worker control the page.

If you find anything to still be stale, you can also try navigating to `chrome:serviceworker-internals` (in Chrome), finding the relevant Service Worker entry for your application and clicking 'Unregister' before refreshing your app. This will (of course) only clear it from the local development machine. If you have already deployed to production then further work will be necessary to remove it from your users' machines.

#### Disable Service Worker support after you enabled it

If for any reason you need to disable Service Worker support after previously enabling it, you can remove it from your Polymer Starter Kit project using these 4 steps:

1. Remove references to the platinum-sw elements from your application [index](https://github.com/ING-Group/tpa-bootstrap/blob/master/app/index.html).
2. Remove the two Platinum Service Worker elements (platinum-sw/..) in [app/elements/elements.html](https://github.com/ING-Group/tpa-bootstrap/blob/master/app/elements/elements.html)
3. Remove 'precache' from the list in the 'default' gulp task ([gulpfile.js](https://github.com/ING-Group/tpa-bootstrap/blob/master/gulpfile.js))
4. Navigate to `chrome://serviceworker-internals` and unregister any Service Workers registered by Polymer Starter Kit for your app just in case there's a copy of it cached.

## Add to home screen banner

If you've enabled Service Worker support, your app becomes eligible to trigger a Chrome [web app install banner](https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/) if you add a `start_url` property to `manifest.json`, and point it to a valid URL. The best practice here is to add a query parameter to that URL, in order to distinguish between the app being launched from the web vs. the homescreen. Simply add this to `manifest.json` and you'll be all set:

    "start_url": "/?homescreen=1"

If you are implementing an offline experience using Service Worker, make sure to cache `/?homescreen=1`. For a short explanation, you can refer to [this segment](https://youtu.be/g7f1Az5fxgU?t=1435) from Rob Dodson's talk Building Progressive Web Apps with Polymer. A more in-depth exploration can be found at [Service Workers in Production](https://developers.google.com/web/showcase/case-study/service-workers-iowa#watch-out-for-extra-query-parameters).

## Yeoman support

[generator-tpa](https://github.com/ING-Group/generator-tpa/) is the bespoke implementation of [generator-polymer](https://github.com/yeoman/generator-polymer/releases) for generating new components for TPA. 

## Frequently Asked Questions

### Where do I customise my application theme?

Theming can be achieved using [CSS Custom properties](https://www.polymer-project.org/1.0/docs/devguide/styling.html#xscope-styling-details) via [app/styles/app-theme.html](https://github.com/ING-Group/tpa-bootstrap/blob/master/app/styles/app-theme.html).

A [Polycast](https://www.youtube.com/watch?v=omASiF85JzI) is also available that walks through theming using Polymer 1.0.

### Where do I configure routes in my application?

This can be done via [`app/index.html`](https://github.com/ING-Group/tpa-styles/blob/master/index.html). We use app-route element for routing and new routes
can be defined in this import. See [app-route](https://github.com/PolymerElements/app-route) for further information

[app-location](https://github.com/PolymerElements/app-route/blob/master/app-location.html) is also used to synchronise between the state of the application and the browser bar.  

### Why are we using app-route rather than Page.js

The [app-route](https://github.com/PolymerElements/app-route) is more in line with the web component strategy than Page.js

### Something has failed during installation. How do I fix this?

Our most commonly reported issue is around system permissions for installing Node.js dependencies.
We recommend following the [fixing npm permissions](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)
guide to address any messages around administrator permissions being required. If you use `sudo`
to work around these issues, this guide may also be useful for avoiding that.

If you run into an exception that mentions five optional dependencies failing (or an `EEXIST` error), you
may have run into an npm [bug](https://github.com/npm/npm/issues/6309). We recommend updating to npm 2.11.0+
to work around this. You can do this by opening a Command Prompt/terminal and running `npm install npm@2.11.0 -g`. If you are on Windows,
Node.js (and npm) may have been installed into `C:\Program Files\`. Updating npm by running `npm install npm@2.11.0 -g` will install npm
into `%AppData%\npm`, but your system will still use the npm version. You can avoid this by deleting your older npm from `C:\Program Files\nodejs`
as described [here](https://github.com/npm/npm/issues/6309#issuecomment-67549380).

If you get a browser console error indicating that an element you know you have installed is missing, try deleting the bower_components folder, then run `bower cache clean` followed by `bower install` to reinstall. This can be especially helpful when upgrading from a prior version.

If the issue is to do with a failure somewhere else, you might find that due to a network issue
a dependency failed to correctly install. We recommend running `npm cache clean` and deleting the `node_modules` directory followed by
`npm install` to see if this corrects the problem. If not, please check the [issue tracker](https://github.com/ING-Group/tpa-bootstrap/issues) in case
there is a workaround or fix already posted.

### I'm having trouble getting Polymer Build to fully build my project on Windows. Help?

There are known issues with Windows and the Polymer CLI when running `gulp serve:dist`

* https://github.com/Polymer/polymer-cli/issues/191
* https://github.com/Polymer/polymer-cli/pull/199

Worst case scenario, setup an Ubuntu VM for web development until the issues are resolved.

Also check for further [issues](https://github.com/Polymer/polymer-cli/issues?q=is%3Aopen+is%3Aissue)

### How do I add new JavaScript files so they're picked up by the build process?

At the bottom of `app/index.html`, you will find a build block that can be used to include additional
scripts for your app. Build blocks are just normal script tags that are wrapped in a HTML
comment that indicates where to concatenate and minify their final contents to.

Below, we've added in `script2.js` and `script3.js` to this block. The line
`<!-- build:js scripts/app.js -->` specifies that these scripts will be squashed into `scripts/app.js`
during a build.

```html
<!-- build:js scripts/app.js -->
<script src="scripts/app.js"></script>
<script src="scripts/script2.js"></script>
<script src="scripts/script3.js"></script>
<!-- endbuild-->
```

If you are not using the build-blocks, but still wish for additional files (e.g scripts or stylesheets) to be included in the final `dist` directory, you will need to either copy these files as part of the gulpfile.js build process (see the `copy` task for how to automate this) or manually copy the files.

## Licensing

Like other Google projects, Polymer Starter Kit includes Google license headers at the top of several of our source files. Google's open-source licensing requires that this header be kept in place (sorry!), however we acknowledge that you may need to add your own licensing to files you modify. This can be done by appending your own extensions to these headers.

TPA is using BSD-Clause-3 for their licensing (TODO: Confirm)

## Contributing

TPA Bootstrap and the Polymer Starter Kit is a new project and is an ongoing effort by the Web Component community. We welcome your bug reports, PRs for improvements, docs and anything you think would improve the experience for other Polymer developers.
