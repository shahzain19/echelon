/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as functions_adminAuth from "../functions/adminAuth.js";
import type * as functions_adminProducts from "../functions/adminProducts.js";
import type * as functions_createOrder from "../functions/createOrder.js";
import type * as functions_getOrders from "../functions/getOrders.js";
import type * as functions_getProducts from "../functions/getProducts.js";
import type * as functions_setupAdmin from "../functions/setupAdmin.js";
import type * as functions_trackOrder from "../functions/trackOrder.js";
import type * as functions_updateOrderStatus from "../functions/updateOrderStatus.js";
import type * as functions_uploadImage from "../functions/uploadImage.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "functions/adminAuth": typeof functions_adminAuth;
  "functions/adminProducts": typeof functions_adminProducts;
  "functions/createOrder": typeof functions_createOrder;
  "functions/getOrders": typeof functions_getOrders;
  "functions/getProducts": typeof functions_getProducts;
  "functions/setupAdmin": typeof functions_setupAdmin;
  "functions/trackOrder": typeof functions_trackOrder;
  "functions/updateOrderStatus": typeof functions_updateOrderStatus;
  "functions/uploadImage": typeof functions_uploadImage;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
