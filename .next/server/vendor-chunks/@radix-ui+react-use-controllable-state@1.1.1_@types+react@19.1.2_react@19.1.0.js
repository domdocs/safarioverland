"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-use-controllable-state@1.1.1_@types+react@19.1.2_react@19.1.0";
exports.ids = ["vendor-chunks/@radix-ui+react-use-controllable-state@1.1.1_@types+react@19.1.2_react@19.1.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs ***!
  \*****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useControllableState: () => (/* binding */ useControllableState)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ \"(ssr)/./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs\");\n// packages/react/use-controllable-state/src/use-controllable-state.tsx\n\n\nfunction useControllableState({\n  prop,\n  defaultProp,\n  onChange = () => {\n  }\n}) {\n  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });\n  const isControlled = prop !== void 0;\n  const value = isControlled ? prop : uncontrolledProp;\n  const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onChange);\n  const setValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(\n    (nextValue) => {\n      if (isControlled) {\n        const setter = nextValue;\n        const value2 = typeof nextValue === \"function\" ? setter(prop) : nextValue;\n        if (value2 !== prop) handleChange(value2);\n      } else {\n        setUncontrolledProp(nextValue);\n      }\n    },\n    [isControlled, prop, setUncontrolledProp, handleChange]\n  );\n  return [value, setValue];\n}\nfunction useUncontrolledState({\n  defaultProp,\n  onChange\n}) {\n  const uncontrolledState = react__WEBPACK_IMPORTED_MODULE_0__.useState(defaultProp);\n  const [value] = uncontrolledState;\n  const prevValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);\n  const handleChange = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onChange);\n  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {\n    if (prevValueRef.current !== value) {\n      handleChange(value);\n      prevValueRef.current = value;\n    }\n  }, [value, prevValueRef, handleChange]);\n  return uncontrolledState;\n}\n\n//# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGVAMS4xLjFfQHR5cGVzK3JlYWN0QDE5LjEuMl9yZWFjdEAxOS4xLjAvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQytCO0FBQ21DO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QseUVBQXlFLHVCQUF1QjtBQUNoRztBQUNBO0FBQ0EsdUJBQXVCLGdGQUFjO0FBQ3JDLG1CQUFtQiw4Q0FBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDRCQUE0QiwyQ0FBYztBQUMxQztBQUNBLHVCQUF1Qix5Q0FBWTtBQUNuQyx1QkFBdUIsZ0ZBQWM7QUFDckMsRUFBRSw0Q0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBR0U7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2RvbWluaWNkb2hlcnR5L1Byb2plY3RzL3NhZmFyaW92ZXJsYW5kL25vZGVfbW9kdWxlcy8ucG5wbS9AcmFkaXgtdWkrcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZUAxLjEuMV9AdHlwZXMrcmVhY3RAMTkuMS4yX3JlYWN0QDE5LjEuMC9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGUvZGlzdC9pbmRleC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS9zcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgcHJvcCxcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlID0gKCkgPT4ge1xuICB9XG59KSB7XG4gIGNvbnN0IFt1bmNvbnRyb2xsZWRQcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wXSA9IHVzZVVuY29udHJvbGxlZFN0YXRlKHsgZGVmYXVsdFByb3AsIG9uQ2hhbmdlIH0pO1xuICBjb25zdCBpc0NvbnRyb2xsZWQgPSBwcm9wICE9PSB2b2lkIDA7XG4gIGNvbnN0IHZhbHVlID0gaXNDb250cm9sbGVkID8gcHJvcCA6IHVuY29udHJvbGxlZFByb3A7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHVzZUNhbGxiYWNrUmVmKG9uQ2hhbmdlKTtcbiAgY29uc3Qgc2V0VmFsdWUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAobmV4dFZhbHVlKSA9PiB7XG4gICAgICBpZiAoaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IHNldHRlciA9IG5leHRWYWx1ZTtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gdHlwZW9mIG5leHRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0dGVyKHByb3ApIDogbmV4dFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUyICE9PSBwcm9wKSBoYW5kbGVDaGFuZ2UodmFsdWUyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFVuY29udHJvbGxlZFByb3AobmV4dFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0NvbnRyb2xsZWQsIHByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIGhhbmRsZUNoYW5nZV1cbiAgKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWVdO1xufVxuZnVuY3Rpb24gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2Vcbn0pIHtcbiAgY29uc3QgdW5jb250cm9sbGVkU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShkZWZhdWx0UHJvcCk7XG4gIGNvbnN0IFt2YWx1ZV0gPSB1bmNvbnRyb2xsZWRTdGF0ZTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QudXNlUmVmKHZhbHVlKTtcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gdXNlQ2FsbGJhY2tSZWYob25DaGFuZ2UpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdmFsdWUpIHtcbiAgICAgIGhhbmRsZUNoYW5nZSh2YWx1ZSk7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgfSwgW3ZhbHVlLCBwcmV2VmFsdWVSZWYsIGhhbmRsZUNoYW5nZV0pO1xuICByZXR1cm4gdW5jb250cm9sbGVkU3RhdGU7XG59XG5leHBvcnQge1xuICB1c2VDb250cm9sbGFibGVTdGF0ZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs\n");

/***/ })

};
;