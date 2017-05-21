# Dependencies

Before you allow any external package to your app, always perform a simple analysis
that will reveal more or less how big is this package.

Many times a packages is very lightweight and consists only few lines of code,
but nested dependencies can cause an hindering extra weight to your bundle.

## Discovering packages size

### Method 1 - use tools

There is a great tool called `Cost of my module`

Used like so:  
https://cost-of-modules.herokuapp.com/?p=trixion@1.0.0

### Method 2 - github.com

when you examine a package its always a good thing to visit the github
repository page.
Nowadays most libraries include [UMD](https://github.com/umdjs/umd) formatted version of the lib.
this is infact a one-file bundle of the lib and can usually be found under one of these folders:
 - `dist/`
 - `build/`
 - `static/dist`
 
 previewing a file through github will show the file size.
 Don't forget to take minification into account.
 
### Method 3 - unpkg.com

 [unpkg](https://unpkg.com/) its a great tool and can easily be used
 to retrieve some information about npm packages.
 
 to check the size of a package go to unpkg.com/package_name
 for example: `https://unpkg.com/trixion`
 
 this will automatically redirect you browser to the latest version of the package
 and will point the file under `main` in `package.json`

 opening the browser's developer tools->network will show the downloaded file size (gzip) and content size.

  if you see any `require` at the top of the file, it might be a good sign
  that the package doesn't have a one-file bundle
   

### Method 4 - babel

abel supports command line bundling which can provide fast results

to bundle all js files in `src/` folder to one file one can use this command:

    babel -o bundle.js src/
    
minifiying with uglify command-line tool:
    
    cat bundle.js | uglify > bundle.min.js

gzip cli (Supported in certain hosts)
  
    cat bundle.min.js | gzip > bundle.min.js.gz
    

### Method 5 - analyze your bundle

generate a production bundle profile JSON using this command

    NODE_ENV=production webpack -p --profile --json > stats.jso

use this demo site to analyze your bundle.

[https://alexkuz.github.io/webpack-chart](https://alexkuz.github.io/webpack-chart/)

*note - size seen in the chart may be inaccurate due to minification not
being taken into account.
