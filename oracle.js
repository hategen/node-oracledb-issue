const oracledb = require("oracledb");

oracledb.maxRows = 100;
oracledb.fetchArraySize = 100;
let pool;

async function initPool() {
  try {
    pool = await oracledb.createPool({
      poolMax: 10,
      poolMin: 0,
      user: "system",
      password: "oracle",
      connectString:
        "(DESCRIPTION=(ADDRESS = (PROTOCOL = TCP)(HOST = oracle)(PORT = 1521))(CONNECT_DATA = (SERVER = DEDICATED)(SID = 'xe')))"
    });
    return pool;
  } catch (e) {
    console.error(e.message);
  }
}

async function query(params) {
  let connection;
  try {
  //  console.log(`PARAMS: ${params}`);
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM system.TESTTABLE WHERE COLUMN4 BETWEEN :q1 AND :q2",
      params,
      { resultSet: true }
    );

    const stream = result.resultSet.toQueryStream();

    const streamConsumer = new Promise((resolve, reject) => {
      const response = [];
      stream.on("data", function(data) {
        //console.log(`DATA: ${data}`);
        return response.push(data);
      });

      stream.on("end", function() {
        //  console.log(`TOTAL ROWS: ${response.length}`);
        return resolve(response);
      });
      stream.on("error", function(error) {
        consle.error(error.message);
      });
    });

    return await streamConsumer;
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
      //  console.log(`CLOSE`);
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function closePool(params) {
  return pool.close();
}

initPool();

module.exports = {
  initPool,
  query,
  closePool
};
