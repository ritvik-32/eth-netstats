const {pool}=require("../db")

var currBestBlock,currAvgBlockTime

function updateBestBlock(bestBlock){
    currBestBlock=bestBlock;
}

function updateAvgBlockTime(avgBlockTime){
    currAvgBlockTime=avgBlockTime;
 }

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

    pool.query("CREATE TABLE IF NOT EXISTS nodeStats(id TEXT NOT NULL,uptime SMALLINT, peers INT, lastBlock BIGINT, pending BIGINT, bestBlock BIGINT, avgBlockTime BIGINT,  version TEXT)", 
        (err, res) => {
        console.log(err, res);
    });

    pool.query("CREATE TABLE IF NOT EXISTS latestNodeStats(id TEXT NOT NULL UNIQUE,uptime SMALLINT, peers INT, lastBlock BIGINT, pending BIGINT, bestBlock BIGINT, avgBlockTime BIGINT,  version TEXT)", 
        (err, res) => {
        console.log(err, res);
    });
}

function getLatestFromId(id){
    pool.query("SELECT * FROM latestNodeStats WHERE id=$1",[id],
        (err,res)=>{
            if (err){
                console.log(err);
                return err
            } else if(res.rowCount>0){
                console.log("RES=>>>>>\n");
                console.log(res.rows);
                process.exit(99);
                return res.rows
            } else{
                console.log("No matching entry with id=",id);
            }
        }
    )
    return null;
}

function insertNodeStats(id,uptime,peers){
    // latestData=getLatestFromId(id)
    pool.query("INSERT INTO latestNodeStats(id, uptime, peers) VALUES ($1, $2, $3) ON CONFLICT(id) DO UPDATE SET uptime=EXCLUDED.uptime, peers=EXCLUDED.peers",
    // pool.query("INSERT INTO nodeStats(id, uptime, peers) VALUES ($1, $2, $3)",
    [id,uptime,peers],
    (err, res) => {
        console.log(err, res);
    });
}

function insertBlockNum(id,lastblock){
    pool.query("INSERT INTO latestNodeStats(id, lastblock, bestBlock, avgBlockTime) VALUES ($1, $2, $3, $4) ON CONFLICT(id) DO UPDATE SET lastblock=EXCLUDED.lastblock,bestBlock=EXCLUDED.bestBlock,avgBlockTime=EXCLUDED.avgBlockTime",
    // pool.query("INSERT INTO nodeStats(id, lastblock, bestBlock, avgBlockTime) VALUES ($1, $2, $3, $4)",
    [id,lastblock,currBestBlock,currAvgBlockTime],
    (err, res) => {
        console.log(err, res);
    });
    rows=getLatestFromId(id)
    console.log("ROWS=>>>>>>>>>\n",rows)
}

function insertPending(id,pending){
    pool.query("INSERT INTO latestNodeStats(id, pending) VALUES ($1, $2) ON CONFLICT(id) DO UPDATE SET pending=EXCLUDED.pending",
    // pool.query("INSERT INTO nodeStats(id, pending) VALUES ($1, $2)",
    
    [id,pending],
    (err, res) => {
        console.log(err, res);
    });
}

function insertNodeInfo(id,version){
    pool.query("INSERT INTO latestNodeStats(id, version) VALUES ($1, $2) ON CONFLICT(id) DO UPDATE SET version=EXCLUDED.version",
    // pool.query("INSERT INTO nodeStats(id, version) VALUES ($1, $2)",
    [id,version],
    (err, res) => {
        console.log(err, res);
    });
}

module.exports={createTable,insertNodeStats,insertBlockNum,insertPending,updateBestBlock,updateAvgBlockTime,insertNodeInfo};