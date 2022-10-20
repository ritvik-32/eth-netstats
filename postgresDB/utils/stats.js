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
      
      
    pool.query("CREATE TABLE IF NOT EXISTS stats(bestBlock BIGINT NOT NULL, lastBlock BIGINT NOT NULL, avgBlockTime NUMERIC NOT NULL, uptime SMALLINT NOT NULL, peers INT, pending BIGINT)", 
        (err, res) => {
        console.log(err, res);
        // pool.end();
    });
}

function insertTable(stats){
    pool.query("INSERT INTO stats(bestBlock, lastBlock, avgBlockTime, uptime, peers, pending) VALUES ($1, $2, $3, $4, $5, $6)",
    [stats.block.number,stats.block.number,stats.latency,stats.uptime,stats.peers,stats.pending],
    (err, res) => {
        console.log(err, res);
        // pool.end();
    });
}

module.exports={
    createTable: createTable,
    insertTable: insertTable
};