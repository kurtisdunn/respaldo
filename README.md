# Resplado

Proposed FrontEnd for 5GN Customer Integrated API. 

## Install

```sh
npm install
```

## Building

```js
webpack
```

Or if you're developing:

```js
npm run dev

```

And to serve the index, you can use something like [`serve`](https://npmjs.com/package/serve) to serve the `dist`:

```bash
serve dist
```

## Developing

Some conventions...

## Remote API

Current API is tied to Veeam VAC V2. 

The status of the remote API is still under development. 

### Structure

All development files should go under `src`. The base structure is:

```
- src/
-- components/ # Re-usable components not specific to this project.
--- app/index.js Main JavaScript file imported by index.html.
-- img/        # Image resources.
-- scss/       # Global styles not specific to any components.
-- utils/        # Misc scripts.
-- views/      # Pages used by the router.
-- partials/   # Re-usable components specific to this project.
-- index.html  # Main SPA view.
```

The `src/app/index.js` is the main file that the entire build is based off of.

#### Importing SCSS

Component-specific assets should be co-located with the component code. For example:

```
- src/
-- components/
--- button/
---- index.js
---- index.scss
---- img.png
```

Where `src/components/button/index.js` imports `./index.scss` and `img.png` relative to its location. For example:

```js
import './img.png';
import './index.scss';
```

#### Importing HTML

The main HTML file is imported in the main JavaScript. This is because the tracer will automatically insert that file into the stream and the stream will know where to put it in `dist`.

#### Importing All JavaScript

The main JavaScript file is responsible for importing all files necessary to be built in the distrubution. It should only be necessary to import the first level of dependencies as the files that it imports are responsible for their own dependencies.

#### Importing Assets

If you need assets for a particular component, then you can import those in the component that needs them. The files will only ever be included once. For example, the `<bs-icon>` component imports the Glyphicons that it needs:

```js
import 'bootstrap/fonts/glyphicons-halflings-regular.eot';
...
```

These are inserted into the stream and moved to `dist/fonts` because that's where Bootstrap looks for them by default. If you import other assets, then they'll be inserted into dist relative to `process.cwd()`.

### Building

The only command you should need during development is `npm run build-watch`. This will:

1. Clean the `dist` folder.
2. Run `npm run build`.
3. Watch source files and re-run `npm run build` if any files in `src` change.
4. Start a webserver, enable live-reload, serve `dist` and open it in your browser.

### Remember

1. If you pull changes, you might need to `rm -rf node_modules && npm install`.

## API

All components are located in `src/components`. All docs for those components are listed below.

#### Validation

To add validation, there's 2 steps:

- Specify which validators you want to validate with.
- Pass the composed value into the Input so it can use it for validation.

```js
import React from 'react';
import Form from '../components/form';
import Input from '../components/input';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('MyForm extends React.Component: ', props);
    this.callback = this.callback.bind(this);
  }
  render(){
    return (
      <div className="login">
        <Form method={ FormAction } >
          <Input title={'Username'} name={'username'} validator={'required'} />
          <Input title={'Password'} name={'password'} type={'password'} validator={'required'} />
          <Button class={'btn-primary btn-lg float-right'} value={'Send'} type={'submit'} />
        </Form>
      </div>
    );
  }
```



#### Static Content URL
Static files are served from Azure Blob. //Proposed

```
https://cdn.5gn.com.au  //Proposed
```
