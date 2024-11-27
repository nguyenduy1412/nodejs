const MethodPay = require("../../model/methodPay.model");


const methodPayController = {
    index: async (req, res) => {
        try {
            const methodPay = await MethodPay.find({});
            res.render('admin/methodPay/index', { methodPay });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving banner");
        }
    },
    add: (req, res) => {
        res.render('admin/methodPay/add');
    },
    create: async (req, res) => {
        try {
            console.log("Name:",req.body.name)
            const methodPay = await MethodPay.create({
                name: req.body.name,
                
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/methodPay');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const methodPay = await MethodPay.findById(id);
            if (!methodPay) {
                return res.status(404).json({ message: "methodPay not found" });
            }
            res.render("admin/methodPay/update", { methodPay });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
       
      
        try {
            const methodPay = await MethodPay.findByIdAndUpdate(
                req.body.id, 
                {
                    name: req.body.name,
                },
                { new: true }
            );
            if (!methodPay) {
                return res.status(404).json({ message: "methodPay not found" });
            }
            res.redirect('/admin/methodPay');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const methodPay = await MethodPay.findByIdAndDelete(id);
            if (!methodPay) {
                return res.status(404).json({ message: "methodPay not found" });
            }
            res.redirect('/admin/methodPay');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = methodPayController;