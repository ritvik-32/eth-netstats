const {pool}=require("../db")

function createTable(){    
    pool.query("CREATE TABLE basicStats(sessionguid UUID NOT NULL, created text NOT NULL, sessionlife integer NOT NULL)", 
        (err, res) => {
        console.log(err, res);
        pool.end();
    });
}

module.exports={
    createTable: createTable
};