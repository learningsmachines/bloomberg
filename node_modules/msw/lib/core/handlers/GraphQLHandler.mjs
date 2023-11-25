var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import {
  RequestHandler
} from './RequestHandler.mjs';
import { getTimestamp } from '../utils/logging/getTimestamp.mjs';
import { getStatusCodeColor } from '../utils/logging/getStatusCodeColor.mjs';
import { serializeRequest } from '../utils/logging/serializeRequest.mjs';
import { serializeResponse } from '../utils/logging/serializeResponse.mjs';
import { matchRequestUrl } from '../utils/matching/matchRequestUrl.mjs';
import {
  parseGraphQLRequest,
  parseDocumentNode
} from '../utils/internal/parseGraphQLRequest.mjs';
import { getPublicUrlFromRequest } from '../utils/request/getPublicUrlFromRequest.mjs';
import { devUtils } from '../utils/internal/devUtils.mjs';
import { getAllRequestCookies } from '../utils/request/getRequestCookies.mjs';
function isDocumentNode(value) {
  if (value == null) {
    return false;
  }
  return typeof value === "object" && "kind" in value && "definitions" in value;
}
class GraphQLHandler extends RequestHandler {
  constructor(operationType, operationName, endpoint, resolver, options) {
    let resolvedOperationName = operationName;
    if (isDocumentNode(operationName)) {
      const parsedNode = parseDocumentNode(operationName);
      if (parsedNode.operationType !== operationType) {
        throw new Error(
          `Failed to create a GraphQL handler: provided a DocumentNode with a mismatched operation type (expected "${operationType}", but got "${parsedNode.operationType}").`
        );
      }
      if (!parsedNode.operationName) {
        throw new Error(
          `Failed to create a GraphQL handler: provided a DocumentNode with no operation name.`
        );
      }
      resolvedOperationName = parsedNode.operationName;
    }
    const header = operationType === "all" ? `${operationType} (origin: ${endpoint.toString()})` : `${operationType} ${resolvedOperationName} (origin: ${endpoint.toString()})`;
    super({
      info: {
        header,
        operationType,
        operationName: resolvedOperationName
      },
      resolver,
      options
    });
    this.endpoint = endpoint;
  }
  parse(args) {
    return __async(this, null, function* () {
      const parsedResult = yield parseGraphQLRequest(args.request).catch(
        (error) => {
          console.error(error);
          return void 0;
        }
      );
      if (typeof parsedResult === "undefined") {
        return void 0;
      }
      return {
        query: parsedResult.query,
        operationType: parsedResult.operationType,
        operationName: parsedResult.operationName,
        variables: parsedResult.variables
      };
    });
  }
  predicate(args) {
    if (!args.parsedResult) {
      return false;
    }
    if (!args.parsedResult.operationName && this.info.operationType !== "all") {
      const publicUrl = getPublicUrlFromRequest(args.request);
      devUtils.warn(`Failed to intercept a GraphQL request at "${args.request.method} ${publicUrl}": anonymous GraphQL operations are not supported.

Consider naming this operation or using "graphql.operation()" request handler to intercept GraphQL requests regardless of their operation name/type. Read more: https://mswjs.io/docs/api/graphql/#graphqloperationresolver`);
      return false;
    }
    const hasMatchingUrl = matchRequestUrl(
      new URL(args.request.url),
      this.endpoint
    );
    const hasMatchingOperationType = this.info.operationType === "all" || args.parsedResult.operationType === this.info.operationType;
    const hasMatchingOperationName = this.info.operationName instanceof RegExp ? this.info.operationName.test(args.parsedResult.operationName || "") : args.parsedResult.operationName === this.info.operationName;
    return hasMatchingUrl.matches && hasMatchingOperationType && hasMatchingOperationName;
  }
  extendResolverArgs(args) {
    var _a, _b, _c;
    const cookies = getAllRequestCookies(args.request);
    return {
      query: ((_a = args.parsedResult) == null ? void 0 : _a.query) || "",
      operationName: ((_b = args.parsedResult) == null ? void 0 : _b.operationName) || "",
      variables: ((_c = args.parsedResult) == null ? void 0 : _c.variables) || {},
      cookies
    };
  }
  log(args) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      const loggedRequest = yield serializeRequest(args.request);
      const loggedResponse = yield serializeResponse(args.response);
      const statusColor = getStatusCodeColor(loggedResponse.status);
      const requestInfo = ((_a = args.parsedResult) == null ? void 0 : _a.operationName) ? `${(_b = args.parsedResult) == null ? void 0 : _b.operationType} ${(_c = args.parsedResult) == null ? void 0 : _c.operationName}` : `anonymous ${(_d = args.parsedResult) == null ? void 0 : _d.operationType}`;
      console.groupCollapsed(
        devUtils.formatMessage(
          `${getTimestamp()} ${requestInfo} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`
        ),
        `color:${statusColor}`,
        "color:inherit"
      );
      console.log("Request:", loggedRequest);
      console.log("Handler:", this);
      console.log("Response:", loggedResponse);
      console.groupEnd();
    });
  }
}
export {
  GraphQLHandler,
  isDocumentNode
};
