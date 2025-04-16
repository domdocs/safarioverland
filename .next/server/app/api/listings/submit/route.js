/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/listings/submit/route";
exports.ids = ["app/api/listings/submit/route"];
exports.modules = {

/***/ "(rsc)/./app/api/listings/submit/route.ts":
/*!******************************************!*\
  !*** ./app/api/listings/submit/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabase */ \"(rsc)/./lib/supabase.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs\");\n\n\n\nconst listingSchema = zod__WEBPACK_IMPORTED_MODULE_2__.z.object({\n    listing_name: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().min(2).max(100),\n    category: zod__WEBPACK_IMPORTED_MODULE_2__.z.string(),\n    region: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().min(1),\n    country: zod__WEBPACK_IMPORTED_MODULE_2__.z.string(),\n    location: zod__WEBPACK_IMPORTED_MODULE_2__.z.string(),\n    description: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().min(10).max(1000),\n    contact_name: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().min(2).max(100),\n    contact_email: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().email(),\n    contact_phone: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().optional(),\n    website: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().url().optional(),\n    price_info: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().optional(),\n    image_url: zod__WEBPACK_IMPORTED_MODULE_2__.z.string().url().optional(),\n    featured: zod__WEBPACK_IMPORTED_MODULE_2__.z.boolean().optional().default(false),\n    status: zod__WEBPACK_IMPORTED_MODULE_2__.z.enum([\n        \"pending\",\n        \"approved\",\n        \"rejected\"\n    ]).optional().default(\"pending\")\n});\nasync function POST(request) {\n    try {\n        const supabase = await (0,_lib_supabase__WEBPACK_IMPORTED_MODULE_0__.getSupabaseServerClient)();\n        if (!supabase) {\n            console.error(\"Database client initialization failed\");\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Database client initialization failed\"\n            }, {\n                status: 500\n            });\n        }\n        const rawData = await request.json();\n        console.log(\"Received data:\", rawData);\n        // Validate the incoming data\n        const validationResult = listingSchema.safeParse(rawData);\n        if (!validationResult.success) {\n            console.error(\"Validation failed:\", validationResult.error.errors);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Validation failed\",\n                details: validationResult.error.errors\n            }, {\n                status: 400\n            });\n        }\n        const now = new Date().toISOString();\n        const data = {\n            ...validationResult.data,\n            status: validationResult.data.status || 'pending',\n            created_at: now,\n            updated_at: now,\n            // Ensure optional fields are properly handled\n            price_info: validationResult.data.price_info || null,\n            website: validationResult.data.website || null,\n            contact_phone: validationResult.data.contact_phone || null,\n            image_url: validationResult.data.image_url || null,\n            featured: validationResult.data.featured || false\n        };\n        console.log(\"Attempting to insert data:\", data);\n        // Insert the new listing into the directory_listings table\n        const { data: listing, error } = await supabase.from(\"directory_listings\").insert([\n            data\n        ]).select().single();\n        if (error) {\n            console.error(\"Database error:\", error);\n            if (error.code === '23505') {\n                return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                    error: \"A listing with this name already exists\"\n                }, {\n                    status: 409\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Failed to create listing\",\n                details: error.message\n            }, {\n                status: 500\n            });\n        }\n        console.log(\"Successfully created listing:\", listing);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            message: \"Listing submitted successfully and pending review\",\n            listing\n        });\n    } catch (error) {\n        console.error(\"Error in POST /api/listings/submit:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal server error\",\n            details: error instanceof Error ? error.message : String(error)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQzNELE1BQU0sRUFBRUEsTUFBTUcsT0FBTyxFQUFFZixLQUFLLEVBQUUsR0FBRyxNQUFNRixTQUNwQ2tCLElBQUksQ0FBQyxzQkFDTEMsTUFBTSxDQUFDO1lBQUNMO1NBQUssRUFDYk0sTUFBTSxHQUNOQyxNQUFNO1FBRVQsSUFBSW5CLE9BQU87WUFDVEQsUUFBUUMsS0FBSyxDQUFDLG1CQUFtQkE7WUFDakMsSUFBSUEsTUFBTW9CLElBQUksS0FBSyxTQUFTO2dCQUMxQixPQUFPbkQscURBQVlBLENBQUNnQyxJQUFJLENBQ3RCO29CQUFFRCxPQUFPO2dCQUEwQyxHQUNuRDtvQkFBRU4sUUFBUTtnQkFBSTtZQUVsQjtZQUNBLE9BQU96QixxREFBWUEsQ0FBQ2dDLElBQUksQ0FDdEI7Z0JBQUVELE9BQU87Z0JBQTRCUSxTQUFTUixNQUFNcUIsT0FBTztZQUFDLEdBQzVEO2dCQUFFM0IsUUFBUTtZQUFJO1FBRWxCO1FBRUFLLFFBQVFJLEdBQUcsQ0FBQyxpQ0FBaUNZO1FBQzdDLE9BQU85QyxxREFBWUEsQ0FBQ2dDLElBQUksQ0FBQztZQUN2QkssU0FBUztZQUNUZSxTQUFTO1lBQ1ROO1FBQ0Y7SUFDRixFQUFFLE9BQU9mLE9BQU87UUFDZEQsUUFBUUMsS0FBSyxDQUFDLHVDQUF1Q0E7UUFDckQsT0FBTy9CLHFEQUFZQSxDQUFDZ0MsSUFBSSxDQUN0QjtZQUFFRCxPQUFPO1lBQXlCUSxTQUFTUixpQkFBaUJzQixRQUFRdEIsTUFBTXFCLE9BQU8sR0FBR0UsT0FBT3ZCO1FBQU8sR0FDbEc7WUFBRU4sUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kb21pbmljZG9oZXJ0eS9Qcm9qZWN0cy9zYWZhcmlvdmVybGFuZC9hcHAvYXBpL2xpc3RpbmdzL3N1Ym1pdC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTdXBhYmFzZVNlcnZlckNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZVwiXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIlxuXG5jb25zdCBsaXN0aW5nU2NoZW1hID0gei5vYmplY3Qoe1xuICBsaXN0aW5nX25hbWU6IHouc3RyaW5nKCkubWluKDIpLm1heCgxMDApLFxuICBjYXRlZ29yeTogei5zdHJpbmcoKSxcbiAgcmVnaW9uOiB6LnN0cmluZygpLm1pbigxKSxcbiAgY291bnRyeTogei5zdHJpbmcoKSxcbiAgbG9jYXRpb246IHouc3RyaW5nKCksXG4gIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm1pbigxMCkubWF4KDEwMDApLFxuICBjb250YWN0X25hbWU6IHouc3RyaW5nKCkubWluKDIpLm1heCgxMDApLFxuICBjb250YWN0X2VtYWlsOiB6LnN0cmluZygpLmVtYWlsKCksXG4gIGNvbnRhY3RfcGhvbmU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgd2Vic2l0ZTogei5zdHJpbmcoKS51cmwoKS5vcHRpb25hbCgpLFxuICBwcmljZV9pbmZvOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGltYWdlX3VybDogei5zdHJpbmcoKS51cmwoKS5vcHRpb25hbCgpLFxuICBmZWF0dXJlZDogei5ib29sZWFuKCkub3B0aW9uYWwoKS5kZWZhdWx0KGZhbHNlKSxcbiAgc3RhdHVzOiB6LmVudW0oW1wicGVuZGluZ1wiLCBcImFwcHJvdmVkXCIsIFwicmVqZWN0ZWRcIl0pLm9wdGlvbmFsKCkuZGVmYXVsdChcInBlbmRpbmdcIiksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBnZXRTdXBhYmFzZVNlcnZlckNsaWVudCgpXG5cbiAgICBpZiAoIXN1cGFiYXNlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uIGZhaWxlZFwiKVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkRhdGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBmYWlsZWRcIiB9LFxuICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCByYXdEYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIGRhdGE6XCIsIHJhd0RhdGEpXG5cbiAgICAvLyBWYWxpZGF0ZSB0aGUgaW5jb21pbmcgZGF0YVxuICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSBsaXN0aW5nU2NoZW1hLnNhZmVQYXJzZShyYXdEYXRhKVxuXG4gICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJWYWxpZGF0aW9uIGZhaWxlZDpcIiwgdmFsaWRhdGlvblJlc3VsdC5lcnJvci5lcnJvcnMpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgXG4gICAgICAgICAgZXJyb3I6IFwiVmFsaWRhdGlvbiBmYWlsZWRcIiwgXG4gICAgICAgICAgZGV0YWlsczogdmFsaWRhdGlvblJlc3VsdC5lcnJvci5lcnJvcnMgXG4gICAgICAgIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAuLi52YWxpZGF0aW9uUmVzdWx0LmRhdGEsXG4gICAgICBzdGF0dXM6IHZhbGlkYXRpb25SZXN1bHQuZGF0YS5zdGF0dXMgfHwgJ3BlbmRpbmcnLFxuICAgICAgY3JlYXRlZF9hdDogbm93LFxuICAgICAgdXBkYXRlZF9hdDogbm93LFxuICAgICAgLy8gRW5zdXJlIG9wdGlvbmFsIGZpZWxkcyBhcmUgcHJvcGVybHkgaGFuZGxlZFxuICAgICAgcHJpY2VfaW5mbzogdmFsaWRhdGlvblJlc3VsdC5kYXRhLnByaWNlX2luZm8gfHwgbnVsbCxcbiAgICAgIHdlYnNpdGU6IHZhbGlkYXRpb25SZXN1bHQuZGF0YS53ZWJzaXRlIHx8IG51bGwsXG4gICAgICBjb250YWN0X3Bob25lOiB2YWxpZGF0aW9uUmVzdWx0LmRhdGEuY29udGFjdF9waG9uZSB8fCBudWxsLFxuICAgICAgaW1hZ2VfdXJsOiB2YWxpZGF0aW9uUmVzdWx0LmRhdGEuaW1hZ2VfdXJsIHx8IG51bGwsXG4gICAgICBmZWF0dXJlZDogdmFsaWRhdGlvblJlc3VsdC5kYXRhLmZlYXR1cmVkIHx8IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJBdHRlbXB0aW5nIHRvIGluc2VydCBkYXRhOlwiLCBkYXRhKVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBuZXcgbGlzdGluZyBpbnRvIHRoZSBkaXJlY3RvcnlfbGlzdGluZ3MgdGFibGVcbiAgICBjb25zdCB7IGRhdGE6IGxpc3RpbmcsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJkaXJlY3RvcnlfbGlzdGluZ3NcIilcbiAgICAgIC5pbnNlcnQoW2RhdGFdKVxuICAgICAgLnNlbGVjdCgpXG4gICAgICAuc2luZ2xlKClcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkRhdGFiYXNlIGVycm9yOlwiLCBlcnJvcilcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7IC8vIFVuaXF1ZSBjb25zdHJhaW50IHZpb2xhdGlvblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBlcnJvcjogXCJBIGxpc3Rpbmcgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHNcIiB9LFxuICAgICAgICAgIHsgc3RhdHVzOiA0MDkgfVxuICAgICAgICApXG4gICAgICB9XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiRmFpbGVkIHRvIGNyZWF0ZSBsaXN0aW5nXCIsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgY3JlYXRlZCBsaXN0aW5nOlwiLCBsaXN0aW5nKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgc3VjY2VzczogdHJ1ZSwgXG4gICAgICBtZXNzYWdlOiBcIkxpc3Rpbmcgc3VibWl0dGVkIHN1Y2Nlc3NmdWxseSBhbmQgcGVuZGluZyByZXZpZXdcIixcbiAgICAgIGxpc3RpbmcgXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gUE9TVCAvYXBpL2xpc3RpbmdzL3N1Ym1pdDpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn0gIl0sIm5hbWVzIjpbImdldFN1cGFiYXNlU2VydmVyQ2xpZW50IiwiTmV4dFJlc3BvbnNlIiwieiIsImxpc3RpbmdTY2hlbWEiLCJvYmplY3QiLCJsaXN0aW5nX25hbWUiLCJzdHJpbmciLCJtaW4iLCJtYXgiLCJjYXRlZ29yeSIsInJlZ2lvbiIsImNvdW50cnkiLCJsb2NhdGlvbiIsImRlc2NyaXB0aW9uIiwiY29udGFjdF9uYW1lIiwiY29udGFjdF9lbWFpbCIsImVtYWlsIiwiY29udGFjdF9waG9uZSIsIm9wdGlvbmFsIiwid2Vic2l0ZSIsInVybCIsInByaWNlX2luZm8iLCJpbWFnZV91cmwiLCJmZWF0dXJlZCIsImJvb2xlYW4iLCJkZWZhdWx0Iiwic3RhdHVzIiwiZW51bSIsIlBPU1QiLCJyZXF1ZXN0Iiwic3VwYWJhc2UiLCJjb25zb2xlIiwiZXJyb3IiLCJqc29uIiwicmF3RGF0YSIsImxvZyIsInZhbGlkYXRpb25SZXN1bHQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZXJyb3JzIiwiZGV0YWlscyIsIm5vdyIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImRhdGEiLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsImxpc3RpbmciLCJmcm9tIiwiaW5zZXJ0Iiwic2VsZWN0Iiwic2luZ2xlIiwiY29kZSIsIm1lc3NhZ2UiLCJFcnJvciIsIlN0cmluZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/listings/submit/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseBrowserClient: () => (/* binding */ getSupabaseBrowserClient),\n/* harmony export */   getSupabaseServerClient: () => (/* binding */ getSupabaseServerClient),\n/* harmony export */   isSupabaseAvailable: () => (/* binding */ isSupabaseAvailable)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/.pnpm/@supabase+supabase-js@2.49.4/node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Global variable to store the browser client instance\nlet browserClient = null;\n// For client-side usage - implements proper singleton pattern\nfunction getSupabaseBrowserClient() {\n    // Only create a new client if one doesn't exist already\n    if (false) {}\n    return browserClient;\n}\n// For server-side usage\nfunction getSupabaseServerClient() {\n    // Don't store server client as a singleton since it's stateless\n    try {\n        const supabaseUrl = process.env.SUPABASE_URL || \"https://ufraczrwltunvdkgaeeb.supabase.co\";\n        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcmFjenJ3bHR1bnZka2dhZWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODcxNTMsImV4cCI6MjA2MDM2MzE1M30.Z1O1_Zh41AutBtrOmFWzUDTedR_CPeCSoi-UuL5c-Ds\";\n        if (!supabaseUrl || !supabaseServiceKey) {\n            console.warn(\"Supabase URL or Service Key is missing\");\n            return null;\n        }\n        // Create client without custom fetch options to avoid abort errors\n        return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseServiceKey, {\n            auth: {\n                persistSession: false,\n                autoRefreshToken: false\n            }\n        });\n    } catch (error) {\n        console.error(\"Error initializing Supabase server client:\", error);\n        return null;\n    }\n}\n// Helper function to check if Supabase is available\nasync function isSupabaseAvailable() {\n    try {\n        const supabase = getSupabaseServerClient();\n        if (!supabase) return false;\n        // Try a simple query with a manual timeout to check if Supabase is responding\n        const timeoutPromise = new Promise((_, reject)=>{\n            setTimeout(()=>reject(new Error(\"Supabase availability check timed out\")), 5000);\n        });\n        const queryPromise = supabase.from(\"directory_listings\").select(\"id\").limit(1).then(({ data, error })=>{\n            if (error) {\n                console.error(\"Supabase availability check failed:\", error);\n                return false;\n            }\n            return true;\n        }).catch((error)=>{\n            console.error(\"Error in Supabase availability check:\", error);\n            return false;\n        });\n        // Race between the query and the timeout\n        return Promise.race([\n            queryPromise,\n            timeoutPromise\n        ]);\n    } catch (error) {\n        console.error(\"Error checking Supabase availability:\", error);\n        return false;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFvRDtBQUVwRCx1REFBdUQ7QUFDdkQsSUFBSUMsZ0JBQXdEO0FBRTVELDhEQUE4RDtBQUN2RCxTQUFTQztJQUNkLHdEQUF3RDtJQUN4RCxJQUFJLEtBQStDRCxFQUFFLEVBcUJwRDtJQUNELE9BQU9BO0FBQ1Q7QUFFQSx3QkFBd0I7QUFDakIsU0FBU2M7SUFDZCxnRUFBZ0U7SUFDaEUsSUFBSTtRQUNGLE1BQU1aLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ1csWUFBWSxJQUFJWiwwQ0FBb0M7UUFDcEYsTUFBTWEscUJBQ0piLFFBQVFDLEdBQUcsQ0FBQ2EseUJBQXlCLElBQ3JDZCxRQUFRQyxHQUFHLENBQUNjLGlCQUFpQixJQUM3QmYsa05BQXlDO1FBRTNDLElBQUksQ0FBQ0QsZUFBZSxDQUFDYyxvQkFBb0I7WUFDdkNSLFFBQVFDLElBQUksQ0FBQztZQUNiLE9BQU87UUFDVDtRQUVBLG1FQUFtRTtRQUNuRSxPQUFPVixtRUFBWUEsQ0FBQ0csYUFBYWMsb0JBQW9CO1lBQ25ETixNQUFNO2dCQUNKQyxnQkFBZ0I7Z0JBQ2hCUSxrQkFBa0I7WUFDcEI7UUFDRjtJQUNGLEVBQUUsT0FBT04sT0FBTztRQUNkTCxRQUFRSyxLQUFLLENBQUMsOENBQThDQTtRQUM1RCxPQUFPO0lBQ1Q7QUFDRjtBQUVBLG9EQUFvRDtBQUM3QyxlQUFlTztJQUNwQixJQUFJO1FBQ0YsTUFBTUMsV0FBV1A7UUFDakIsSUFBSSxDQUFDTyxVQUFVLE9BQU87UUFFdEIsOEVBQThFO1FBQzlFLE1BQU1DLGlCQUFpQixJQUFJQyxRQUFpQixDQUFDQyxHQUFHQztZQUM5Q0MsV0FBVyxJQUFNRCxPQUFPLElBQUlFLE1BQU0sMkNBQTJDO1FBQy9FO1FBRUEsTUFBTUMsZUFBZVAsU0FDbEJRLElBQUksQ0FBQyxzQkFDTEMsTUFBTSxDQUFDLE1BQ1BDLEtBQUssQ0FBQyxHQUNOQyxJQUFJLENBQUMsQ0FBQyxFQUFFQyxJQUFJLEVBQUVwQixLQUFLLEVBQUU7WUFDcEIsSUFBSUEsT0FBTztnQkFDVEwsUUFBUUssS0FBSyxDQUFDLHVDQUF1Q0E7Z0JBQ3JELE9BQU87WUFDVDtZQUNBLE9BQU87UUFDVCxHQUNDcUIsS0FBSyxDQUFDLENBQUNyQjtZQUNOTCxRQUFRSyxLQUFLLENBQUMseUNBQXlDQTtZQUN2RCxPQUFPO1FBQ1Q7UUFFRix5Q0FBeUM7UUFDekMsT0FBT1UsUUFBUVksSUFBSSxDQUFDO1lBQUNQO1lBQWNOO1NBQWU7SUFDcEQsRUFBRSxPQUFPVCxPQUFPO1FBQ2RMLFFBQVFLLEtBQUssQ0FBQyx5Q0FBeUNBO1FBQ3ZELE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvZG9taW5pY2RvaGVydHkvUHJvamVjdHMvc2FmYXJpb3ZlcmxhbmQvbGliL3N1cGFiYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIlxuXG4vLyBHbG9iYWwgdmFyaWFibGUgdG8gc3RvcmUgdGhlIGJyb3dzZXIgY2xpZW50IGluc3RhbmNlXG5sZXQgYnJvd3NlckNsaWVudDogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlQ2xpZW50PiB8IG51bGwgPSBudWxsXG5cbi8vIEZvciBjbGllbnQtc2lkZSB1c2FnZSAtIGltcGxlbWVudHMgcHJvcGVyIHNpbmdsZXRvbiBwYXR0ZXJuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwYWJhc2VCcm93c2VyQ2xpZW50KCkge1xuICAvLyBPbmx5IGNyZWF0ZSBhIG5ldyBjbGllbnQgaWYgb25lIGRvZXNuJ3QgZXhpc3QgYWxyZWFkeVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhYnJvd3NlckNsaWVudCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTFxuICAgICAgY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVlcblxuICAgICAgaWYgKCFzdXBhYmFzZVVybCB8fCAhc3VwYWJhc2VBbm9uS2V5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlN1cGFiYXNlIFVSTCBvciBBbm9uIEtleSBpcyBtaXNzaW5nXCIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBhIHNpbmdsZSBjbGllbnQgaW5zdGFuY2UgZm9yIHRoZSBicm93c2VyXG4gICAgICBicm93c2VyQ2xpZW50ID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXksIHtcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHBlcnNpc3RTZXNzaW9uOiB0cnVlLFxuICAgICAgICAgIHN0b3JhZ2VLZXk6IFwic2FmYXJpLW92ZXJsYW5kLWF1dGhcIiwgLy8gVXNlIGEgY29uc2lzdGVudCBzdG9yYWdlIGtleVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBTdXBhYmFzZSBjbGllbnQ6XCIsIGVycm9yKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJyb3dzZXJDbGllbnRcbn1cblxuLy8gRm9yIHNlcnZlci1zaWRlIHVzYWdlXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwYWJhc2VTZXJ2ZXJDbGllbnQoKSB7XG4gIC8vIERvbid0IHN0b3JlIHNlcnZlciBjbGllbnQgYXMgYSBzaW5nbGV0b24gc2luY2UgaXQncyBzdGF0ZWxlc3NcbiAgdHJ5IHtcbiAgICBjb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCB8fCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkxcbiAgICBjb25zdCBzdXBhYmFzZVNlcnZpY2VLZXkgPVxuICAgICAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSB8fFxuICAgICAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVkgfHxcbiAgICAgIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZXG5cbiAgICBpZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZVNlcnZpY2VLZXkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlN1cGFiYXNlIFVSTCBvciBTZXJ2aWNlIEtleSBpcyBtaXNzaW5nXCIpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBjbGllbnQgd2l0aG91dCBjdXN0b20gZmV0Y2ggb3B0aW9ucyB0byBhdm9pZCBhYm9ydCBlcnJvcnNcbiAgICByZXR1cm4gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZVNlcnZpY2VLZXksIHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxuICAgICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIFN1cGFiYXNlIHNlcnZlciBjbGllbnQ6XCIsIGVycm9yKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIFN1cGFiYXNlIGlzIGF2YWlsYWJsZVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzU3VwYWJhc2VBdmFpbGFibGUoKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZVNlcnZlckNsaWVudCgpXG4gICAgaWYgKCFzdXBhYmFzZSkgcmV0dXJuIGZhbHNlXG5cbiAgICAvLyBUcnkgYSBzaW1wbGUgcXVlcnkgd2l0aCBhIG1hbnVhbCB0aW1lb3V0IHRvIGNoZWNrIGlmIFN1cGFiYXNlIGlzIHJlc3BvbmRpbmdcbiAgICBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KChfLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIlN1cGFiYXNlIGF2YWlsYWJpbGl0eSBjaGVjayB0aW1lZCBvdXRcIikpLCA1MDAwKVxuICAgIH0pXG5cbiAgICBjb25zdCBxdWVyeVByb21pc2UgPSBzdXBhYmFzZVxuICAgICAgLmZyb20oXCJkaXJlY3RvcnlfbGlzdGluZ3NcIilcbiAgICAgIC5zZWxlY3QoXCJpZFwiKVxuICAgICAgLmxpbWl0KDEpXG4gICAgICAudGhlbigoeyBkYXRhLCBlcnJvciB9KSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTdXBhYmFzZSBhdmFpbGFiaWxpdHkgY2hlY2sgZmFpbGVkOlwiLCBlcnJvcilcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIFN1cGFiYXNlIGF2YWlsYWJpbGl0eSBjaGVjazpcIiwgZXJyb3IpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSlcblxuICAgIC8vIFJhY2UgYmV0d2VlbiB0aGUgcXVlcnkgYW5kIHRoZSB0aW1lb3V0XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShbcXVlcnlQcm9taXNlLCB0aW1lb3V0UHJvbWlzZV0pIGFzIFByb21pc2U8Ym9vbGVhbj5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2hlY2tpbmcgU3VwYWJhc2UgYXZhaWxhYmlsaXR5OlwiLCBlcnJvcilcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsImJyb3dzZXJDbGllbnQiLCJnZXRTdXBhYmFzZUJyb3dzZXJDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUFub25LZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsImNvbnNvbGUiLCJ3YXJuIiwiYXV0aCIsInBlcnNpc3RTZXNzaW9uIiwic3RvcmFnZUtleSIsImVycm9yIiwiZ2V0U3VwYWJhc2VTZXJ2ZXJDbGllbnQiLCJTVVBBQkFTRV9VUkwiLCJzdXBhYmFzZVNlcnZpY2VLZXkiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwiU1VQQUJBU0VfQU5PTl9LRVkiLCJhdXRvUmVmcmVzaFRva2VuIiwiaXNTdXBhYmFzZUF2YWlsYWJsZSIsInN1cGFiYXNlIiwidGltZW91dFByb21pc2UiLCJQcm9taXNlIiwiXyIsInJlamVjdCIsInNldFRpbWVvdXQiLCJFcnJvciIsInF1ZXJ5UHJvbWlzZSIsImZyb20iLCJzZWxlY3QiLCJsaW1pdCIsInRoZW4iLCJkYXRhIiwiY2F0Y2giLCJyYWNlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flistings%2Fsubmit%2Froute&page=%2Fapi%2Flistings%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flistings%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flistings%2Fsubmit%2Froute&page=%2Fapi%2Flistings%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flistings%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_dominicdoherty_Projects_safarioverland_app_api_listings_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/listings/submit/route.ts */ \"(rsc)/./app/api/listings/submit/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/listings/submit/route\",\n        pathname: \"/api/listings/submit\",\n        filename: \"route\",\n        bundlePath: \"app/api/listings/submit/route\"\n    },\n    resolvedPagePath: \"/Users/dominicdoherty/Projects/safarioverland/app/api/listings/submit/route.ts\",\n    nextConfigOutput,\n    userland: _Users_dominicdoherty_Projects_safarioverland_app_api_listings_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMF9yZWFjdEAxOS4xLjBfX3JlYWN0QDE5LjEuMC9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsaXN0aW5ncyUyRnN1Ym1pdCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbGlzdGluZ3MlMkZzdWJtaXQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsaXN0aW5ncyUyRnN1Ym1pdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmRvbWluaWNkb2hlcnR5JTJGUHJvamVjdHMlMkZzYWZhcmlvdmVybGFuZCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZkb21pbmljZG9oZXJ0eSUyRlByb2plY3RzJTJGc2FmYXJpb3ZlcmxhbmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZG9taW5pY2RvaGVydHkvUHJvamVjdHMvc2FmYXJpb3ZlcmxhbmQvYXBwL2FwaS9saXN0aW5ncy9zdWJtaXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xpc3RpbmdzL3N1Ym1pdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xpc3RpbmdzL3N1Ym1pdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbGlzdGluZ3Mvc3VibWl0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2RvbWluaWNkb2hlcnR5L1Byb2plY3RzL3NhZmFyaW92ZXJsYW5kL2FwcC9hcGkvbGlzdGluZ3Mvc3VibWl0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flistings%2Fsubmit%2Froute&page=%2Fapi%2Flistings%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flistings%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0","vendor-chunks/tr46@0.0.3","vendor-chunks/@supabase+auth-js@2.69.1","vendor-chunks/@supabase+realtime-js@2.11.2","vendor-chunks/@supabase+postgrest-js@1.19.4","vendor-chunks/@supabase+node-fetch@2.6.15","vendor-chunks/whatwg-url@5.0.0","vendor-chunks/@supabase+storage-js@2.7.1","vendor-chunks/@supabase+supabase-js@2.49.4","vendor-chunks/@supabase+functions-js@2.4.4","vendor-chunks/webidl-conversions@3.0.1","vendor-chunks/zod@3.24.2"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flistings%2Fsubmit%2Froute&page=%2Fapi%2Flistings%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flistings%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdominicdoherty%2FProjects%2Fsafarioverland&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();