jsonData = [{
    "name": "Arizona",
        "selected": true,
        "children": [{
        "name": "Phoenix",
            "selected": true
    }, {
        "name": "Tucson",
            "selected": true
    }]
}, {
    "name": "California",
        "children": [{
        "name": "Fresno"
    }, {
        "name": "Los Angeles",
            "selected": true
    }, {
        "name": "Sacramento"
    }, {
        "name": "San Diego"
    }, {
        "name": "San Francisco"
    }, {
        "name": "San Jose"
    }, ]
}, {
    "name": "Oregon",
        "children": [{
        "name": "Portland"
    }, {
        "name": "Eugene"
    }]
}, {
    "name": "Nevada",
        "children": [{
        "name": "Las Vegas"
    }, {
        "name": "Reno"
    }]
}, {
    "name": "New Mexico",
        "children": [{
        "name": "Albuquerque"
    }, {
        "name": "Las Cruces"
    }, {
        "name": "Santa Fe"
    }]
}];


var NodeModel = Backbone.Model.extend({
    initialize: function() {
        var _this = this;

        // initially, pass in the whole object
        var spec = _this.get("spec");

        _this.set("name", spec.name);
        _this.set("selected", spec.selected);
        if(spec.children) {
            _this.set("children", spec.children.map(function(child) {
                return new NodeModel({spec: child});
            }));

            var initiallyExpanded = false;

            _this.get("children").forEach(function(child) {
                if(child.get("selected") || child.get("expanded")) {
                    initiallyExpanded = true;
                }

                _this.listenTo(child, "change:selected", $.proxy(_this.childStateChanged, _this));
            })

            _this.set("expanded", _this.get("selected") || initiallyExpanded);

            _this.listenTo(_this, "change:selected", $.proxy(_this.checkAllChildren, _this));
        }
    },

    checkAllChildren: function () {
        var _this = this;

        if(!this.has("children")) {
            return;
        }

        this.get("children").forEach(function(child) {
            child.set("selected", _this.get("selected"));
        });
    },

    childStateChanged: function () {
        var _this = this;

        var counts = _.countBy(this.get("children"), function (child) {
            return child.get("selected") ? "selected" : "unselected";
        });

        if(counts.selected == this.get("children").length) {
            this.set("selected", true);
        } else if (counts.selected == 0) {
            this.set("selected", false);
        }
    }
});

var NodeView = Backbone.View.extend({
    initialize: function() {
        if (this.model.has("children")) {
            this.collapseButton = $("<span>[-]</span>").addClass("collapseButton");
            this.$el.append(this.collapseButton);
        } else {
            this.$el.append("<span>*</span>");
        }

        this.checkbox = $("<input type='checkbox'>").addClass("checkbox");
        this.$el.append(this.checkbox);

        this.nameEl = $("<span>").text(this.model.get("name"));
        this.$el.append(this.nameEl);

        // Children
        if(this.model.has("children")) {
            var childrenContainer = $("<div>").addClass("children");
            this.childrenContainer = childrenContainer;
            this.$el.after(this.childrenContainer);

            this.model.get("children").forEach(function(model) {
                var childElement = $("<div>");
                childrenContainer.append(childElement);
                var childView = new NodeView({el: childElement, model: model});
            });
        }

        this.render();
        this.listenTo(this.model, "change", $.proxy(this.render, this));
    },

    events: {
        "click .collapseButton": "collapse",
        "click .checkbox": "check"
    },

    render: function () {
        if (this.model.has("children")) {
            if (this.model.get("expanded")) {
                this.childrenContainer.slideDown();
                this.collapseButton.text("[-]");
            } else {
                this.childrenContainer.slideUp();
                this.collapseButton.text("[+]");
            }
        }

        console.log("setting checkbox to: ", this.model.get("selected"));

        var newCheckBox = $("<input type='checkbox'>").addClass("checkbox");
        this.checkbox.after(newCheckBox);
        this.checkbox.remove();
        this.checkbox = newCheckBox;
        this.checkbox.attr("checked", this.model.get("selected"));
    },

    collapse: function () {
        this.model.set("expanded", !this.model.get("expanded"));
    },

    check: function () {
        this.model.set("selected", !this.model.get("selected"));
    }
});

var container = $("#backboneView");

var views = jsonData.map(function(spec) {
    var model = new NodeModel({spec: spec});
    var el = $("<div>");
    container.append(el);
    return new NodeView({el: el, model: model});
});






