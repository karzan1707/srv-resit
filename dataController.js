// controllers/dataController.js
const dataStore = [];
const picStore = [];
const path = require('path');

exports.getData = (req, res) => {
    res.json(dataStore);
};

exports.addOrUpdateData = (req, res) => {
    const { key, value } = req.body;
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    dataStore[key] = value;
    res.json({ message: 'Data stored successfully', data: dataStore });
};

exports.deleteData = (req, res) => {
    const { key } = req.body;
    if (!key) {
        return res.status(400).json({ error: 'Key is required' });
    }
    delete dataStore[key];
    res.json({ message: 'Data deleted successfully', data: dataStore });
};

exports.validateBodyFields = (req, res, next) => {
    const { email, firstname, lastname, active, pic_coun } = req.body;
    if (email=="" && firstname==""  && lastname=="") {
        return res.status(400).json({ error: 'Feilds are missing provide me correct data set!' });
    }else{
        next();
    }
};
exports.validateEmailFormat = (req, res, next) => {
    const { email } = req.body;

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return res.status(400).json({ error: 'Email is missing. Provide the correct data set!' });
    } else if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Provide a valid email address!' });
    } else {
        next();
    }
};

exports.validateEmailFormat2 = (req, res, next) => {
    const { email } = req.params;

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return res.status(400).json({ error: 'Email is missing. Provide the correct data set!' });
    } else if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Provide a valid email address!' });
    } else {
        next();
    }
};

exports.emailAlreadyRegistered = (req, res, next) => {
    const { email } = req.body;

    // Check if the email is already in the dataStore
    if (dataStore.some(user => user.email === email)) {
        return res.status(400).json({ error: 'Email is already registered!' });
    } else {
        next();
    }
};

exports.storages = (req, res, next) => {
    const { email, firstname, lastname, active, pic_coun } = req.body;

    const data = { email, firstname, lastname, active, pic_coun };
    dataStore.push(data)
    res.json({ message: 'Data stored successfully', data: dataStore });

};


exports.update = (req, res) => {
    const { email, firstname, lastname, active, pic_coun } = req.body;

    const userIndex = dataStore.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.status(400).json({ error: 'Email not found. Cannot update non-existent record.' });
    }

    // Update the user data
    dataStore[userIndex] = { email, firstname, lastname, active, pic_coun };
    res.json({ message: 'Data updated successfully', data: dataStore });
};

exports.deleteUser = (req, res) => {
    const { email } = req.body;
    const userIndex = dataStore.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.status(400).json({ error: 'Email not found. Cannot delete non-existent record.' });
    }
    dataStore.splice(userIndex, 1);
    res.json({ message: 'Data deleted successfully', data: dataStore });
};

exports.validateBodyFieldspp = (req, res, next) => {
        const { email } = req.body;
        const { originalname, size } = req.file; // Extracting file information

        if (!email || !req.file) {
            return res.status(400).json({ error: 'Fields are missing. Provide the correct data set!' });
        }

        // You can access more information like extension using path module
        const extension = path.extname(originalname);

        // You can now handle the extracted file information as needed
        req.fileInfo = {
            originalname,
            size,
            extension
        };

        next();
    }


exports.storagepp = (req, res, next) => {
    const { email, visible } = req.body;
    const { originalname, size, extension } = req.fileInfo;
     
    const userIndex = dataStore.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.status(400).json({ error: 'Email not found. Cannot delete non-existent record.' });
    }

     const data = { email, originalname, size, extension, visible };
     picStore.push(data)
    dataStore[userIndex].pic_coun++;


    res.json({ message: 'Data stored successfully' });

};


exports.fetchimg = (req, res) => {
    const { email } = req.params;

    // Find the object in picStore with matching email
    const foundImage = picStore.filter(item => item.email === email);

    if (!foundImage) {
        return res.status(404).json({ error: 'Image not found for the given email.' });
    }

    // Return the found image object
    res.json(foundImage);
};

exports.visiblefetchimg = (req, res) => {
    const { email } = req.params;

    // Find the object in picStore with matching email
    const foundImage = picStore.filter(item => item.email === email && item.visible=="true");

    if (!foundImage) {
        return res.status(404).json({ error: 'Image not found for the given email.' });
    }

    // Return the found image object
    res.json(foundImage);
};

exports.imgupdate = (req, res) => {
    const { email, visible } = req.body;
    const { id } = req.params;
    const { originalname, size, extension } = req.fileInfo;

    // Update the user data
    picStore[id] = { email, originalname, size, extension, visible };
    res.json({ message: 'Data updated successfully' });
};

exports.visupdate = (req, res) => {
    const { id, visible } = req.params;

    // Update the user data
    picStore[id].visible = visible;
    res.json({ message: 'Data updated successfully' });
};
