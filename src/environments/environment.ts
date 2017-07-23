// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBJsTnYKiu2mdLnwkSidQjw3THCty5sEm4',
    authDomain: 'buildingappswithangularf-ebcb5.firebaseapp.com',
    databaseURL: 'https://buildingappswithangularf-ebcb5.firebaseio.com',
    projectId: 'buildingappswithangularf-ebcb5',
    storageBucket: 'buildingappswithangularf-ebcb5.appspot.com',
    messagingSenderId: '957445559070'
  },
  fakeFirebaseConfig: {
    apiKey: 'xxx',
    authDomain: 'xxx',
    databaseURL: 'https://xx.firebaseio.com',
    projectId: 'xxx'
  }
};
