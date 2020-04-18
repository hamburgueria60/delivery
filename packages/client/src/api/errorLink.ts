import * as Sentry from '@sentry/browser'
import { ExecutionResult, Observable } from 'apollo-link'
import { ErrorResponse, onError } from 'apollo-link-error'
import { head, map } from 'lodash'

import { X_TRANSACTION_ID } from './constants'
import RequestError from './RequestError'

const getCustomError = (error: ErrorResponse): RequestError => {
  const { operation, networkError } = error
  const context = operation.getContext()
  const id = context.headers[X_TRANSACTION_ID]
  const errors = error.graphQLErrors
  const message = head(errors)?.extensions?.code

  return new RequestError({
    id,
    name: 'RequestError',
    message: message || 'Internal error',
    operationName: operation.operationName,
    cause: [networkError?.stack?.split('\n', 1), ...map(errors, ({ message }): string => message)]
      .filter(Boolean)
      .join('\n'),
  })
}

const trackException = (error: RequestError): void => {
  Sentry.configureScope((scope): void => {
    const metadata = [
      { label: 'R_OP_ID', value: error.id },
      { label: 'R_OP_NAME', value: error.operationName },
      { label: 'R_OP_CAUSE', value: error.cause },
    ]

    metadata.forEach((tuple): void => {
      scope.setTag(tuple.label, tuple.value)
      scope.setExtra(tuple.label, tuple.value)
    })

    Sentry.captureException(error)
  })
}

const errorLink = onError(
  (error: ErrorResponse): Observable<ExecutionResult> => {
    return new Observable((observer): void => {
      const { response } = error.operation.getContext()

      if (response.status === 401) {
        window.location.href = '/login'
        return
      }

      const customError = getCustomError(error)
      trackException(customError)
      observer.error(customError)
    })
  },
)

export default errorLink
