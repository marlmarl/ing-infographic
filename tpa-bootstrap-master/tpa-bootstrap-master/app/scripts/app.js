/*
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  // app.apiBase = '/tpa-bootstrap/api';
  app.apiPath = "/api/";
  app.apiBaseUrl = [app.apiBase, app.apiPath].join('');

  app.services = {
    "dashboard": app.apiBaseUrl + "dashboard",
    "bootstrap": app.apiBaseUrl + "bootstrap"
  };

  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    app.baseUrl = '/tpa-bootstrap/';
  }

  app.menuItems = [
    {
      route:"home",
      title: "Home",
      icon:"tpa:home"
    },
    {
      route:"users",
      title: "Users",
      icon:"tpa:users"
    },
    {
      route:"contact",
      title: "Contact",
      icon:"tpa:email"
    },
    {
      route:"settings",
      title: "Settings",
      icon:"tpa:settings"
    }
  ];


  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  app.displayUpdatedToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#cache-updated').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  window.addEventListener('open-menu',function(){
    app.$.paperDrawerPanel.togglePanel();
  });
  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  addEventListener("iron-deselect", function(e){
    if(e.target.id === "mainPages") {
      app.menuItemSelected(e.target);
    }
  });

  app.menuItemSelected = function(selectedItem){
      // Determine if the route will match anything in iron-pages
      var matchingSection = selectedItem.items.find(function(f){ return f.attributes["data-route"].value == app.data.pageName });
      if(app.data.pageName.length > 0 && !matchingSection){
        app.$.toast.text = 'Can\'t find: ' + window.location.href  + '. Redirected you to Home Page';
        app.$.toast.show();
      }
      app.$.paperDrawerPanel.closeDrawer();
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };

  app.isSelected = function(selected, actual) {
    return selected === actual;
  };

})(document);
