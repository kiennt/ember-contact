App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


App.Contact = Ember.Object.extend({

  isValidate: function() {
    if (this.get("firstName") == "" || this.get("lastName") == "")
      return false;
    return true;
  },

  fullName: Ember.computed(function() {
    return this.get("firstName") + " " + this.get("lastName");
  }).property("firstName", "lastName")

})


App.ListContactView = Ember.View.extend({
  templateName: "list-contact",

  init: function() {
    this._super();
    this.set("contacts", []);
  },

  new: function() {
    this.set("isNewVisible", true);
  }

})


App.ShowContactView = Ember.View.extend({
  templateName: "show-contact",
  tagName: "li",

  edit: function() {
    this.set("isEdit", true);
  },

  delete: function() {
    this.get("parentView").get("contacts").removeObject(this.get("contact"));
  }
});


App.EditContactView = Ember.View.extend({
  templateName: "edit-contact",
  init: function() {
    this._super();
    this.set("firstName", this.get("contact").get("firstName"));
    this.set("lastName", this.get("contact").get("lastName"));
  },

  resetContact: function() {
    this.get("contact").set("firstName", this.get("firstName"));
    this.get("contact").set("lastName", this.get("lastName"));
  },

  cancel: function() {
    this.resetContact();
    this.get("parentView").set("isEdit", false);
  },

  save: function() {
    var contact = this.get("contact");
    if (contact.isValidate()) {
      this.get("parentView").set("isEdit", false);
    }
  }
})


App.NewContactView = Ember.View.extend({
  templateName: "edit-contact",
  init: function(object) {
    this._super();
    this.set("contact", App.Contact.create());
  },

  save: function() {
    var contact = this.get("contact");
    if (contact.isValidate()) {
      this.get("parentView").get("contacts").pushObject(contact);
      this.get("parentView").set("isNewVisible", false);
    }
  },

  cancel: function() {
    this.get("parentView").set("isNewVisible", false);
  }

})
