const {pool}=require("../db")

function createTable(){    
    // {
    //     active: true,
    //     syncing: false,
    //     mining: false,
    //     hashrate: 0,
    //     peers: 8,
    //     gasPrice: 2268045429,
    //     uptime: 100
    //   }
      
    pool.query("CREATE TABLE [IF NOT EXISTS] basicStats(active BOOLEAN NOT NULL, syncing BOOLEAN NOT NULL, mining BOOLEAN NOT NULL, hashrate NUMERIC NOT NULL, peers INT NOT NULL CHECK (peers >= 0), gasPrice BIGINT NOT NULL, uptime BIGINT NOT NULL CHECK (uptime >= 0))", 
        (err, res) => {
        console.log(err, res);
        pool.end();
    });
}

function insertTable(){

}

module.exports={
    createTable: createTable,
    insertTable: insertTable
};