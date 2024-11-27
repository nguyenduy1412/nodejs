var DiscountCode=require('../../model/discountCode');
const moment = require('moment');
const discountCodeController={
    index: async (req, res) => {
        try {
            const discountCode = await DiscountCode.find({})
            res.render('admin/discountCode/index', { discountCode });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving discountCode");
        }
    },
    add:(req, res) =>{
        res.render('admin/discountCode/add');
    },
    create: async (req, res) =>{
        try {
            const dateString = req.body.date;
            console.log(req.body);
            const date = moment(dateString).format('YYYY-MM-DD');
            const discountCode = await DiscountCode.create({
                expiry: date,
                status: req.body.status, // status có thể là true hoặc false
                total: req.body.total,
                quantity: req.body.total,
                money:req.body.money,
                nameCode: req.body.nameCode // Nếu có hình ảnh
            });
            res.redirect('/admin/discountCode');
        } catch (error) {
            console.error(err);
            res.status(500).send("Error retrieving discountCode");
        }
    },
    edit: async(req, res) =>{
        const id = req.params.id;
        console.log(id);
        try {
            const discountCode = await DiscountCode.findById(id);
            if (!discountCode) {
                return res.status(404).json({ message: "discountCode not found" });
            }
            res.render("admin/discountCode/update", { discountCode });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
        
    },
    update: async(req, res) =>{
       
        try {
            const dateString = req.body.date;
            console.log(req.body);
            const date = moment(dateString).format('YYYY-MM-DD');
            const discountCode = await DiscountCode.findByIdAndUpdate(req.body.id,{
                expiry: date,
                status: req.body.status, 
                total: req.body.total,
                quantity: req.body.total,
                money:req.body.money,
                nameCode: req.body.nameCode  
            });
            res.redirect('/admin/discountCode');
        } catch (error) {
            console.error(err);
            res.status(500).send("Error retrieving discountCode");
        }
    },
    delete:async(req, res) =>{
        const id = req.params.id; 
        try {
            const discountCode = await DiscountCode.findByIdAndDelete(id);
            if (!discountCode) {
                return res.status(404).json({ message: "discountCode not found" });
            }
            res.redirect('/admin/discountCode');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports =discountCodeController; 