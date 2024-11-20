const express = require('express');
const router = express.Router();
const Document = require('../../models/admin/Document');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  const document = new Document({
    title: req.body.title,
    type: req.body.type,
    filename: req.file.filename, // This is set by multer
    uploadedBy: req.body.uploadedBy || 'Admin',  // You might want to get this from the authenticated user
    accessibleTo: req.body.accessibleTo,
    content: req.body.content,
  });
  try {
    const newDocument = await document.save();
    res.status(201).json(newDocument);
  } catch (err) {
    console.error('Error saving document:', err); // Log the exact error
    res.status(400).json({ message: err.message });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) {
//       return res.status(404).json({ message: 'Document not found' });
//     }
//     const filePath = path.join(__dirname, '..', 'uploads', document.filename);
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     res.download(filePath);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (document) {
      const filePath = path.join(__dirname, '..', 'uploads', document.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove file from storage
      }
      res.json({ message: 'Document and associated file deleted' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
