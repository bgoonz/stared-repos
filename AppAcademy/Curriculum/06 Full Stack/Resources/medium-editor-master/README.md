﻿![medium-editor needs help!](https://user-images.githubusercontent.com/2444240/56086015-c42e3000-5e1b-11e9-9692-b97816f67712.png)

If you would be interested in helping to maintain one of the most successful WYSIWYG text editors on github, let us know! (See issue [#1503](https://github.com/yabwe/medium-editor/issues/1503))

# MediumEditor

This is a clone of [medium.com](https://medium.com) inline editor toolbar.

MediumEditor has been written using vanilla JavaScript, no additional frameworks required.

[![screenshot](https://raw.github.com/yabwe/medium-editor/master/demo/img/medium-editor.jpg)](http://yabwe.github.io/medium-editor/)

[![Join the chat at https://gitter.im/yabwe/medium-editor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yabwe/medium-editor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Browser Support

[![Saucelabs Build Status](https://saucelabs.com/browser-matrix/mediumeditor.svg)](https://saucelabs.com/beta/dashboard/builds)

![Supported Browsers](https://cloud.githubusercontent.com/assets/2444240/12874138/d3960a04-cd9b-11e5-8cc5-8136d82cf5f6.png)

[![NPM info](https://nodei.co/npm/medium-editor.png?downloads=true)](https://www.npmjs.com/package/medium-editor)

[![Travis build status](https://travis-ci.org/yabwe/medium-editor.svg?branch=master)](https://travis-ci.org/yabwe/medium-editor)
[![Dependency Status](https://david-dm.org/yabwe/medium-editor.svg)](https://david-dm.org/yabwe/medium-editor)
[![devDependency Status](https://david-dm.org/yabwe/medium-editor/dev-status.svg)](https://david-dm.org/yabwe/medium-editor#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yabwe/medium-editor/badge.svg?branch=master&service=github)](https://coveralls.io/github/yabwe/medium-editor?branch=master)

# Basic usage

### Demo

**demo**: [http://yabwe.github.io/medium-editor/](http://yabwe.github.io/medium-editor/)

### Installation

**Via npm:**

Run in your console: `npm install medium-editor`

**Via bower:**

`bower install medium-editor`

**Via an external CDN**

-   Using [jsDelivr](http://www.jsdelivr.com/#!medium-editor).

For the latest version:

```html
<script src="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js"></script>
<link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css"
    type="text/css"
    media="screen"
    charset="utf-8"
/>
```

For a custom one:

```html
<script src="//cdn.jsdelivr.net/npm/medium-editor@5.23.2/dist/js/medium-editor.min.js"></script>
<link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/medium-editor@5.23.2/dist/css/medium-editor.min.css"
    type="text/css"
    media="screen"
    charset="utf-8"
/>
```

-   Using [CDNJS](https://cdnjs.com/libraries/medium-editor).

**Manual installation:**

Download the [latest release](https://github.com/yabwe/medium-editor/releases) and attach medium editor's stylesheets to your page:

Find the files to below mentioned linking in the dist folder. (./medium-editor/dist/...)

```html
<link rel="stylesheet" href="css/medium-editor.css" />
<!-- Core -->
<link rel="stylesheet" href="css/themes/default.css" />
<!-- or any other theme -->
```

### Usage

The next step is to reference the editor's script

```html
<script src="js/medium-editor.js"></script>
```

You can now instantiate a new MediumEditor object:

```html
<script>
    var editor = new MediumEditor(".editable");
</script>
```

The above code will transform all the elements with the .editable class into HTML5 editable contents and add the medium editor toolbar to them.

You can also pass a list of HTML elements:

```javascript
var elements = document.querySelectorAll(".editable"),
    editor = new MediumEditor(elements);
```

MediumEditor also supports textarea. If you provide a textarea element, the script will create a new div with `contentEditable=true`, hide the textarea and link the textarea value to the div HTML content.

##### Integrating with various frameworks

People have contributed wrappers around MediumEditor for integrating with different frameworks and tech stacks. Take a look at the list of existing [Wrappers and Integrations](https://github.com/yabwe/medium-editor/wiki/Wrappers-and-Integration) that have already been written for MediumEditor!

## MediumEditor Options

View the [MediumEditor Options documentation](OPTIONS.md) on all the various options for MediumEditor.

Options to customize medium-editor are passed as the second argument to the [MediumEditor constructor](API.md#mediumeditorelements-options). Example:

```js
var editor = new MediumEditor(".editor", {
    // options go here
});
```

### Core options

-   **activeButtonClass**: CSS class added to active buttons in the toolbar. Default: `'medium-editor-button-active'`
-   **buttonLabels**: type of labels on the buttons. Values: `false` | 'fontawesome'. Default: `false`

#### NOTE:

Using `'fontawesome'` as the buttonLabels requires version 4.1.0 of the fontawesome css to be on the page to ensure all icons will be displayed correctly

-   **delay**: time in milliseconds to show the toolbar or anchor tag preview. Default: `0`
-   **disableReturn**: enables/disables the use of the return-key. You can also set specific element behavior by using setting a data-disable-return attribute. Default: `false`
-   **disableDoubleReturn**: allows/disallows two (or more) empty new lines. You can also set specific element behavior by using setting a data-disable-double-return attribute. Default: `false`
-   **disableExtraSpaces**: when set to true, it disallows spaces at the beginning and end of the element. Also it disallows entering 2 consecutive spaces between 2 words. Default: `false`
-   **disableEditing**: enables/disables adding the contenteditable behavior. Useful for using the toolbar with customized buttons/actions. You can also set specific element behavior by using setting a data-disable-editing attribute. Default: `false`
-   **elementsContainer**: specifies a DOM node to contain MediumEditor's toolbar and anchor preview elements. Default: `document.body`
-   **extensions**: extension to use (see [Custom Buttons and Extensions](src/js/extensions)) for more. Default: `{}`
-   **spellcheck**: Enable/disable native contentEditable automatic spellcheck. Default: `true`
-   **targetBlank**: enables/disables target="\_blank" for anchor tags. Default: `false`

### Toolbar options

The toolbar for MediumEditor is implemented as a built-in extension which automatically displays whenever the user selects some text. The toolbar can hold any set of defined built-in buttons, but can also hold any custom buttons passed in as extensions.

Options for the toolbar are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor(".editable", {
    toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: "medium-editor-button-first",
        lastButtonClass: "medium-editor-button-last",
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: "center",
        sticky: false,
        updateOnEmptySelection: false,
    },
});
```

-   **allowMultiParagraphSelection**: enables/disables whether the toolbar should be displayed when selecting multiple paragraphs/block elements. Default: `true`
-   **buttons**: the set of buttons to display on the toolbar. Default: `['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote']`
    -   See [Button Options](#button-options) for details on more button options
-   **diffLeft**: value in pixels to be added to the X axis positioning of the toolbar. Default: `0`
-   **diffTop**: value in pixels to be added to the Y axis positioning of the toolbar. Default: `-10`
-   **firstButtonClass**: CSS class added to the first button in the toolbar. Default: `'medium-editor-button-first'`
-   **lastButtonClass**: CSS class added to the last button in the toolbar. Default: `'medium-editor-button-last'`
-   **relativeContainer**: DOMElement to append the toolbar to instead of the body. When passed, the toolbar will also be positioned `relative` instead of `absolute`. Default: `null`
-   **standardizeSelectionStart**: enables/disables standardizing how the beginning of a range is decided between browsers whenever the selected text is analyzed for updating toolbar buttons status. Default: `false`
-   **static**: enable/disable the toolbar always displaying in the same location relative to the medium-editor element. Default: `false`

##### Options which only apply when the `static` option is being used:

-   **align**: `left`|`center`|`right` - When the **static** option is `true`, this aligns the static toolbar relative to the medium-editor element. Default: `center`
-   **sticky**: When the **static** option is `true`, this enables/disables the toolbar "sticking" to the viewport and staying visible on the screen while the page scrolls. Default: `false`
-   **updateOnEmptySelection**: When the **static** option is `true`, this enables/disables updating the state of the toolbar buttons even when the selection is collapsed (there is no selection, just a cursor). Default: `false`

To disable the toolbar (which also disables the anchor-preview extension), set the value of the `toolbar` option to `false`:

```javascript
var editor = new MediumEditor(".editable", {
    toolbar: false,
});
```

#### Button Options

Button behavior can be modified by passing an object into the buttons array instead of a string. This allow for overriding some of the default behavior of buttons. The following options are some of the basic parts of buttons that you may override, but any part of the `MediumEditor.Extension.prototype` can be overridden via these button options. (Check out the [source code for buttons](src/js/extensions/button.js) to see what all can be overridden).

-   **name**: name of the button being overridden
-   **action**: argument to pass to `MediumEditor.execAction()` when the button is clicked.
-   **aria**: value to add as the aria-label attribute of the button element displayed in the toolbar. This is also used as the tooltip for the button.
-   **tagNames**: array of element tag names that would indicate that this button has already been applied. If this action has already been applied, the button will be displayed as 'active' in the toolbar.
    -   _Example_: For 'bold', if the text is ever within a `<b>` or `<strong>` tag that indicates the text is already bold. So the array of tagNames for bold would be: `['b', 'strong']`
    -   **NOTE**: This is not used if `useQueryState` is set to `true`.
-   **style**: A pair of css property & value(s) that indicate that this button has already been applied. If this action has already been applied, the button will be displayed as 'active' in the toolbar.
    -   _Example_: For 'bold', if the text is ever within an element with a `'font-weight'` style property set to `700` or `'bold'`, that indicates the text is already bold. So the style object for bold would be `{ prop: 'font-weight', value: '700|bold' }`
    -   **NOTE**: This is not used if `useQueryState` is set to `true`.
    -   Properties of the **style** object:
        -   **prop**: name of the css property
        -   **value**: value(s) of the css property (multiple values can be separated by a `'|'`)
-   **useQueryState**: Enables/disables whether this button should use the built-in `document.queryCommandState()` method to determine whether the action has already been applied. If the action has already been applied, the button will be displayed as 'active' in the toolbar
    -   _Example_: For 'bold', if this is set to true, the code will call `document.queryCommandState('bold')` which will return true if the browser thinks the text is already bold, and false otherwise
-   **contentDefault**: Default `innerHTML` to put inside the button
-   **contentFA**: The `innerHTML` to use for the content of the button if the **buttonLabels** option for MediumEditor is set to `'fontawesome'`
-   **classList**: An array of classNames (strings) to be added to the button
-   **attrs**: A set of key-value pairs to add to the button as custom attributes to the button element.

Example of overriding buttons (here, the goal is to mimic medium by having <kbd>H1</kbd> and <kbd>H2</kbd> buttons which actually produce `<h2>` and `<h3>` tags respectively):

```javascript
var editor = new MediumEditor(".editable", {
    toolbar: {
        buttons: [
            "bold",
            "italic",
            {
                name: "h1",
                action: "append-h2",
                aria: "header type 1",
                tagNames: ["h2"],
                contentDefault: "<b>H1</b>",
                classList: ["custom-class-h1"],
                attrs: {
                    "data-custom-attr": "attr-value-h1",
                },
            },
            {
                name: "h2",
                action: "append-h3",
                aria: "header type 2",
                tagNames: ["h3"],
                contentDefault: "<b>H2</b>",
                classList: ["custom-class-h2"],
                attrs: {
                    "data-custom-attr": "attr-value-h2",
                },
            },
            "justifyCenter",
            "quote",
            "anchor",
        ],
    },
});
```

### Anchor Preview options

The anchor preview is a built-in extension which automatically displays a 'tooltip' when the user is hovering over a link in the editor. The tooltip will display the `href` of the link, and when click, will open the anchor editing form in the toolbar.

Options for the anchor preview 'tooltip' are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor('.editable', {
    anchorPreview: {
        /* These are the default options for anchor preview,
           if nothing is passed this is what it used */
        hideDelay: 500,
        previewValueSelector: 'a'
    }
}
});
```

-   **hideDelay**: time in milliseconds to show the anchor tag preview after the mouse has left the anchor tag. Default: `500`
-   **previewValueSelector**: the default selector to locate where to put the activeAnchor value in the preview. You should only need to override this if you've modified the way in which the anchor-preview extension renders. Default: `'a'`
-   **showWhenToolbarIsVisible**: determines whether the anchor tag preview shows up when the toolbar is visible. You should set this value to true if the static option for the toolbar is true and you want the preview to show at the same time. Default: `false`
-   **showOnEmptyLinks**: determines whether the anchor tag preview shows up on link with href as '' or '#something'. You should set this value to false if you do not want the preview to show up in such use cases. Default: `true`

To disable the anchor preview, set the value of the `anchorPreview` option to `false`:

```javascript
var editor = new MediumEditor(".editable", {
    anchorPreview: false,
});
```

##### NOTE:

-   If the toolbar is disabled (via `toolbar: false` option or `data-disable-toolbar` attribute) the anchor-preview is automatically disabled.
-   If the anchor editing form is not enabled, clicking on the anchor-preview will not allow the href of the link to be edited

### Placeholder Options

The placeholder handler is a built-in extension which displays placeholder text when the editor is empty.

Options for placeholder are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor(".editable", {
    placeholder: {
        /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
        text: "Type your text",
        hideOnClick: true,
    },
});
```

-   **text**: Defines the default placeholder for empty contenteditables when **placeholder** is not set to false. You can overwrite it by setting a `data-placeholder` attribute on the editor elements. Default: `'Type your text'`

-   **hideOnClick**: Causes the placeholder to disappear as soon as the field gains focus. Default: `true`.
    To hide the placeholder only after starting to type, and to show it again as soon as field is empty, set this option to `false`.

To disable the placeholder, set the value of the `placeholder` option to `false`:

```javascript
var editor = new MediumEditor(".editable", {
    placeholder: false,
});
```

### Anchor Form options

The anchor form is a built-in button extension which allows the user to add/edit/remove links from within the editor. When 'anchor' is passed in as a button in the list of buttons, this extension will be enabled and can be triggered by clicking the corresponding button in the toolbar.

Options for the anchor form are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor('.editable', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor']
    },
    anchor: {
        /* These are the default options for anchor form,
           if nothing is passed this is what it used */
        customClassOption: null,
        customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: 'Paste or type a link',
        targetCheckbox: false,
        targetCheckboxText: 'Open in new window'
    }
}
});
```

-   **customClassOption**: custom class name the user can optionally have added to their created links (ie 'button'). If passed as a non-empty string, a checkbox will be displayed allowing the user to choose whether to have the class added to the created link or not. Default: `null`
-   **customClassOptionText**: text to be shown in the checkbox when the **customClassOption** is being used. Default: `'Button'`
-   **linkValidation**: enables/disables check for common URL protocols on anchor links. Converts invalid url characters (ie spaces) to valid characters using `encodeURI`. Default: `false`
-   **placeholderText**: text to be shown as placeholder of the anchor input. Default: `'Paste or type a link'`
-   **targetCheckbox**: enables/disables displaying a "Open in new window" checkbox, which when checked changes the `target` attribute of the created link. Default: `false`
-   **targetCheckboxText**: text to be shown in the checkbox enabled via the **targetCheckbox** option. Default: `'Open in new window'`

### Paste Options

The paste handler is a built-in extension which attempts to filter the content when the user pastes. How the paste handler filters is configurable via specific options.

Options for paste handling are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor(".editable", {
    paste: {
        /* This example includes the default options for paste,
           if nothing is passed this is what it used */
        forcePlainText: true,
        cleanPastedHTML: false,
        cleanReplacements: [],
        cleanAttrs: ["class", "style", "dir"],
        cleanTags: ["meta"],
        unwrapTags: [],
    },
});
```

-   **forcePlainText**: Forces pasting as plain text. Default: `true`
-   **cleanPastedHTML**: cleans pasted content from different sources, like google docs etc. Default: `false`
-   **preCleanReplacements**: custom pairs (2 element arrays) of RegExp and replacement text to use during paste when **forcePlainText** or **cleanPastedHTML** are `true` OR when calling `cleanPaste(text)` helper method. These replacements are executed _before_ builtin replacements. Default: `[]`
-   **cleanReplacements**: custom pairs (2 element arrays) of RegExp and replacement text to use during paste when **forcePlainText** or **cleanPastedHTML** are `true` OR when calling `cleanPaste(text)` helper method. These replacements are executed _after_ builtin replacements. Default: `[]`
-   **cleanAttrs**: list of element attributes to remove during paste when **cleanPastedHTML** is `true` or when calling `cleanPaste(text)` or `pasteHTML(html,options)` helper methods. Default: `['class', 'style', 'dir']`
-   **cleanTags**: list of element tag names to remove during paste when **cleanPastedHTML** is `true` or when calling `cleanPaste(text)` or `pasteHTML(html,options)` helper methods. Default: `['meta']`
-   **unwrapTags**: list of element tag names to unwrap (remove the element tag but retain its child elements) during paste when **cleanPastedHTML** is `true` or when calling `cleanPaste(text)` or `pasteHTML(html,options)` helper methods. Default: `[]`

### KeyboardCommands Options

The keyboard commands handler is a built-in extension for mapping key-combinations to actions to execute in the editor.

Options for KeyboardCommands are passed as an object that is a member of the outer options object. Example:

```javascript
var editor = new MediumEditor(".editable", {
    keyboardCommands: {
        /* This example includes the default options for keyboardCommands,
           if nothing is passed this is what it used */
        commands: [
            {
                command: "bold",
                key: "B",
                meta: true,
                shift: false,
                alt: false,
            },
            {
                command: "italic",
                key: "I",
                meta: true,
                shift: false,
                alt: false,
            },
            {
                command: "underline",
                key: "U",
                meta: true,
                shift: false,
                alt: false,
            },
        ],
    },
});
```

-   **commands**: Array of objects describing each command and the combination of keys that will trigger it. Required for each object:
    -   _command_: argument passed to `editor.execAction()` when key-combination is used
        -   if defined as `false`, the shortcut will be disabled
    -   _key_: keyboard character that triggers this command
    -   _meta_: whether the ctrl/meta key has to be active or inactive
    -   _shift_: whether the shift key has to be active or inactive
    -   _alt_: whether the alt key has to be active or inactive

To disable the keyboard commands, set the value of the `keyboardCommands` option to `false`:

```javascript
var editor = new MediumEditor(".editable", {
    keyboardCommands: false,
});
```

### Auto Link Options

The auto-link handler is a built-in extension which automatically turns URLs entered into the text field into HTML anchor tags (similar to the functionality of Markdown). This feature is OFF by default.

To enable built-in auto-link support, set the value of the `autoLink` option to `true`:

```javascript
var editor = new MediumEditor(".editable", {
    autoLink: true,
});
```

### Image Dragging Options

The image dragging handler is a built-in extension for handling dragging & dropping images into the contenteditable. This feature is ON by default.

To disable built-in image dragging, set the value of the `imageDragging` option to `false`:

```javascript
var editor = new MediumEditor(".editable", {
    imageDragging: false,
});
```

#### Disable File Dragging

To stop preventing drag & drop events and disable file dragging in general, provide a dummy ImageDragging extension.

```javascript
var editor = new MediumEditor(".editor", {
    extensions: {
        imageDragging: {},
    },
});
```

Due to the [state of code](https://github.com/yabwe/medium-editor/issues/966) in 5.0.0, the editor _ALWAYS_ prevented any drag and drop actions.
We will have a better way to disable file dragging in 6.\*

### Options Example:

```javascript
var editor = new MediumEditor(".editable", {
    delay: 1000,
    targetBlank: true,
    toolbar: {
        buttons: ["bold", "italic", "quote"],
        diffLeft: 25,
        diffTop: 10,
    },
    anchor: {
        placeholderText: "Type a link",
        customClassOption: "btn",
        customClassOptionText: "Create Button",
    },
    paste: {
        cleanPastedHTML: true,
        cleanAttrs: ["style", "dir"],
        cleanTags: ["label", "meta"],
        unwrapTags: ["sub", "sup"],
    },
    anchorPreview: {
        hideDelay: 300,
    },
    placeholder: {
        text: "Click to edit",
    },
});
```

## Buttons

By default, MediumEditor supports buttons for most of the commands for `document.execCommand()` that are well-supported across all its supported browsers.

### Default buttons.

MediumEditor, by default, will show only the buttons listed here to avoid a huge toolbar:

-   **bold**
-   **italic**
-   **underline**
-   **anchor** _(built-in support for collecting a url via the anchor extension)_
-   **h2**
-   **h3**
-   **quote**

### All buttons.

These are all the built-in buttons supported by MediumEditor.

-   **bold**
-   **italic**
-   **underline**
-   **strikethrough**
-   **subscript**
-   **superscript**
-   **anchor**
-   **image** (this simply converts selected text to an image tag)
-   **quote**
-   **pre**
-   **orderedlist**
-   **unorderedlist**
-   **indent** (moves the selected text up one level)
-   **outdent** (moves the selected text down one level)
-   **justifyLeft**
-   **justifyCenter**
-   **justifyRight**
-   **justifyFull**
-   **h1**
-   **h2**
-   **h3**
-   **h4**
-   **h5**
-   **h6**
-   **removeFormat** (clears inline style formatting, preserves blocks)
-   **html** (parses selected html and converts into actual html elements)

## Themes

Check out the Wiki page for a list of available themes: [https://github.com/yabwe/medium-editor/wiki/Themes](https://github.com/yabwe/medium-editor/wiki/Themes)

## API

View the [MediumEditor Object API documentation](API.md) on the Wiki for details on all the methods supported on the MediumEditor object.

### Initialization methods

-   **MediumEditor(elements, options)**: Creates an instance of MediumEditor
-   **.destroy()**: tears down the editor if already setup, removing all DOM elements and event handlers
-   **.setup()**: rebuilds the editor if it has already been destroyed, recreating DOM elements and attaching event handlers
-   **.addElements()**: add elements to an already initialized instance of MediumEditor
-   **.removeElements()**: remove elements from an already initialized instance of MediumEditor

### Event Methods

-   **.on(target, event, listener, useCapture)**: attach a listener to a DOM event which will be detached when MediumEditor is deactivated
-   **.off(target, event, listener, useCapture)**: detach a listener to a DOM event that was attached via `on()`
-   **.subscribe(event, listener)**: attaches a listener to a custom medium-editor event
-   **.unsubscribe(event, listener)**: detaches a listener from a custom medium-editor event
-   **.trigger(name, data, editable)**: manually triggers a custom medium-editor event

### Selection Methods

-   **.checkSelection()**: manually trigger an update of the toolbar and extensions based on the current selection
-   **.exportSelection()**: return a data representation of the selected text, which can be applied via `importSelection()`
-   **.importSelection(selectionState)**: restore the selection using a data representation of previously selected text (ie value returned by `exportSelection()`)
-   **.getFocusedElement()**: returns an element if any contenteditable element monitored by MediumEditor currently has focused
-   **.getSelectedParentElement(range)**: get the parent contenteditable element that contains the current selection
-   **.restoreSelection()**: restore the selection to what was selected when `saveSelection()` was called
-   **.saveSelection()**: internally store the set of selected text
-   **.selectAllContents()**: expands the selection to contain all text within the focused contenteditable
-   **.selectElement(element)**: change selection to be a specific element and update the toolbar to reflect the selection
-   **.stopSelectionUpdates()**: stop the toolbar from updating to reflect the state of the selected text
-   **.startSelectionUpdates()**: put the toolbar back into its normal updating state

### Editor Action Methods

-   **.cleanPaste(text)**: convert text to plaintext and replace current selection with result
-   **.createLink(opts)**: creates a link via the native `document.execCommand('createLink')` command
-   **.execAction(action, opts)**: executes an built-in action via `document.execCommand`
-   **.pasteHTML(html, options)**: replace the current selection with html
-   **.queryCommandState(action)**: wrapper around the browser's built in `document.queryCommandState(action)` for checking whether a specific action has already been applied to the selection.

### Helper Methods

-   **.delay(fn)**: delay any function from being executed by the amount of time passed as the `delay` option
-   **.getContent(index)**: gets the trimmed `innerHTML` of the element at `index`
-   **.getExtensionByName(name)**: get a reference to an extension with the specified name
-   **.resetContent(element)**: reset the content of all elements or a specific element to its value when added to the editor initially
-   **.serialize()**: returns a JSON object with elements contents
-   **.setContent(html, index)**: sets the `innerHTML` to `html` of the element at `index`

### Static Methods/Properties

-   **.getEditorFromElement(element)**: retrieve the instance of MediumEditor that is monitoring the provided editor element
-   **.version**: the version information for the MediumEditor library

## Dynamically add/remove elements to your instance

It is possible to dynamically add new elements to your existing MediumEditor instance:

```javascript
var editor = new MediumEditor(".editable");
editor.subscribe("editableInput", this._handleEditableInput.bind(this));

// imagine an ajax fetch/any other dynamic functionality which will add new '.editable' elements to the DOM

editor.addElements(".editable");
// OR editor.addElements(document.getElementsByClassName('editable'));
// OR editor.addElements(document.querySelectorAll('.editable'));
```

Passing an elements or array of elements to `addElements(elements)` will:

-   Add the given element or array of elements to the internal `this.elements` array.
-   Ensure the element(s) are initialized with the proper attributes and event handlers as if the element had been passed during instantiation of the editor.
-   For any `<textarea>` elements:
    -   Hide the `<textarea>`
    -   Create a new `<div contenteditable=true>` element and add it to the elements array.
    -   Ensure the 2 elements remain sync'd.
-   Be intelligent enough to run the necessary code only once per element, no matter how often you will call it.

### Removing elements dynamically

Straight forward, just call `removeElements` with the element or array of elements you to want to tear down. Each element itself will remain a contenteditable - it will just remove all event handlers and all references to it so you can safely remove it from DOM.

```javascript
editor.removeElements(document.querySelector("#myElement"));
// OR editor.removeElements(document.getElementById('myElement'));
// OR editor.removeElements('#myElement');

// in case you have jQuery and don't exactly know when an element was removed, for example after routing state change
var removedElements = [];
editor.elements.forEach(function (element) {
    // check if the element is still available in current DOM
    if (!$(element).parents("body").length) {
        removedElements.push(element);
    }
});

editor.removeElements(removedElements);
```

## Capturing DOM changes

For observing any changes on contentEditable, use the custom `'editableInput'` event exposed via the `subscribe()` method:

```js
var editor = new MediumEditor(".editable");
editor.subscribe("editableInput", function (event, editable) {
    // Do some work
});
```

This event is supported in all browsers supported by MediumEditor (including IE9+ and Edge)! To help with cases when one instance of MediumEditor is monitoring multiple elements, the 2nd argument passed to the event handler (`editable` in the example above) will be a reference to the contenteditable element that has actually changed.

This is handy when you need to capture any modifications to the contenteditable element including:

-   Typing
-   Cutting/Pasting
-   Changes from clicking on buttons in the toolbar
-   Undo/Redo

Why is this interesting and why should you use this event instead of just attaching to the `input` event on the contenteditable element?

So for most modern browsers (Chrome, Firefox, Safari, etc.), the `input` event works just fine. In fact, `editableInput` is just a proxy for the `input` event in those browsers. However, the `input` event [is not supported for contenteditable elements in IE 9-11](https://connect.microsoft.com/IE/feedback/details/794285/ie10-11-input-event-does-not-fire-on-div-with-contenteditable-set) and is _mostly_ supported in Microsoft Edge, but not fully.

So, to properly support the `editableInput` event in Internet Explorer and Microsoft Edge, MediumEditor uses a combination of the `selectionchange` and `keypress` events, as well as monitoring calls to `document.execCommand`.

## Extensions & Plugins

Check the [documentation](src/js/extensions) in order to learn how to develop extensions for MediumEditor.

A list of existing extensions and plugins, such as [Images and Media embeds](http://orthes.github.io/medium-editor-insert-plugin/), [Tables](https://github.com/yabwe/medium-editor-tables) and [Markdown](https://github.com/IonicaBizau/medium-editor-markdown) can be found [here](https://github.com/yabwe/medium-editor/wiki/Extensions-Plugins).

## Development

To run the demo locally:

1. Clone this repo locally
2. Run `npm install` from your console at the root
3. Run `node index.js` from the root
4. Navigate to `http://localhost:8088/demo/index.html` to view the demo

MediumEditor development tasks are managed by Grunt. To install all the necessary packages, just invoke:

```bash
npm install
```

To run all the test and build the dist files for testing on demo pages, just invoke:

```bash
grunt
```

These are the other available grunt tasks:

-   **js**: runs jslint and jasmine tests and creates minified and concatenated versions of the script;
-   **css**: runs autoprefixer and csslint
-   **test**: runs jasmine tests, jslint and csslint
-   **watch**: watch for modifications on script/scss files
-   **spec**: runs a task against a specified file

The source files are located inside the **src** directory. Be sure to make changes to these files and not files in the dist directory.

## Contributing

[Kill some bugs :)](https://github.com/yabwe/medium-editor/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Test your changes to the best of your ability.
4. Update the documentation to reflect your changes if they add or changes current functionality.
5. Commit your changes (`git commit -am 'Added some feature'`) **without files from the _dist_ directory**.
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

### Code Consistency

To help create consistent looking code throughout the project, we use a few tools to help us. They have plugins for most popular editors/IDEs to make coding for our project, but you should use them in your project as well!

#### JSHint

We use [JSHint](http://jshint.com/) on each build to find easy-to-catch errors and potential problems in our js. You can find our JSHint settings in the `.jshintrc` file in the root of the project.

#### jscs

We use [jscs](http://jscs.info/) on each build to enforce some code style rules we have for our project. You can find our jscs settings in the `.jscsrc` file in the root of the project.

#### EditorConfig

We use [EditorConfig](http://EditorConfig.org) to maintain consistent coding styles between various editors and IDEs. You can find our settings in the `.editorconfig` file in the root of the project.

### Easy First Bugs

Looking for something simple for a first contribution? Try fixing an [easy first bug](https://github.com/yabwe/medium-editor/issues?q=is%3Aopen+is%3Aissue+label%3A%22easy+first+bug%22)!

## Contributors (100+ and counting!)

[https://github.com/yabwe/medium-editor/graphs/contributors](https://github.com/yabwe/medium-editor/graphs/contributors)

## Is Your Org Using MediumEditor?

Add your org [here](https://github.com/yabwe/medium-editor/issues/828) and we can add you to our [landing page](https://yabwe.github.io/medium-editor/#who-is-using-it)!

## License

MIT: https://github.com/yabwe/medium-editor/blob/master/LICENSE
