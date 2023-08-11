# Caching
Caching in general is used to store some kind of data for faster retrieval of data and this also reduces the time of getting the data from the source itself. This improves the performance and also the user experience. We will discuss some of the common methods along with a custom solution.

# Methods

One of the major and predefined methods that we can use is Cache Busting or in simple terms, we can call it versioning of files and metadata. What happened is when your version is updated, the browser will cache the new version of files.
Versioning can be the simple naming convention, URL, or path versioning to make it look different to the browser so that it can use new version files. The major advantage of this is, we don't need to rely on cache expiration as changes are reflected as soon as the version is updated.

You can see in the dist folder when we create a new build files names change.

![image](https://github.com/amankushwaha0606/cache-methods/assets/63187338/2d91da46-28a0-4f90-a536-559986137861)

Another method can be a Web worker and Service worker. They can cache data and update them accordingly but they didn’t work properly for data that is changing frequently like POST requests. We can handle those with our custom logic. Configurations for the same can be seen in /cache-methods/ngsw-config.json and can be changed.

In the screenshot, you can see files are retrieved from ngsq-worker. Time is in some milliseconds.

![image](https://github.com/amankushwaha0606/cache-methods/assets/63187338/2db63df2-5118-4b4f-bbbb-d4f6a4f05ffe)

# Custom method

To see this in detail, see the docs, https://docs.google.com/document/d/1UAMwRsTfjOzQt1t-NcHtUj0ZuO5CBrlLeUCxlsTlVv0/edit.

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1602.0
@angular-devkit/build-angular   16.2.0
@angular-devkit/core            16.2.0
@angular-devkit/schematics      16.1.8
@angular/cli                    16.1.8
@schematics/angular             16.1.8
rxjs                            7.8.1
typescript                      5.1.6
zone.js                         0.13.1



Angular CLI: 16.1.8
Node: 18.14.0
Package Manager: npm 9.3.1
OS: linux x64

Angular: 16.2.0
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
... service-worker
