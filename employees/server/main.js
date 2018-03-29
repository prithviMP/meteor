//only executed on server
import _ from 'lodash'

import { Meteor } from "meteor/meteor";

import { Employees } from "../imports/collections/employee";
import { image, helpers} from 'faker'
Meteor.startup(() =>{
    //Great pplace to generate Data

    //check if data exists in collection
    // see if collection has any records

    const numberRecords = Employees.find({}).count();
    console.log(numberRecords)
    if (!numberRecords){
        //Generate some data
        _.times(5000, () => {
            const { name, email , phone} = helpers.createCard();
            Employees.insert({
                name,email,phone,
                avatar: image.avatar()
            });
        });
    }

    Meteor.publish('employees',function(per_page){
        return Employees.find({},{limit: per_page});
    })
    
});