checkbox_tree
=============

An elegant solution to creating a checkbox tree from scratch with Backbone and Underscore (https://github.com/cskevint/interview/blob/master/checkbox_tree.md)

Checkbox Tree
Task

Write a custom checkbox-tree component by hand.

The purpose of this test is to determine your ability to create custom components on top of existing, base-functionality JavaScript libraries (e.g. jQuery). You CANNOT use exisiting UI component libraries, plugins or extensions that render a tree with checkbox capabilities.

UI Mockup

+ [x] Arizona
  * [x] Phoenix
  * [x] Tucson
+ [-] California
  * [ ] Fresno
  * [x] Los Angeles
  * [ ] Sacramento
  * [ ] San Diego
  * [ ] San Francisco
  * [ ] San Jose
- [ ] Oregon
- [ ] Nevada
- [ ] New Mexico
Data Load and Transformation

Perform a JSONP ajax call like so:

$.ajax({
    url: "https://raw.github.com/cskevint/interview/master/checkbox_tree.json",
    dataType: "jsonp"   
});
This will call a window.data function with the result JSON string as the argument. You will need to parse it to look like the structure below as input for the component.

Question: Why do we need to use JSONP?
Component requirements

Only nodes with children can be opened or closed using a plus/minus or right triangle/down triangle (triangle with CSS preferred).
Each node has a checkbox which does not impact closed/open state (checkboxes indicate selection state e.g. for a filter).
If any node or any of its children is initially selected, open it by default at render time.
[Optional] Provide a UI-only semi-checked state for nodes that have some children checked but not all.
[Optional] Make it pretty.
Code requirements

You can use base JavaScript libraries such as jQuery, underscore.js, Backbone.js, etc.
HTML markup should be written through JavaScript either as templates or by creating DOM nodes.
CSS should be contained in its own file which could be included in any application page.
Component constructor takes in JSON data as demonstrated below.
Provide a public API that retrieves the selection state of the component in JSON format (semi-checked is false). API result format is up to you.
Submit code in a JSFiddle so that it can be easily viewed and analyzed.
Input for the Component

jsonData = [
    {
        "name": "Arizona",
        "selected": true,
        "children": [
            { "name": "Phoenix", "selected": true },
            { "name": "Tucson", "selected": true }
        ]
    },
    {
        "name": "California",
        "children": [
            { "name": "Fresno" },
            { "name": "Los Angeles", "selected": true },
            { "name": "Sacramento" },
            { "name": "San Diego" },
            { "name": "San Francisco" },
            { "name": "San Jose" },
        ]
    },
    {
        "name": "Oregon",
        "children": [
            { "name": "Portland" },
            { "name": "Eugene" }
        ]
    },
    {
        "name": "Nevada",
        "children": [
            { "name": "Las Vegas" },
            { "name": "Reno" }
        ]
    },
    {
        "name": "New Mexico",
        "children": [
            { "name": "Albuquerque" },
            { "name": "Las Cruces" },
            { "name": "Santa Fe" }
        ]
    }
];
Usage

$("#cities").checkboxTree(jsonData);
or

var checkboxTree = new CheckboxTree({
    el: "#cities",
    data: jsonData
});
checkboxTree.render();
