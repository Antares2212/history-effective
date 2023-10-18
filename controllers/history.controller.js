const db = require('../db')

class HistoryController {
  async create (req, res) {
    const { user_id, action } = req.body
    const newHistory = await db.query('INSERT INTO history (user_id, action) values ($1, $2) RETURNING *', [user_id, action])

    res.json(newHistory.rows[0])
  }

  async get (req, res) {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const actionHistory = await db.query('SELECT * FROM history ORDER BY user_id DESC OFFSET $1 LIMIT $2', [offset, limit])
  
      res.json(actionHistory.rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getById (req, res) {
    const { userId, page, limit } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      let query = 'SELECT * FROM history';
      const params = [];
      if (userId) {
        query += ' WHERE user_id = $1';
        params.push(userId);
      }
  
      query += ' ORDER BY user_id DESC OFFSET $2 LIMIT $3';
      params.push(offset, limit);
  
      const actionHistory = await db.query(query, params)
      res.json(actionHistory.rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

module.exports = new HistoryController()