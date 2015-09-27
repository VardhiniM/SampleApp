aidList = new Mongo.Collection("Aid");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('name', 'Vardhini');

console.log("Hi Vardhini");

  Template.hello.helpers({
    'counter1': function () {
      return Session.get('counter');
    },
    'name' : function() {
      return Session.get('name');
    },
    'username' : function() {
//      var id = Meteor.userId();
//      return users.find({_id : id});
      return Meteor.userId();
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('name', Session.get('name'));
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
  Template.addAid.helpers({
    'listAid': function () {
      return aidList.find({}, {sort : {name : 1}});
    }
  });

  Template.addAid.events({
    'click table' : function() {
      var selected = this._id;
      Session.set("SelectedAid", selected);
      console.log("selected id : " + selected);
    },
    'submit form' : function(event) {
      event.preventDefault();
      alert("Sure to submit?");
      console.log("Form submitted");
      console.log(event.type);
      var aidName = event.target.aidName.value;
      var aidCategory = event.target.aidCategory.value;
//      aidList.insert({name : aidName, category : aidCategory});
      console.log("Form data saved to db");
      event.target.aidName.value="";
      event.target.aidCategory.value="";
      Meteor.call('insertAid', aidName, aidCategory);
    }
  });
Meteor.subscribe('theAid');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
//code to run on server at startup
//aidList.remove({name : "a"});
//Meteor.users.remove({_id : "dR29m6F8z7RotBtfS"});
  console.log("Welcome to the server console");  
  console.log(aidList.find().fetch());
  Meteor.publish('theAid', function(){
    return aidList.find();
  });

  Meteor.methods({
    'insertAid': function(aidName, aidCategory){
    console.log("Hello world");
    aidList.insert({name : aidName, category : aidCategory});
    }
  });

});
}
