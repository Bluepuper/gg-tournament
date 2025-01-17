// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { provideApolloClient } from './graphql.config';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//     provideApolloClient(),
//   ],
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    Apollo, // Add Apollo provider here
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        console.log('Configuring Apollo client...');
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
};
