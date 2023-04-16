const data = {
    sellers: require('../model/seller.json'),
    setseller: function (data) { this.seller = data }
}

const getAllSeller = (req, res) => {
    res.json(data.seller);
}

const createNewSeller = (req, res) => {
    const newSeller = {
        id: data.seller?.length ? data.seller[data.seller.length - 1].id + 1 : 1,//adding to the previous
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newSeller.firstname || !newSeller.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setseller([...data.seller, newSeller]); 
    res.status(201).json(data.seller);
}

const updateSeller = (req, res) => {
    const seller = data.seller.find(sell => sell.id === parseInt(req.body.id));
    if (!seller) {
        return res.status(400).json({ "message": `seller ID ${req.body.id} not found` });
    }
    if (req.body.firstname) seller.firstname = req.body.firstname;
    if (req.body.lastname) seller.lastname = req.body.lastname;
    const filteredArray = data.seller.filter(buy => buy.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, seller];
    data.setseller(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.seller);
}

const deleteSeller = (req, res) => {
    const seller = data.seller.find(sell => sell.id === parseInt(req.body.id));
    if (!seller) {
        return res.status(400).json({ "message": `seller ID ${req.body.id} not found` });
    }
    const filteredArray = data.seller.filter(buy => buy.id !== parseInt(req.body.id));
    data.setseller([...filteredArray]);
    res.json(data.seller);
}

const getSeller = (req, res) => {
    const seller = data.seller.find(sell => sell.id === parseInt(req.params.id));
    if (!seller) {
        return res.status(400).json({ "message": `seller ID ${req.params.id} not found` });
    }
    res.json(seller);
}

module.exports = {
    getAllSeller,
    createNewSeller,
    updateSeller,
    deleteSeller,
    getSeller
}