## Inpar Meeting SPFx - Intro

Esta solução tem como objetivo exemplificar os conceitos exibidos no Inpar Meeting 2017

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp serve
gulp package-solution --ship
