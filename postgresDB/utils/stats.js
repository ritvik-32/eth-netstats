const {pool}=require("../db")

function createTable(){    
    // {
    //     peers: 0,
    //     pending: 6930,
    //     gasPrice: 0,
    //     block: {
    //       number: 28716143,
    //       timestamp: 1666262388,
    //       gasUsed: 7149268,
    //       gasLimit: 20959268,
    //       arrived: 1666262393475,
    //       received: 1666262393475,
    //       time: 0
    //     },
    //     syncing: false,
    //     propagationAvg: 0,
    //     latency: '44',
    //     uptime: 100,
    //     hBlockTime: 0,
    //     hTxCount: 0
    //   }
      
      
    pool.query("CREATE TABLE IF NOT EXISTS nodeStats(id TEXT NOT NULL,uptime SMALLINT NOT NULL, peers INT)", 
        (err, res) => {
        console.log(err, res);
    });

    pool.query("CREATE TABLE IF NOT EXISTS blockNum(id TEXT NOT NULL,lastBlock BIGINT NOT NULL)", 
        (err, res) => {
        console.log(err, res);
    });

    pool.query("CREATE TABLE IF NOT EXISTS pending(id TEXT NOT NULL, pending BIGINT)", 
        (err, res) => {
        console.log(err, res);
    });
}

function insertNodeStats(id,uptime,peers){
    pool.query("INSERT INTO stats(id, uptime, peers) VALUES ($1, $2, $3)",
    [id,uptime,peers],
    (err, res) => {
        console.log(err, res);
    });
}

function insertBlockNum(id,lastblock){
    pool.query("INSERT INTO blockNum(id, lastblock) VALUES ($1, $2)",
    [id,lastblock],
    (err, res) => {
        console.log(err, res);
    });
}

function insertPending(id,pending){
    pool.query("INSERT INTO pending(id, pending) VALUES ($1, $2)",
    [id,pending],
    (err, res) => {
        console.log(err, res);
    });
}

module.exports={createTable,insertNodeStats,insertBlockNum,insertPending};