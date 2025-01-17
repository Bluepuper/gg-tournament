import { HttpClient } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Provider } from '@angular/core';

export function provideApolloClient(): Provider[] {
  return [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpClient: HttpClient): ApolloClientOptions<any> => {
        const httpLink = new HttpLink(httpClient);
        return {
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpClient],
    },
  ];
}
