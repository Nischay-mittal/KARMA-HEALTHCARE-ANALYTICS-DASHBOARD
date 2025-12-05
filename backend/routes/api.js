

const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analytics');


router.get('/sales-by-month', analytics.salesByMonth);


router.get('/top-customers', analytics.topCustomers);


router.get('/best-products', analytics.bestProducts);

router.get('/month-over-month', analytics.monthOverMonth);


router.get('/orders', analytics.listOrders);


router.get('/summary', analytics.summary);

module.exports = router;