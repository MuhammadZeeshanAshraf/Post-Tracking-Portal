/* eslint-disable space-before-function-paren */
import { BATCH_SIZE } from '../constants';

export default class GeneralDatabaseFunction {
  constructor(db) {
    this.db = db;
  }

  async checkTableExistance(table) {
    return this.db.schema.hasTable(table);
  }

  async truncateTable(table) {
    return this.db(table).truncate();
  }

  async truncateMultipleTable(tables) {
    for (const table of tables) {
      this.db(table).truncate();
    }
  }

  rawQueryExceutor(query) {
    return this.db.raw(query);
  }

  async insertSingleRowWithReturn(schema, table, mapObj, returnColumnName) {
    try {
      const result = this.db(`${schema}.${table}`).returning(returnColumnName).insert(mapObj);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async insertSingleRow(schema, table, mapObj) {
    try {
      return this.db(`${schema}.${table}`).insert(mapObj);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSingleRowWithReturn(schema, table, mapObj, whereObj) {
    try {
      return this.db(`${schema}.${table}`).where(whereObj).update(mapObj);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteData(schema, table, whereObj) {
    try {
      console.log(this.db(`${schema}.${table}`).where(whereObj).del().toString());
      return this.db(`${schema}.${table}`).where(whereObj).del();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDataWhereIn(schema, table, whereColumnName, whereColumnValue) {
    try {
      console.log(this.db(`${schema}.${table}`).whereIn(whereColumnName, whereColumnValue).del().toString());
      return this.db(`${schema}.${table}`).whereIn(whereColumnName, whereColumnValue).del();
    } catch (error) {
      console.log(error);
    }
  }

  async insertMultipleRows(schema, table, data) {
    try {
      console.log('Rows :-', data.length);
      const promises = [];
      while (data.length > 0) {
        const dataBatch = data.splice(0, BATCH_SIZE);
        promises.push(this.db(`${schema}.${table}`).insert(dataBatch));
      }
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }

  async insertValueByArray(schema, table, data) {
    return this.db(`${schema}.${table}`).insert(data);
  }

  getDatabySingleWhereColumn(schema, table, whereColumnName, whereColumnValue) {
    return this.db.select().table(`${schema}.${table}`).where(whereColumnName, whereColumnValue);
  }

  getAllData(schema, table) {
    return this.db.select().table(`${schema}.${table}`);
  }

  getDataByWhere(schema, table, whereObj) {
    return this.db.select().table(`${schema}.${table}`).where(whereObj);
  }

  getAllDataOrderBy(schema, table, orderCol) {
    return this.db.select().table(`${schema}.${table}`).orderBy(orderCol, 'desc', 'first');
  }

  getAllDataOrderByWithSelectiveColumns(schema, table, orderCol, selectColumns) {
    return this.db.select(selectColumns).table(`${schema}.${table}`).orderBy(orderCol, 'desc', 'first');
  }

  async getSimpleMaxByColumn(schema, table, maxColumnName, whereColumnName, whereValue) {
    try {
      let maxObj;
      if (typeof whereColumnName === 'undefined' && typeof whereValue === 'undefined') {
        maxObj = await this.db(`${schema}.${table}`).max(`${maxColumnName} as maxID`).first();
      } else {
        maxObj = await this.db(`${schema}.${table}`).where(whereColumnName, whereValue).max(`${maxColumnName} as maxID`).first();
      }
      const { maxID } = maxObj;
      if (maxID === null) {
        return 1;
      } else {
        return maxID;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getComplexMaxByColumn(schema, table, maxColumnName, whereMap) {
    try {
      const maxObj = await this.db(`${schema}.${table}`).where(whereMap).max(`${maxColumnName} as maxID`).first();
      const { maxID } = maxObj;
      if (maxID === null) {
        return 1;
      } else {
        return maxID;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async search(schema, table, searchCriteria) {
    try {
      return this.db(`${schema}.${table}`)
        .where((qb) => {
          for (const [key, value] of Object.entries(searchCriteria)) {
            qb.where(`${key}`, 'like', `%${value}%`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  getAfterDate(schema, table, afterDate) {
    const query = `select *
                  from ${schema}.${table} i 
                  where i.create_date > timestamp '${afterDate}'`;
    return this.db.raw(query);
  }

  getDatabyWhereIn(schema, table, whereColumnName, whereColumnValue) {
    return this.db.select().table(`${schema}.${table}`).whereIn(whereColumnName, whereColumnValue);
  }

  getBeforeDate(schema, table, afterDate, columnName) {
    const query = `select *
                  from ${schema}.${table} i 
                  where i.${columnName} < timestamp '${afterDate}'`;
    return this.db.raw(query);
  }

  getBetweenDate(schema, table, start, end) {
    const query = `select *
                  from ${schema}.${table} i 
                  where i.create_date > timestamp '${start}'
                  and  i.create_date < timestamp '${end}'`;
    return this.db.raw(query);
  }

  getCount(schema, table, whereObj, whereColumnName) {
    return this.db.select().table(`${schema}.${table}`).count({ count: whereColumnName }).where(whereObj);
  }
}
