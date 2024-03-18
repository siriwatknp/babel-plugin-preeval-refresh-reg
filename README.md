# babel-plugin-preeval-refresh-reg

## Problem

This is the example React code that goes through `wyw-in-js` preeval stage:

```js
const Divider = /*#__PURE__*/ _s(
  React.forwardRef(
    (_c = _s(
      function Divider(inProps, ref) {
        _s();
        // ...
        return /*#__PURE__*/ _jsx(
          DividerRoot,
          _extends(
            {
              as: component,
              className: clsx(classes.root, className),
              role: role,
              ref: ref,
              ownerState: ownerState,
            },
            other,
            {
              children: children
                ? /*#__PURE__*/ _jsx(DividerWrapper, {
                    className: classes.wrapper,
                    ownerState: ownerState,
                    children: children,
                  })
                : null,
            }
          )
        );
      },
      '526RDEpO1CGEADq5vnCvoNyCejQ=',
      false,
      function() {
        return [useThemeProps, useUtilityClasses];
      }
    ))
  ),
  '526RDEpO1CGEADq5vnCvoNyCejQ=',
  false,
  function() {
    return [useThemeProps, useUtilityClasses];
  }
);
_c1 = Divider;
/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */ Divider.muiSkipListHighlight = true;

export default Divider;
var _c, _c1;
$RefreshReg$(_c, 'Divider$React.forwardRef');
$RefreshReg$(_c1, 'Divider');
```

The `$RefreshReg$` is injected by React Refresh from a framework like Next.js or Vite. In the preeval phase, `wyw-in-js` will remove the global `$RefreshReg$` but there is a bug in removing the `_c` (I am not sure is it the bug in `wyw-in-js` or `babel`) so the code that go through evaluation looks like this:

```js
const Divider = /*#__PURE__*/ _s(
  React.forwardRef(
    (_c = _s(
      function Divider(inProps, ref) {
        _s();
        // ...
      },
      '526RDEpO1CGEADq5vnCvoNyCejQ=',
      false,
      function() {
        return [useThemeProps, useUtilityClasses];
      }
    ))
  ),
  '526RDEpO1CGEADq5vnCvoNyCejQ=',
  false,
  function() {
    return [useThemeProps, useUtilityClasses];
  }
);
/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */ Divider.muiSkipListHighlight = true;

export default Divider;
```

Causing the error `_c is not defined`.

## Solution

This plugin will replace the `_c = _s(...)` with `_s(...)` directly so that there is no use of the variable to make the evalution works.

## Installation

```bash
npm install babel-plugin-preeval-refresh-reg
```

## Usage

```json
// .babelrc
{
  "plugins": ["babel-plugin-preeval-refresh-reg"]
}
```
