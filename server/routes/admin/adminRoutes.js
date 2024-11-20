const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

// Resource routes
router.get('/resources', adminController.getResources);
router.post('/resources', adminController.addResource);
router.put('/resources/:id', adminController.updateResource);
router.delete('/resources/:id', adminController.deleteResource);

// Compliance routes
router.get('/compliance', adminController.getCompliance);
router.post('/compliance', adminController.addCompliance);
router.put('/compliance/:id', adminController.updateCompliance);
router.delete('/compliance/:id', adminController.deleteCompliance);

// Document routes
router.get('/documents', adminController.getDocuments);
router.post('/documents', adminController.addDocument);
router.put('/documents/:id', adminController.updateDocument);
router.delete('/documents/:id', adminController.deleteDocument);

// Notification routes
router.get('/notifications', adminController.getNotifications);
router.post('/notifications', adminController.addNotification);
router.put('/notifications/:id', adminController.updateNotification);

module.exports = router;