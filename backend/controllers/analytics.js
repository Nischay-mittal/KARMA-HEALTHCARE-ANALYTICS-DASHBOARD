
const { all, get } = require('../database');


async function salesByMonth(req, res, next) {
  try {
    const months = parseInt(req.query.months || '6', 10);

    const sql = `
      WITH monthly_raw AS (
        SELECT
          strftime('%Y-%m', o.order_date) AS month,
          SUM(o.quantity * p.price) AS revenue
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.status = 'completed'
        GROUP BY month
      ),
      limited AS (
        -- take latest N months actually present in data
        SELECT *
        FROM monthly_raw
        ORDER BY month DESC
        LIMIT ?
      ),
      monthly AS (
        -- re-order chronologically for chart
        SELECT *
        FROM limited
        ORDER BY month
      )
      SELECT
        month,
        ROUND(revenue, 2) AS revenue
      FROM monthly;
    `;

    const rows = await all(sql, [months]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}


async function topCustomers(req, res, next) {
  try {
    const limit = parseInt(req.query.limit || '5', 10);

    const sql = `
      SELECT
        c.id,
        c.name,
        c.email,
        ROUND(SUM(o.quantity * p.price), 2) AS total_spend,
        COUNT(o.id) AS orders_count
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN products p ON o.product_id = p.id
      WHERE o.status = 'completed'
      GROUP BY c.id
      ORDER BY total_spend DESC
      LIMIT ?;
    `;

    const rows = await all(sql, [limit]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}


async function bestProducts(req, res, next) {
  try {
    const sql = `
      WITH prod_revenue AS (
        SELECT
          p.id,
          p.name,
          p.category,
          SUM(o.quantity * p.price) AS revenue
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.status = 'completed'
        GROUP BY p.id
      ),
      ranked AS (
        SELECT
          *,
          ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) AS rn
        FROM prod_revenue
      )
      SELECT
        category,
        id   AS product_id,
        name AS product_name,
        ROUND(revenue, 2) AS revenue
      FROM ranked
      WHERE rn = 1
      ORDER BY category;
    `;

    const rows = await all(sql);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}


async function monthOverMonth(req, res, next) {
  try {
    const months = parseInt(req.query.months || '6', 10);

    const sql = `
      WITH monthly_raw AS (
        SELECT
          strftime('%Y-%m', o.order_date) AS month,
          SUM(o.quantity * p.price) AS revenue
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.status = 'completed'
        GROUP BY month
      ),
      limited AS (
        -- latest N months
        SELECT *
        FROM monthly_raw
        ORDER BY month DESC
        LIMIT ?
      ),
      monthly AS (
        -- sorted ascending for easier growth calc
        SELECT *
        FROM limited
        ORDER BY month
      )
      SELECT
        m.month,
        ROUND(m.revenue, 2) AS revenue,
        ROUND(
          (m.revenue - COALESCE(prev.revenue, 0)) * 100.0 /
          NULLIF(prev.revenue, 0),
          2
        ) AS mom_growth_pct
      FROM monthly m
      LEFT JOIN monthly_raw prev
        ON prev.month = strftime('%Y-%m', date(m.month || '-01','-1 month'))
      ORDER BY m.month;
    `;

    const rows = await all(sql, [months]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function listOrders(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const offset = parseInt(req.query.offset || '0', 10);

    const sql = `
      SELECT
        o.id,
        o.customer_id,
        c.name AS customer_name,
        o.product_id,
        p.name AS product_name,
        o.quantity,
        p.price AS unit_price,
        (o.quantity * p.price) AS line_total,
        o.order_date,
        o.status
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN products p ON o.product_id = p.id
      ORDER BY o.order_date DESC, o.id DESC
      LIMIT ? OFFSET ?;
    `;

    const rows = await all(sql, [limit, offset]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}


async function summary(req, res, next) {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (
          SELECT ROUND(COALESCE(SUM(o.quantity * p.price), 0), 2)
          FROM orders o
          JOIN products p ON o.product_id = p.id
          WHERE o.status = 'completed'
        ) AS total_revenue,
        (SELECT COUNT(DISTINCT customer_id) FROM orders) AS unique_customers
    `;
    const row = await get(sql);
    res.json(row);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  salesByMonth,     
  topCustomers,     
  bestProducts,     
  monthOverMonth,   
  listOrders,       
  summary           
};