// import { Sequelize, Model, Datatypes} from "sequelize";

const Sequelize = require('sequelize');

const {DataTypes} = Sequelize;

const sequelize = new Sequelize('new_schema1', 'root', '98765', {
    // host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    }
});


sequelize.authenticate().then(()=> {
    console.log('connection is established');
}).catch(()=>{
    console.log("error!!!");
})


/***drop/alter already existing tables */

// sequelize.drop({match: /_abcd$/});

/***droping and sync are not advisable */

// sequelize.sync({alter: true});

/*creating a table.
*/
const Customer = sequelize.define('customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        primaryKey:true,  //if not specified seq. will create a default id field.
        // defaultValue: 1,
        autoIncrement: true //only for one row, by default the primary key id
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 9]
        }
    },
    items: {
        type: DataTypes.STRING,
        defaultValue: 'some item',
        // validate:{
        //     max: 10,
        // }
      
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
         validate:{
            max: 1100,
        }
    },
    cardPayment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,

    }
},{
    // freezeTableName: true,
    timestamps: false
});



//alter, replace the table using args for sync like force, alter ,etc
// Customer.sync({alter: true}).then(()=>{
//     console.log("doneeeee");
// }).catch((err)=>{
//     console.log("error", err);
// });

writing data into our table using build.
Customer.sync({alter: true, match: /ers$/}).then(()=>{
    // console.log('creating a new row');
    // const customer = Customer.build({customer_name: 'manan', items: 'biscuits', price: 25});
    // return customer.save(); // return a promise here.
    // return Customer.create({
    //     // serial_No: 1,
    //     customer_name: 'manan',
    //     items: 'some item',
    //     // price: 200
    // });
    /****Creating multiple rows using bulkCreate */

    return Customer.bulkCreate([{
        // customer_id: 1,
        customer_name: 'personA',
        items: 'asvfv',
        price: 299,
        cardPayment: true,
    },
    {   
        // customer_id: 2,
        customer_name: 'personB',
        items: 'djhf9',
    //   price: 299

    },
    {   
        // customer_id: 4,
        customer_name:'PersonC',
        cardPayment: true,

    }
], {validate: true});

}).then((data)=>{
    // console.log(data.toJSON());
   
    // data.customer_name = 'mmanan';
    /***display in json format data added in bulk  */
    data.forEach((element)=>
    {
        console.log(element.toJSON());
    })
    // return data.destroy();
    // data.increment({price: 20});
    // data.decrement({price: 30});

    // return data.save();
    // return data.reload(); /* Go back to original data.*/
}).then(()=>{
    console.log('Successfull op');
    // console.log('deleted row');
}).catch((err)=>{
    console.log('ERRRRRRor', err);

});


/*********queries using sequelize */

Customer.sync().then(()=>{
    return Customer.findAll({attributes:['customer_name', 'cardPayment']});
}).then((data)=>{
    data.forEach((element)=>{
        console.log(element.toJSON());
    })
}).catch((err)=>{
    console.log("Erorororor",err);
})

/********Aggregations using sequelize using sequelize.fn*** */

Customer.sync().then(()=>{
    return Customer.findAll({attributes: [[sequelize.fn('SUM', sequelize.col('price'), 'total price')]]});
}).then((data)=>{
    data.forEach((element)=>{
        console.log(element.toJSON());
    })
}).catch((err)=>{
    console.log("Erorororor",err);
})

/*****new  */

Customer.sync().then(()=>
{
    
})





// console.log('$$$$$$$$$$$$');
// console.log(sequelize.models.customer);


// sequelize.close();

// return data.save();     